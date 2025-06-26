import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from '../../ui/components/dialog.js';
import { useForm } from 'react-hook-form';
import { Input, labelVariants } from '../../ui/components/input.js';
import { useQuery } from '../../utils/use-query.js';
import { useEffect, useState } from 'react';
import { cn } from 'fumadocs-ui/utils/cn';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '../../ui/components/select.js';
const FlowTypes = {
    password: {
        name: 'Resource Owner Password Flow',
        description: 'Authenticate using username and password.',
    },
    clientCredentials: {
        name: 'Client Credentials',
        description: 'Intended for the server-to-server authentication.',
    },
    authorizationCode: {
        name: 'Authorization code',
        description: 'Authenticate with 3rd party services',
    },
    implicit: {
        name: 'Implicit',
        description: 'Retrieve the access token directly.',
    },
};
export function OauthDialog({ scheme, scopes, setToken, children, open, setOpen, }) {
    const [type, setType] = useState(() => {
        return Object.keys(scheme.flows)[0];
    });
    const form = useForm({
        defaultValues: {
            clientId: '',
            clientSecret: '',
            username: '',
            password: '',
        },
    });
    const authCodeCallback = useQuery(async (code, state) => {
        const value = scheme.flows.authorizationCode;
        const res = await fetch(value.tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                // note: `state` could be invalid, but server will check it
                redirect_uri: state.redirect_uri,
                client_id: state.client_id,
                client_secret: state.client_secret,
            }),
        });
        if (!res.ok)
            throw new Error(await res.text());
        const { access_token, token_type = 'Bearer' } = (await res.json());
        setToken(`${token_type} ${access_token}`);
        setOpen(false);
    });
    useEffect(() => {
        if (scheme.flows.authorizationCode) {
            const params = new URLSearchParams(window.location.search);
            const state = params.get('state');
            const code = params.get('code');
            if (state && code) {
                const parsedState = JSON.parse(state);
                setOpen(true);
                form.setValue('clientId', parsedState.client_id);
                form.setValue('clientSecret', parsedState.client_secret);
                authCodeCallback.start(code, parsedState);
                window.history.replaceState(null, '', window.location.pathname);
                return;
            }
        }
        if (scheme.flows.implicit && window.location.hash.length > 1) {
            const params = new URLSearchParams(window.location.hash.slice(1));
            const state = params.get('state');
            const token = params.get('access_token');
            const type = params.get('token_type') ?? 'Bearer';
            if (state && token) {
                const parsedState = JSON.parse(state);
                form.setValue('clientId', parsedState.client_id);
                setToken(`${type} ${token}`);
                window.history.replaceState(null, '', window.location.pathname);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- first page load only
    }, []);
    const authorize = useQuery(async (values) => {
        if (type === 'implicit') {
            const value = scheme.flows[type];
            const params = new URLSearchParams();
            params.set('response_type', 'token');
            params.set('client_id', values.clientId);
            params.set('redirect_uri', window.location.href);
            params.set('scope', scopes.join('+'));
            params.set('state', JSON.stringify({
                client_id: values.clientId,
                redirect_uri: window.location.href,
            }));
            window.location.replace(`${value.authorizationUrl}?${params.toString()}`);
            return;
        }
        if (type === 'authorizationCode') {
            const value = scheme.flows[type];
            const params = new URLSearchParams();
            params.set('response_type', 'code');
            params.set('client_id', values.clientId);
            params.set('redirect_uri', window.location.href);
            params.set('scope', scopes.join('+'));
            params.set('state', JSON.stringify({
                client_id: values.clientId,
                client_secret: values.clientSecret,
                redirect_uri: window.location.href,
            }));
            window.location.replace(`${value.authorizationUrl}?${params.toString()}`);
            return;
        }
        let res;
        if (type === 'password') {
            const value = scheme.flows[type];
            res = await fetch(value.tokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'password',
                    username: values.username,
                    password: values.password,
                    scope: scopes.join('+'),
                }),
            });
        }
        if (type === 'clientCredentials') {
            const value = scheme.flows[type];
            res = await fetch(value.tokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: values.clientId,
                    client_secret: values.clientSecret,
                    scope: scopes.join('+'),
                }),
            });
        }
        if (res) {
            if (!res.ok)
                throw new Error(await res.text());
            const { access_token, token_type = 'Bearer' } = (await res.json());
            setToken(`${token_type} ${access_token}`);
            setOpen(false);
        }
    });
    const onSubmit = form.handleSubmit((values) => {
        return authorize.start(values);
    });
    const isLoading = authorize.isLoading || authCodeCallback.isLoading;
    const error = authCodeCallback.error ?? authorize.error;
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [children, _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Authorization" }), _jsx(DialogDescription, { children: "Obtain the access token for API." })] }), _jsxs("form", { className: "flex flex-col gap-6", onSubmit: (e) => {
                            void onSubmit(e);
                            e.stopPropagation();
                        }, children: [_jsxs(Select, { value: type, onValueChange: setType, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: Object.keys(scheme.flows).map((key) => {
                                            const { name, description } = FlowTypes[key];
                                            return (_jsxs(SelectItem, { value: key, children: [_jsx("p", { className: "font-medium", children: name }), _jsx("p", { className: "text-fd-muted-foreground", children: description })] }, key));
                                        }) })] }), (type === 'authorizationCode' ||
                                type === 'clientCredentials' ||
                                type === 'implicit') && (_jsxs("fieldset", { className: "flex flex-col gap-1.5", children: [_jsx("label", { htmlFor: "client_id", className: cn(labelVariants()), children: "Client ID" }), _jsx("p", { className: "text-fd-muted-foreground text-sm", children: "The client ID of your OAuth application." }), _jsx(Input, { id: "client_id", placeholder: "Enter value", type: "text", autoComplete: "off", disabled: isLoading, ...form.register('clientId', { required: true }) })] })), (type === 'authorizationCode' || type === 'clientCredentials') && (_jsxs("fieldset", { className: "flex flex-col gap-1.5", children: [_jsx("label", { htmlFor: "client_secret", className: cn(labelVariants()), children: "Client Secret" }), _jsx("p", { className: "text-fd-muted-foreground text-sm", children: "The client secret of your OAuth application." }), _jsx(Input, { id: "client_secret", placeholder: "Enter value", type: "password", autoComplete: "off", disabled: isLoading, ...form.register('clientSecret', { required: true }) })] })), type === 'password' && (_jsxs(_Fragment, { children: [_jsxs("fieldset", { className: "flex flex-col gap-1.5", children: [_jsx("label", { htmlFor: "username", className: cn(labelVariants()), children: "Username" }), _jsx(Input, { id: "username", placeholder: "Enter value", type: "text", disabled: isLoading, autoComplete: "off", ...form.register('username', { required: true }) })] }), _jsxs("fieldset", { className: "flex flex-col gap-1.5", children: [_jsx("label", { htmlFor: "password", className: cn(labelVariants()), children: "Client Secret" }), _jsx(Input, { id: "password", placeholder: "Enter value", type: "password", autoComplete: "off", disabled: isLoading, ...form.register('password', { required: true }) })] })] })), error ? (_jsx("p", { className: "text-red-400 font-medium text-sm", children: String(error) })) : null, _jsx("button", { type: "submit", disabled: isLoading, className: cn(buttonVariants({
                                    color: 'primary',
                                })), children: authCodeCallback.isLoading ? 'Fetching token...' : 'Submit' })] })] })] }));
}
export const OauthDialogTrigger = DialogTrigger;
