'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { cn } from 'fumadocs-ui/utils/cn';
import { Check, Copy } from '../icons.js';
export function CopyResponseTypeScript({ code }) {
    const [isChecked, onCopy] = useCopyButton(() => {
        void navigator.clipboard.writeText(code);
    });
    return (_jsxs("div", { className: "flex items-start justify-between gap-2 bg-fd-card text-fd-card-foreground border rounded-xl p-3 not-prose mb-4 last:mb-0", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm mb-2", children: "TypeScript Definitions" }), _jsx("p", { className: "text-xs text-fd-muted-foreground", children: "Use the response body type in TypeScript." })] }), _jsxs("button", { onClick: onCopy, className: cn(buttonVariants({
                    color: 'secondary',
                    className: 'p-2 gap-2',
                    size: 'sm',
                })), children: [isChecked ? (_jsx(Check, { className: "size-3.5" })) : (_jsx(Copy, { className: "size-3.5" })), "Copy"] })] }));
}
