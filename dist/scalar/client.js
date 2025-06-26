'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from 'fumadocs-ui/utils/cn';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { ApiClientModalProvider, useApiClientModal, } from '@scalar/api-client-react';
import { MethodLabel } from '../ui/components/method-label.js';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
export default function ScalarPlayground({ path, method, spec, }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    return (_jsxs("div", { className: cn('flex flex-row items-center gap-2.5 p-3 rounded-xl border bg-fd-card text-fd-card-foreground not-prose', mounted ? `${resolvedTheme}-mode` : null), children: [_jsx(MethodLabel, { className: "text-xs", children: method }), _jsx("code", { className: "flex-1 overflow-auto text-nowrap text-[13px] text-fd-muted-foreground", children: path }), _jsx(ApiClientModalProvider, { configuration: {
                    theme: 'moon',
                    spec: {
                        content: spec,
                    },
                }, children: _jsx(Trigger, { path: path, method: method }) })] }));
}
function Trigger({ path, method }) {
    const client = useApiClientModal();
    return (_jsx("button", { type: "submit", className: cn(buttonVariants({ color: 'primary', size: 'sm' }), 'px-3 py-1.5'), onClick: () => client?.open({ path, method: method }), children: "Test" }));
}
