import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from '../ui/components/method-label.js';
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from 'fumadocs-ui/components/ui/collapsible';
import { ChevronDown } from '../icons.js';
import { ApiProvider } from '../ui/lazy.js';
import { cn } from 'fumadocs-ui/utils/cn';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
export function Root({ children, className, ctx, ...props }) {
    return (_jsx("div", { className: cn('flex flex-col gap-24 text-sm', className), ...props, children: _jsx(ApiProvider, { mediaAdapters: Object.fromEntries(Object.entries(ctx.mediaAdapters).filter(([_, v]) => typeof v !== 'boolean')), servers: ctx.servers, shikiOptions: ctx.shikiOptions, children: children }) }));
}
export function APIInfo({ className, ...props }) {
    return (_jsx("div", { className: cn('min-w-0 flex-1', className), ...props, children: props.children }));
}
export function API({ children, ...props }) {
    return (_jsx("div", { ...props, className: cn('flex flex-col gap-x-6 gap-y-4 xl:flex-row xl:items-start', props.className), style: {
            '--fd-api-info-top': 'calc(12px + var(--fd-nav-height) + var(--fd-banner-height) + var(--fd-tocnav-height, 0px))',
            ...props.style,
        }, children: children }));
}
export function Property({ name, type, required, deprecated, nested, ...props }) {
    return (_jsxs("div", { className: cn('text-sm border-t', nested
            ? 'p-3 border-x bg-fd-card last:rounded-b-xl first:rounded-tr-xl last:border-b'
            : 'py-4 first:border-t-0'), children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 not-prose", children: [_jsx("span", { className: "font-medium font-mono text-fd-primary", children: name }), _jsx("span", { className: "text-fd-muted-foreground px-2 ", children: type }), required && (_jsx("span", { className: "me-auto text-xs font-mono text-fd-muted-foreground", children: _jsx(Badge, { color: "red", className: "text-xs text-fd-muted-foreground pl-1", children: "required" }) })), deprecated && (_jsx(Badge, { color: "yellow", className: "text-xs", children: "Deprecated" }))] }), _jsx("div", { className: "prose-no-margin pt-2.5 empty:hidden", children: props.children })] }));
}
export function APIExample(props) {
    return (_jsx("div", { ...props, className: cn('prose-no-margin md:sticky md:top-(--fd-api-info-top) xl:w-[400px]', props.className), children: props.children }));
}
export function ObjectCollapsible(props) {
    return (_jsxs(Collapsible, { ...props, children: [_jsxs(CollapsibleTrigger, { className: cn(buttonVariants({ color: 'secondary', size: 'sm' }), 'group px-3 py-2 data-[state=open]:rounded-b-none'), children: [props.name, _jsx(ChevronDown, { className: "size-4 text-fd-muted-foreground group-data-[state=open]:rotate-180" })] }), _jsx(CollapsibleContent, { className: "-mt-px *:bg-fd-card", children: props.children })] }));
}
export { APIPage } from '../render/api-page.js';
