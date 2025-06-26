import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Slugger from 'github-slugger';
import { Operation } from '../render/operation/index.js';
import { createMethod } from '../server/create-method.js';
import { createRenders } from '../render/renderer.js';
import { processDocument, } from '../utils/process-document.js';
export async function APIPage(props) {
    const { operations, hasHead = true, webhooks, disableCache = process.env.NODE_ENV === 'development', } = props;
    const processed = await processDocument(props.document, disableCache);
    const ctx = await getContext(processed, props);
    const { document } = processed;
    return (_jsxs(ctx.renderer.Root, { ctx: ctx, children: [operations?.map((item) => {
                const pathItem = document.paths?.[item.path];
                if (!pathItem)
                    throw new Error(`[Fumadocs OpenAPI] Path not found in OpenAPI schema: ${item.path}`);
                const operation = pathItem[item.method];
                if (!operation)
                    throw new Error(`[Fumadocs OpenAPI] Method ${item.method} not found in operation: ${item.path}`);
                const method = createMethod(item.method, pathItem, operation);
                return (_jsx(Operation, { method: method, path: item.path, ctx: ctx, hasHead: hasHead }, `${item.path}:${item.method}`));
            }), webhooks?.map((item) => {
                const webhook = document.webhooks?.[item.name];
                if (!webhook)
                    throw new Error(`[Fumadocs OpenAPI] Webhook not found in OpenAPI schema: ${item.name}`);
                const hook = webhook[item.method];
                if (!hook)
                    throw new Error(`[Fumadocs OpenAPI] Method ${item.method} not found in webhook: ${item.name}`);
                const method = createMethod(item.method, webhook, hook);
                return (_jsx(Operation, { type: "webhook", method: method, ctx: ctx, path: `/${item.name}`, hasHead: hasHead }, `${item.name}:${item.method}`));
            })] }));
}
export async function getContext(schema, options = {}) {
    const document = schema.document;
    const servers = document.servers && document.servers.length > 0
        ? document.servers
        : [{ url: '/' }];
    return {
        schema,
        proxyUrl: options.proxyUrl,
        disablePlayground: options.disablePlayground,
        showResponseSchema: options.showResponseSchema,
        renderer: {
            ...createRenders(),
            ...options.renderer,
        },
        shikiOptions: options.shikiOptions,
        generateTypeScriptSchema: options.generateTypeScriptSchema,
        generateCodeSamples: options.generateCodeSamples,
        servers,
        mediaAdapters: {
            ...{
                'application/octet-stream': true,
                'application/json': true,
                'multipart/form-data': true,
                'application/xml': true,
                'application/x-ndjson': true,
                'application/x-www-form-urlencoded': true,
            },
            ...options.mediaAdapters,
        },
        slugger: new Slugger(),
    };
}
