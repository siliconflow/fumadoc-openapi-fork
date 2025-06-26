'use client';
import { escapeString, inputToString } from '../utils/input-to-string.js';
export const defaultAdapters = {
    'application/json': {
        encode(data) {
            return JSON.stringify(data.body);
        },
        generateExample(data, ctx) {
            return str(data.body, 'application/json', ctx);
        },
    },
    'application/xml': {
        async encode(data) {
            // @ts-expect-error -- untyped
            const { js2xml } = await import('xml-js/lib/js2xml');
            return js2xml(data.body, {
                compact: true,
                spaces: 2,
            });
        },
        generateExample(data, ctx) {
            return str(data.body, 'application/xml', ctx);
        },
    },
    'application/x-ndjson': {
        encode(data) {
            if (Array.isArray(data.body)) {
                return data.body.map((v) => JSON.stringify(v)).join('\n');
            }
            return JSON.stringify(data.body);
        },
        generateExample(data, ctx) {
            return str(data.body, 'application/x-ndjson', ctx);
        },
    },
    'application/x-www-form-urlencoded': {
        encode(data) {
            if (typeof data.body !== 'object')
                throw new Error(`Input value must be object, received: ${typeof data.body}`);
            const params = new URLSearchParams();
            for (const key in data.body) {
                params.set(key, String(data.body[key]));
            }
            return params;
        },
        generateExample(data, ctx) {
            if (ctx.lang === 'js') {
                return `const body = new URLSearchParams(${JSON.stringify(data.body, null, 2)})`;
            }
            return str(data.body, 'application/x-www-form-urlencoded', ctx);
        },
    },
    'multipart/form-data': {
        encode(data) {
            const formData = new FormData();
            const body = data.body;
            if (typeof body !== 'object' || !body) {
                throw new Error(`Unsupported body type: ${typeof body}, expected: object`);
            }
            for (const key in body) {
                const prop = body[key];
                if (typeof prop === 'object' && prop instanceof File) {
                    formData.set(key, prop);
                }
                if (Array.isArray(prop) && prop.every((item) => item instanceof File)) {
                    for (const item of prop) {
                        formData.append(key, item);
                    }
                }
                if (prop && !(prop instanceof File)) {
                    formData.set(key, JSON.stringify(prop));
                }
            }
            return formData;
        },
        generateExample(data, ctx) {
            if (ctx.lang === 'python') {
                return `body = ${JSON.stringify(data.body, null, 2)}`;
            }
            const s = [];
            if (ctx.lang === 'js') {
                s.push(`const body = new FormData();`);
                for (const [key, value] of Object.entries(data.body)) {
                    s.push(`body.set(${key}, ${JSON.stringify(inputToString(value))})`);
                }
            }
            if (ctx.lang === 'go') {
                const { addImport } = ctx;
                addImport('mime/multipart');
                addImport('bytes');
                s.push('body := new(bytes.Buffer)');
                s.push('mp := multipart.NewWriter(payload)');
                for (const [key, value] of Object.entries(data.body)) {
                    const escaped = escapeString(inputToString(value, 'application/json'), '`');
                    s.push(`mp.WriteField("${key}", ${escaped})`);
                }
            }
            if (ctx.lang === 'java') {
                const { addImport } = ctx;
                addImport('java.net.http.HttpRequest.BodyPublishers');
                s.push(`var body = BodyPublishers.ofByteArray(new byte[] { ... });`);
            }
            if (ctx.lang === 'csharp') {
                s.push(`var body = new MultipartFormDataContent();`);
            }
            if (s.length > 0)
                return s.join('\n');
        },
    },
    'application/octet-stream': {
        encode(data) {
            return data.body;
        },
        generateExample() {
            // not supported
            return undefined;
        },
    },
};
function str(init, mediaType, ctx) {
    if (ctx.lang === 'js') {
        if (mediaType === 'application/json') {
            return `const body = JSON.stringify(${JSON.stringify(init, null, 2)})`;
        }
        return `const body = ${escapeString(inputToString(init, mediaType), '`')}`;
    }
    if (ctx.lang === 'python') {
        if (mediaType === 'application/json')
            return `body = ${JSON.stringify(init, null, 2)}`;
        return `body = ${escapeString(inputToString(init, mediaType), '"""')}`;
    }
    if (ctx.lang === 'go') {
        const { addImport } = ctx;
        addImport('strings');
        return `body := strings.NewReader(${escapeString(inputToString(init, mediaType), '`')})`;
    }
    if (ctx.lang === 'java') {
        const { addImport } = ctx;
        addImport('java.net.http.HttpRequest.BodyPublishers');
        return `var body = BodyPublishers.ofString(${escapeString(inputToString(init, mediaType), '"""')});`;
    }
    if (ctx.lang === 'csharp') {
        const input = `\n${inputToString(init, mediaType)}\n`;
        return `var body = new StringContent(${escapeString(input, '"""')}, Encoding.UTF8, "${mediaType}");`;
    }
}
