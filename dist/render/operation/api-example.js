import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Markdown } from '../../render/markdown.js';
import { CodeBlock } from '../../render/codeblock.js';
import { CodeExample, CodeExampleProvider } from '../../ui/lazy.js';
import { getPreferredType } from '../../utils/schema.js';
import { getRequestData } from '../../render/operation/get-request-data.js';
import { sample } from 'openapi-sampler';
const defaultSamples = [
    {
        label: 'cURL',
        lang: 'bash',
    },
    {
        label: 'JavaScript',
        lang: 'js',
    },
    {
        label: 'Go',
        lang: 'go',
    },
    {
        label: 'Python',
        lang: 'python',
    },
    {
        label: 'Java',
        lang: 'java',
    },
    {
        label: 'C#',
        lang: 'csharp',
    },
];
export function APIExampleProvider({ examples, method, children, route, }) {
    const exclusiveSampleKey = method['x-exclusiveCodeSample'];
    return (_jsx(CodeExampleProvider, { initialKey: exclusiveSampleKey, route: route, examples: examples.map((example) => ({
            key: example.key,
            data: example.data,
        })), children: children }));
}
export function getAPIExamples(path, method, ctx) {
    const media = method.requestBody
        ? getPreferredType(method.requestBody.content)
        : null;
    const bodyOfType = media ? method.requestBody?.content[media] : null;
    if (bodyOfType?.examples) {
        const result = [];
        for (const [key, value] of Object.entries(bodyOfType.examples)) {
            result.push({
                key,
                name: value.summary ?? key,
                description: value.description,
                data: getRequestData(path, method, key, ctx),
            });
        }
        if (result.length > 0)
            return result;
    }
    return [
        {
            key: '_default',
            name: 'Default',
            description: bodyOfType?.schema?.description,
            data: getRequestData(path, method, null, ctx),
        },
    ];
}
export async function APIExample({ method, examples, ctx, }) {
    const renderer = ctx.renderer;
    const generators = dedupe([
        ...defaultSamples,
        ...(ctx.generateCodeSamples ? await ctx.generateCodeSamples(method) : []),
        ...(method['x-codeSamples'] ?? []),
    ]).filter((generator) => generator.source !== false);
    const exclusiveSampleKey = method['x-exclusiveCodeSample'];
    return (_jsxs(renderer.APIExample, { children: [examples.length > 1 && !exclusiveSampleKey && (_jsx(renderer.CodeExampleSelector, { items: examples.map((sample) => ({
                    title: sample.name,
                    description: sample.description ? (_jsx(Markdown, { text: sample.description })) : null,
                    value: sample.key,
                })) })), generators.length > 0 && (_jsx(renderer.Requests, { items: generators.map((s) => s.label ?? s.lang), children: generators.map((generator, i) => (_jsx(renderer.Request, { name: generator.label ?? generator.lang, children: _jsx(CodeExample, { ...generator }) }, i))) })), _jsx(ResponseTabs, { operation: method, ctx: ctx })] }));
}
/**
 * Remove duplicated labels
 */
function dedupe(samples) {
    const set = new Set();
    const out = [];
    for (let i = samples.length - 1; i >= 0; i--) {
        const item = samples[i];
        if (item.label) {
            if (set.has(item.label))
                continue;
            set.add(item.label);
        }
        out.unshift(item);
    }
    return out;
}
function ResponseTabs({ operation, ctx, }) {
    const { renderer } = ctx;
    if (!operation.responses)
        return null;
    async function renderResponse(code) {
        const response = operation.responses?.[code];
        const media = response?.content ? getPreferredType(response.content) : null;
        const responseOfType = media ? response?.content?.[media] : null;
        let slot = 'Empty';
        if (responseOfType?.examples) {
            const values = [];
            const children = Object.entries(responseOfType.examples).map(([key, sample]) => {
                const title = sample?.summary ?? `Example ${key}`;
                values.push(title);
                return (_jsxs(renderer.ResponseType, { label: title, children: [sample?.description && _jsx(Markdown, { text: sample.description }), _jsx(CodeBlock, { lang: "json", code: JSON.stringify(sample.value, null, 2), ctx: ctx })] }, key));
            });
            slot = (_jsx(renderer.ResponseTypes, { defaultValue: values[0], children: children }));
        }
        else if (responseOfType?.example || responseOfType?.schema) {
            slot = (_jsx(CodeBlock, { lang: "json", code: JSON.stringify(responseOfType.example ?? sample(responseOfType.schema), null, 2), ctx: ctx }));
        }
        return _jsx(renderer.Response, { value: code, children: slot });
    }
    const codes = Object.keys(operation.responses);
    if (codes.length === 0)
        return null;
    return (_jsx(renderer.Responses, { items: codes, children: codes.map((code) => renderResponse(code)) }));
}
