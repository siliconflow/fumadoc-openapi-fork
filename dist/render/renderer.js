import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { AccordionContent, AccordionHeader, AccordionItem, Accordions, AccordionTrigger, } from '../ui/components/accordion.js';
import { API, APIExample, APIInfo, ObjectCollapsible, Property, Root, } from '../ui/index.js';
import { APIPlayground } from '../playground/index.js';
import { CodeExampleSelector } from '../ui/lazy.js';
export function createRenders() {
    return {
        Root,
        API,
        APIInfo: ({ children, head }) => (_jsxs(APIInfo, { children: [head, children] })),
        APIExample,
        Responses: (props) => (_jsx(Tabs, { ...props, groupId: "fumadocs_openapi_responses" })),
        Response: Tab,
        ResponseTypes: (props) => (_jsx(Accordions, { type: "single", className: "pt-2", defaultValue: props.defaultValue, children: props.children })),
        ResponseType: (props) => (_jsxs(AccordionItem, { value: props.label, children: [_jsx(AccordionHeader, { children: _jsx(AccordionTrigger, { children: props.label }) }), _jsx(AccordionContent, { className: "prose-no-margin", children: props.children })] })),
        Property,
        ObjectCollapsible,
        Requests: (props) => (_jsx(Tabs, { groupId: "fumadocs_openapi_requests", ...props })),
        CodeExampleSelector,
        Request: (props) => _jsx(Tab, { value: props.name, children: props.children }),
        APIPlayground,
    };
}
