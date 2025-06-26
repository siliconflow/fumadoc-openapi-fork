import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MethodLabel } from '../ui/components/method-label.js';
/**
 * Source API Integration
 *
 * Add this to page tree builder options
 */
export const attachFile = (node, file) => {
    if (!file)
        return node;
    let data = file.data;
    // backward compatible with older versions with `_openapi` is located in `data.data`
    if ('data' in data && data.data && typeof data === 'object')
        data = data.data;
    let method;
    if ('_openapi' in data && typeof data._openapi === 'object') {
        const meta = data._openapi;
        method = meta.method;
    }
    if (method) {
        node.name = (_jsxs(_Fragment, { children: [node.name, ' ', _jsx(MethodLabel, { className: "ms-auto text-xs text-nowrap", children: method })] }));
    }
    return node;
};
