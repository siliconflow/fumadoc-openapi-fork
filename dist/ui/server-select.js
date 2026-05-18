'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useApiContext, useServerSelectContext, } from '../ui/contexts/api.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '../ui/components/select.js';
import { Input, labelVariants } from '../ui/components/input.js';
import { useEffect, useState } from 'react';
import { cn } from 'fumadocs-ui/utils/cn';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from '../ui/components/dialog.js';
import { resolveServerUrl, withBase } from '../utils/url.js';
import { FormProvider, useController, useForm } from 'react-hook-form';
import { useEffectEvent } from 'fumadocs-core/utils/use-effect-event';
export default function ServerSelect(props) {
    const { servers } = useApiContext();
    const { server, setServer } = useServerSelectContext();
    const [open, setOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (servers.length <= 0)
        return;
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { className: "text-xs p-3 py-2 bg-fd-muted text-fd-muted-foreground transition-colors truncate hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:outline-none", children: isMounted
                    ? withBase(server ? resolveServerUrl(server.url, server.variables) : '/', window.location.origin)
                    : 'loading...' }), _jsxs(DialogContent, { ...props, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Server URL" }), _jsx(DialogDescription, { children: "The base URL of your API endpoint aaaa." })] }), _jsxs(Select, { value: server?.url, onValueChange: setServer, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: servers.map((item) => (_jsxs(SelectItem, { value: item.url, children: [_jsx("code", { className: "text-[13px]", children: item.url }), _jsx("p", { className: "text-fd-muted-foreground", children: item.description })] }, item.url))) })] }), server && server.variables && (_jsx(ServerSelectContent, { server: server }, server.url))] })] }));
}
function ServerSelectContent({ server }) {
    const { servers } = useApiContext();
    const { setServerVariables } = useServerSelectContext();
    const schema = servers.find((item) => item.url === server.url);
    const form = useForm({
        defaultValues: server.variables,
    });
    const onChangeDebounced = useEffectEvent((values) => {
        setServerVariables(values);
    });
    useEffect(() => {
        let timer = null;
        return form.subscribe({
            formState: {
                values: true,
            },
            callback({ values }) {
                if (timer !== null)
                    window.clearTimeout(timer);
                timer = window.setTimeout(() => onChangeDebounced(values), 500);
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps -- `form` shouldn't be included
    }, []);
    if (!schema?.variables)
        return;
    return (_jsx(FormProvider, { ...form, children: _jsx("div", { className: "flex flex-col gap-4", children: Object.entries(schema.variables).map(([key, variable]) => {
                return (_jsxs("fieldset", { className: "flex flex-col gap-1", children: [_jsx("label", { className: cn(labelVariants()), htmlFor: key, children: key }), _jsx("p", { className: "text-xs text-fd-muted-foreground empty:hidden", children: variable.description }), _jsx(Field, { fieldName: key, variable: variable })] }, key));
            }) }) }));
}
function Field({ fieldName, variable, }) {
    const { field } = useController({
        name: fieldName,
    });
    if (variable.enum) {
        return (_jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [_jsx(SelectTrigger, { id: fieldName, ref: field.ref, children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: variable.enum.map((value) => (_jsx(SelectItem, { value: value, children: value }, value))) })] }));
    }
    return _jsx(Input, { id: fieldName, ...field });
}
