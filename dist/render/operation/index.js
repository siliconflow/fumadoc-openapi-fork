import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from 'react';
import { idToTitle } from '../../utils/id-to-title.js';
import { Markdown } from '../markdown.js';
import { heading } from '../heading.js';
import { Schema } from '../schema.js';
import { createMethod } from '../../server/create-method.js';
import { methodKeys } from '../../build-routes.js';
import { APIExample, APIExampleProvider, getAPIExamples, } from '../../render/operation/api-example.js';
import { MethodLabel } from '../../ui/components/method-label.js';
import { getTypescriptSchema } from '../../utils/get-typescript-schema.js';
import { CopyResponseTypeScript } from '../../ui/client.js';
import { SelectTab, SelectTabs, SelectTabTrigger } from '../../ui/select-tabs.js';
import { AccordionContent, AccordionHeader, AccordionItem, Accordions, AccordionTrigger, } from '../../ui/components/accordion.js';
const ParamTypes = {
    path: 'Path Parameters',
    query: 'Query Parameters',
    header: 'Header Parameters',
    cookie: 'Cookie Parameters',
};
export function Operation({ type = 'operation', path, method, ctx, hasHead, headingLevel = 2, }) {
    const body = method.requestBody;
    let headNode = null;
    let bodyNode = null;
    let authNode = null;
    let responseNode = null;
    let callbacksNode = null;
    if (hasHead) {
        const title = method.summary ??
            (method.operationId ? idToTitle(method.operationId) : path);
        headNode = (_jsxs(_Fragment, { children: [heading(headingLevel, title, ctx), method.description ? _jsx(Markdown, { text: method.description }) : null] }));
        headingLevel++;
    }
    const contentTypes = body ? Object.entries(body.content) : null;
    if (body && contentTypes && contentTypes.length > 0) {
        bodyNode = (_jsxs(SelectTabs, { defaultValue: contentTypes[0][0], children: [_jsxs("div", { className: "flex gap-2 items-end justify-between", children: [heading(headingLevel, 'Request Body', ctx), _jsx(SelectTabTrigger, { items: contentTypes.map((v) => v[0]), className: "mb-4" })] }), body.description && _jsx(Markdown, { text: body.description }), contentTypes.map(([type, content]) => {
                    if (!(type in ctx.mediaAdapters)) {
                        throw new Error(`Media type ${type} is not supported (in ${path})`);
                    }
                    return (_jsx(SelectTab, { value: type, children: _jsx(Schema, { name: "body", as: "body", schema: (content.schema ?? {}), required: body.required, readOnly: method.method === 'GET', writeOnly: method.method !== 'GET', ctx: ctx }) }, type));
                })] }));
    }
    if (method.responses && ctx.showResponseSchema !== false) {
        const statuses = Object.keys(method.responses);
        responseNode = (_jsxs(_Fragment, { children: [heading(headingLevel, 'Response Body', ctx), _jsx(Accordions, { type: "multiple", defaultValue: statuses.includes('200') ? ['200'] : [], children: statuses.map((status) => (_jsx(AccordionItem, { value: status, children: _jsx(ResponseAccordion, { status: status, operation: method, ctx: ctx }) }, status))) })] }));
    }
    const responseHeaderNode = Object.entries(method.responses ?? {})
        .flatMap(([status, response]) => {
        const headers = response?.headers;
        if (!headers)
            return [];
        return Object.entries(headers).map(([name, header]) => ({
            status,
            name,
            header,
        }));
    });
    const parameterNode = Object.entries(ParamTypes).map(([type, title]) => {
        const params = method.parameters?.filter((param) => param.in === type);
        if (!params || params.length === 0)
            return;
        return (_jsxs(Fragment, { children: [heading(headingLevel, title, ctx), _jsx("div", { className: "flex flex-col", children: params.map((param) => (_jsx(Schema, { name: param.name, schema: {
                            ...param.schema,
                            description: param.description ?? param.schema?.description,
                            deprecated: (param.deprecated ?? false) ||
                                (param.schema?.deprecated ?? false),
                        }, required: param.required, readOnly: method.method === 'GET', writeOnly: method.method !== 'GET', ctx: ctx }, param.name))) })] }, type));
    });
    // Response Headers(responses.<code>.headers):按状态码分组,
    // 外层结构与 bodyNode 的 media-type SelectTabs 对齐;
    // 条目样式与 Header Parameters 完全一致(同 Schema 渲染管道)
    const responseHeaderStatuses = Array.from(new Set(responseHeaderNode.map((item) => item.status)));
    const responseHeaderNodeRendered = responseHeaderNode.length > 0 ? (_jsxs(Fragment, { children: [heading(headingLevel, 'Response Headers', ctx), _jsxs(SelectTabs, { defaultValue: responseHeaderStatuses[0], children: [_jsxs("div", { className: "flex items-end justify-between gap-2", children: [_jsx("span", {}), responseHeaderStatuses.length > 1 && (_jsx(SelectTabTrigger, { items: responseHeaderStatuses, className: "mb-4" }))] }), responseHeaderStatuses.map((status) => {
                        const items = responseHeaderNode.filter((item) => item.status === status);
                        return (_jsx(SelectTab, { value: status, children: _jsx("div", { className: "flex flex-col", children: items.map(({ name, header }) => {
                                    const headerObject = header;
                                    return (_jsx(Schema, { name: name, schema: {
                                            ...(headerObject.schema ?? { type: 'string' }),
                                            description: headerObject.description ??
                                                headerObject.schema?.description,
                                            deprecated: (headerObject.deprecated ?? false) ||
                                                (headerObject.schema?.deprecated ??
                                                    false),
                                        }, required: false, readOnly: method.method === 'GET', writeOnly: method.method !== 'GET', ctx: ctx }, name));
                                }) }) }, status));
                    })] })] })) : null;
    const securities = (method.security ??
        ctx.schema.document.security ??
        []).filter((v) => Object.keys(v).length > 0);
    if (type === 'operation' && securities.length > 0) {
        const securitySchemes = ctx.schema.document.components?.securitySchemes;
        const names = securities.map((security) => Object.keys(security).join(' & '));
        authNode = (_jsxs(SelectTabs, { defaultValue: names[0], children: [_jsxs("div", { className: "flex items-end justify-between gap-2", children: [heading(headingLevel, 'Authorization', ctx), _jsx(SelectTabTrigger, { items: names, className: "mb-4" })] }), securities.map((security, i) => (_jsx(SelectTab, { value: names[i], children: Object.entries(security).map(([key, scopes]) => {
                        const scheme = securitySchemes?.[key];
                        if (!scheme)
                            return;
                        return (_jsx(AuthScheme, { scheme: scheme, scopes: scopes, ctx: ctx }, key));
                    }) }, i)))] }));
    }
    if (method.callbacks) {
        const callbacks = Object.entries(method.callbacks);
        callbacksNode = (_jsxs(SelectTabs, { defaultValue: callbacks[0][0], children: [_jsxs("div", { className: "flex justify-between gap-2 items-end", children: [heading(headingLevel, 'Callbacks', ctx), _jsx(SelectTabTrigger, { items: callbacks.map((v) => v[0]), className: "mb-4" })] }), callbacks.map(([name, callback]) => (_jsx(SelectTab, { value: name, children: _jsx(WebhookCallback, { callback: callback, ctx: ctx, headingLevel: headingLevel }) }, name)))] }));
    }
    const info = (_jsxs(ctx.renderer.APIInfo, { head: headNode, method: method.method, route: path, children: [type === 'operation' ? (ctx.disablePlayground ? (_jsxs("div", { className: "flex flex-row items-center gap-2.5 p-3 rounded-xl border bg-fd-card text-fd-card-foreground not-prose", children: [_jsx(MethodLabel, { className: "text-xs", children: method.method }), _jsx("code", { className: "flex-1 overflow-auto text-nowrap text-[13px] text-fd-muted-foreground", children: path })] })) : (_jsx(ctx.renderer.APIPlayground, { path: path, method: method, ctx: ctx }))) : null, authNode, parameterNode, bodyNode, responseHeaderNodeRendered, responseNode, callbacksNode] }));
    if (type === 'operation') {
        const examples = getAPIExamples(path, method, ctx);
        return (_jsx(ctx.renderer.API, { children: _jsxs(APIExampleProvider, { route: path, examples: examples, method: method, children: [info, _jsx(APIExample, { examples: examples, method: method, ctx: ctx })] }) }));
    }
    else {
        return info;
    }
}
async function ResponseAccordion({ status, operation, ctx, }) {
    const response = operation.responses[status];
    const { generateTypeScriptSchema, schema: { dereferenceMap }, } = ctx;
    const contentTypes = response.content
        ? Object.entries(response.content)
        : null;
    return (_jsxs(SelectTabs, { defaultValue: contentTypes?.[0][0], children: [_jsxs(AccordionHeader, { children: [_jsx(AccordionTrigger, { className: "font-mono", children: status }), contentTypes && (_jsx(SelectTabTrigger, { items: contentTypes.map((v) => v[0]) }))] }), _jsxs(AccordionContent, { children: [response.description && (_jsx("div", { className: "prose-no-margin", children: _jsx(Markdown, { text: response.description }) })), contentTypes?.map(async ([type, resType]) => {
                        const schema = resType.schema;
                        let ts;
                        if (generateTypeScriptSchema) {
                            ts = await generateTypeScriptSchema(operation, status);
                        }
                        else if (generateTypeScriptSchema === undefined && schema) {
                            ts = await getTypescriptSchema(schema, dereferenceMap);
                        }
                        return (_jsxs(SelectTab, { value: type, className: "mt-2", children: [ts && _jsx(CopyResponseTypeScript, { code: ts }), schema && (_jsx("div", { className: "border px-3 rounded-lg my-2 overflow-auto max-h-[400px]", children: _jsx(Schema, { name: "response", schema: schema, as: "body", readOnly: true, ctx: ctx }) }))] }, type));
                    })] })] }));
}
function WebhookCallback({ callback, ctx, headingLevel, }) {
    const pathItems = Object.entries(callback);
    return (_jsx(Accordions, { type: "single", collapsible: true, children: pathItems.map(([path, pathItem]) => {
            const pathNodes = methodKeys.map((method) => {
                const operation = pathItem[method];
                if (!operation)
                    return null;
                return (_jsx("div", { className: "border p-3 my-2 prose-no-margin rounded-lg", children: _jsx(Operation, { type: "webhook", path: path, headingLevel: headingLevel + 1, method: createMethod(method, pathItem, operation), ctx: ctx }) }, method));
            });
            return (_jsxs(AccordionItem, { value: path, children: [_jsx(AccordionHeader, { children: _jsx(AccordionTrigger, { className: "font-mono", children: path }) }), _jsx(AccordionContent, { children: pathNodes })] }, path));
        }) }));
}
function AuthScheme({ scheme: schema, scopes, ctx: { renderer }, }) {
    const scopeElement = scopes.length > 0 ? (_jsxs("p", { children: ["Scope: ", _jsx("code", { children: scopes.join(', ') })] })) : null;
    if (schema.type === 'http' || schema.type === 'oauth2') {
        return (_jsxs(renderer.Property, { name: "Authorization", type: schema.type === 'http' && schema.scheme === 'basic'
                ? `Basic <token>`
                : 'Bearer <token>', required: true, children: [schema.description && _jsx(Markdown, { text: schema.description }), _jsxs("p", { children: ["In: ", _jsx("code", { children: "header" })] }), scopeElement] }));
    }
    if (schema.type === 'apiKey') {
        return (_jsxs(renderer.Property, { name: schema.name, type: "<token>", children: [schema.description && _jsx(Markdown, { text: schema.description }), _jsxs("p", { children: ["In: ", _jsx("code", { children: schema.in }), scopeElement] })] }));
    }
    if (schema.type === 'openIdConnect') {
        return (_jsxs(renderer.Property, { name: "OpenID Connect", type: "<token>", required: true, children: [schema.description && _jsx(Markdown, { text: schema.description }), scopeElement] }));
    }
}
