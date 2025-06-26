import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment } from 'react';
import { combineSchema } from '../utils/combine-schema.js';
import { Markdown } from './markdown.js';
import { schemaToString } from '../utils/schema-to-string.js';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from 'fumadocs-ui/components/tabs';
export function Schema({ name, schema, required = false, readOnly = false, writeOnly = false, as = 'property', ctx: { renderer }, }) {
    function propertyBody(schema, renderPrimitive, ctx) {
        if (Array.isArray(schema.type)) {
            const items = schema.type.flatMap((type) => {
                const composed = {
                    ...schema,
                    type,
                };
                if (!isComplexType(composed))
                    return [];
                return composed;
            });
            if (items.length === 0)
                return;
            if (items.length === 1)
                return propertyBody(items[0], renderPrimitive, ctx);
            return (_jsxs(Tabs, { defaultValue: items[0].type, children: [_jsx(TabsList, { children: items.map((item) => (_jsx(TabsTrigger, { value: item.type, children: schemaToString(item) }, item.type))) }), items.map((item) => (_jsxs(TabsContent, { value: item.type, children: [item.description && _jsx(Markdown, { text: item.description }), propertyInfo(item), renderPrimitive(item, ctx)] }, item.type)))] }));
        }
        if (schema.oneOf) {
            const oneOf = schema.oneOf.filter((item) => isComplexType(item));
            if (oneOf.length === 0)
                return;
            if (oneOf.length === 1) {
                return propertyBody(oneOf[0], renderPrimitive, ctx);
            }
            return (_jsxs(Tabs, { defaultValue: "0", children: [_jsx(TabsList, { children: oneOf.map((item, i) => (_jsx(TabsTrigger, { value: i.toString(), children: schemaToString(item) }, i))) }), oneOf.map((item, i) => (_jsxs(TabsContent, { value: i.toString(), children: [item.description && _jsx(Markdown, { text: item.description }), propertyInfo(item), propertyBody(item, (child, ctx) => primitiveBody(child, ctx, false, true), ctx)] }, i)))] }));
        }
        const of = schema.allOf ?? schema.anyOf;
        if (of) {
            const arr = of.filter((item) => !ctx.stack.has(item));
            if (arr.length === 0)
                return;
            const combined = combineSchema(arr);
            if (typeof combined === 'boolean')
                return;
            return renderPrimitive(combined, ctx);
        }
        return renderPrimitive(schema, ctx);
    }
    function propertyInfo(schema) {
        console.log('schema =>', schema);
        const fields = [];
        if (schema.default) {
            fields.push({
                key: 'Default',
                value: JSON.stringify(schema.default),
            });
        }
        if (schema.pattern) {
            fields.push({
                key: 'Match',
                value: schema.pattern,
            });
        }
        if (schema.format) {
            fields.push({
                key: 'Format',
                value: schema.format,
            });
        }
        if (schema.multipleOf) {
            fields.push({
                key: 'Multiple Of',
                value: String(schema.multipleOf),
            });
        }
        let range = getRange('value', schema.minimum, schema.exclusiveMinimum, schema.maximum, schema.exclusiveMaximum);
        if (range)
            fields.push({
                key: 'Range',
                value: range,
            });
        range = getRange('length', schema.minLength, undefined, schema.maxLength, undefined);
        if (range)
            fields.push({
                key: 'Length',
                value: range,
            });
        range = getRange('properties', schema.minProperties, undefined, schema.maxProperties, undefined);
        if (range)
            fields.push({
                key: 'Properties',
                value: range,
            });
        if (schema.enum) {
            fields.push({
                key: 'Value in',
                value: schema.enum.map((value) => JSON.stringify(value)).join(' | '),
            });
        }
        // @ts-expect-error - example is not a valid property of the schema
        if (schema.example) {
            fields.push({
                key: 'Example',
                // @ts-expect-error - example is not a valid property of the schema
                value: JSON.stringify(schema.example),
            });
        }
        if (fields.length === 0)
            return;
        return (_jsx("div", { className: "flex flex-wrap gap-2 not-prose", children: fields.map((field) => (_jsxs("div", { className: "bg-fd-secondary border rounded-lg text-xs p-1.5 shadow-md", children: [_jsx("span", { className: "font-medium me-2", children: field.key }), _jsx("code", { className: "text-fd-muted-foreground", children: field.value })] }, field.key))) }));
    }
    function primitiveBody(schema, ctx, collapsible, nested) {
        if (schema.type === 'object') {
            if (ctx.stack.has(schema))
                return _jsx("p", { children: "Recursive" });
            const props = Object.entries(schema.properties ?? {});
            const patternProps = Object.entries(schema.patternProperties ?? {});
            const next = {
                ...ctx,
                stack: ctx.stack.next(schema),
            };
            if (props.length === 0 && patternProps.length === 0)
                return _jsx("p", { children: "Empty Object" });
            const children = (_jsxs(_Fragment, { children: [props.map(([key, value]) => (_jsx(Fragment, { children: property(key, value, next, {
                            required: schema.required?.includes(key) ?? false,
                            nested,
                        }) }, key))), patternProps.map(([key, value]) => (_jsx(Fragment, { children: property(key, value, next, { nested }) }, key))), schema.additionalProperties &&
                        property('[key: string]', schema.additionalProperties, next, {
                            nested,
                        })] }));
            if (!collapsible)
                return children;
            return (_jsx(renderer.ObjectCollapsible, { name: "Show Attributes", children: children }));
        }
        if (schema.type === 'array') {
            const items = schema.items;
            if (!items || !isComplexType(items) || ctx.stack.has(items))
                return;
            return (_jsxs(_Fragment, { children: [items.description && (_jsx(Markdown, { text: 'Item: ' + items.description })), _jsx(renderer.ObjectCollapsible, { name: "Array Item", children: propertyBody(items, (child, ctx) => primitiveBody(child, ctx, false, true), {
                            ...ctx,
                            stack: ctx.stack.next(schema),
                        }) })] }));
        }
    }
    function property(key, schema, ctx, props) {
        if (schema === true) {
            return _jsx(renderer.Property, { name: key, type: "any", ...props });
        }
        else if (schema === false) {
            return _jsx(renderer.Property, { name: key, type: "never", ...props });
        }
        if ((schema.readOnly && !readOnly) || (schema.writeOnly && !writeOnly))
            return;
        return (_jsxs(renderer.Property, { name: key, type: schemaToString(schema), deprecated: schema.deprecated, ...props, children: [schema.description && _jsx(Markdown, { text: schema.description }), propertyInfo(schema), propertyBody(schema, (child, ctx) => primitiveBody(child, ctx, true, true), ctx)] }));
    }
    const context = {
        stack: schemaStack(),
    };
    if (typeof schema === 'boolean' ||
        as === 'property' ||
        !isComplexType(schema))
        return property(name, schema, context, { required });
    return propertyBody(schema, (child, ctx) => primitiveBody(child, ctx, false, false), context);
}
function schemaStack(parent) {
    const titles = new Set();
    const history = new WeakSet();
    return {
        next(...schemas) {
            const child = schemaStack(this);
            for (const item of schemas) {
                child.add(item);
            }
            return child;
        },
        add(schema) {
            if (typeof schema !== 'object')
                return;
            if (schema.title)
                titles.add(schema.title);
            history.add(schema);
        },
        has(schema) {
            if (typeof schema !== 'object')
                return false;
            if (parent && parent.has(schema))
                return true;
            if (schema.title && titles.has(schema.title))
                return true;
            return history.has(schema);
        },
    };
}
/**
 * Check if the schema needs another collapsible to explain
 */
function isComplexType(schema) {
    if (typeof schema === 'boolean')
        return false;
    const arr = schema.anyOf ?? schema.oneOf ?? schema.allOf;
    if (arr && arr.some(isComplexType))
        return true;
    return (schema.type === 'object' ||
        (schema.type === 'array' &&
            schema.items != null &&
            isComplexType(schema.items)));
}
function getRange(value, min, exclusiveMin, max, exclusiveMax) {
    const out = [];
    if (min) {
        out.push(`${min} <=`);
    }
    else if (exclusiveMin) {
        out.push(`${exclusiveMin} <`);
    }
    out.push(value);
    if (max) {
        out.push(`<= ${max}`);
    }
    else if (exclusiveMax) {
        out.push(`< ${exclusiveMax}`);
    }
    if (out.length > 1)
        return out.join(' ');
}
