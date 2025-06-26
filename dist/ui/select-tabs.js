'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, use, useMemo, useState, } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '../ui/components/select.js';
import { cn } from 'fumadocs-ui/utils/cn';
const Context = createContext(null);
export function SelectTabs({ defaultValue, children, }) {
    const [type, setType] = useState(defaultValue ?? null);
    return (_jsx(Context, { value: useMemo(() => ({ type, setType }), [type]), children: children }));
}
export function SelectTab({ value, ...props }) {
    const { type } = use(Context);
    if (value !== type)
        return;
    return _jsx("div", { ...props, children: props.children });
}
export function SelectTabTrigger({ items, ...props }) {
    const { type, setType } = use(Context);
    return (_jsxs(Select, { value: type ?? '', onValueChange: setType, children: [_jsx(SelectTrigger, { ...props, className: cn('not-prose w-fit', props.className), children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: items.map((type) => (_jsx(SelectItem, { value: type, children: type }, type))) })] }));
}
