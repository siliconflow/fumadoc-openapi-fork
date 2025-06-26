import { jsx as _jsx } from "react/jsx-runtime";
import { getPreferredType } from '../utils/schema.js';
import { ClientLazy } from '../ui/lazy.js';
import { Markdown } from '../render/markdown.js';
export async function APIPlayground({ path, method, ctx, client, }) {
    let currentId = 0;
    const bodyContent = method.requestBody?.content;
    const mediaType = bodyContent ? getPreferredType(bodyContent) : undefined;
    const context = {
        references: {},
        nextId() {
            return String(currentId++);
        },
        registered: new WeakMap(),
    };
    const props = {
        securities: parseSecurities(method, ctx),
        method: method.method,
        route: path,
        parameters: method.parameters?.map((v) => ({
            name: v.name,
            in: v.in,
            schema: writeReferences((v.schema ?? true), context),
            description: v.description,
        })),
        body: bodyContent && mediaType
            ? {
                schema: writeReferences(bodyContent[mediaType].schema, context),
                mediaType,
            }
            : undefined,
        references: context.references,
        proxyUrl: ctx.proxyUrl,
        ...client,
    };
    return _jsx(ClientLazy, { ...props });
}
function writeReferences(schema, ctx, stack = new WeakMap()) {
    if (typeof schema !== 'object' || !schema)
        return schema;
    if (stack.has(schema)) {
        const out = stack.get(schema);
        const id = ctx.nextId();
        ctx.references[id] = out;
        return {
            $ref: id,
        };
    }
    const output = { ...schema };
    stack.set(schema, output);
    for (const _n in output) {
        const name = _n;
        if (!output[name])
            continue;
        switch (name) {
            case 'oneOf':
            case 'allOf':
            case 'anyOf':
                output[name] = output[name].map((item) => writeReferences(item, ctx, stack));
                continue;
            case 'items':
            case 'additionalProperties':
            case 'not':
                output[name] = writeReferences(output[name], ctx, stack);
                continue;
            case 'properties':
            case 'patternProperties':
                output[name] = { ...output[name] };
                for (const key in output[name]) {
                    output[name][key] = writeReferences(output[name][key], ctx, stack);
                }
        }
    }
    return output;
}
function parseSecurities(method, { schema: { document } }) {
    const result = [];
    const security = method.security ?? document.security ?? [];
    if (security.length === 0)
        return result;
    for (const map of security) {
        const list = [];
        for (const [key, scopes] of Object.entries(map)) {
            const scheme = document.components?.securitySchemes?.[key];
            if (!scheme)
                continue;
            list.push({
                ...scheme,
                scopes,
                id: key,
                // @ts-expect-error - _descriptionMarkdown is used internally
                _descriptionMarkdown: _jsx(Markdown, { text: scheme.description }),
            });
        }
        if (list.length > 0)
            result.push(list);
    }
    return result;
}
