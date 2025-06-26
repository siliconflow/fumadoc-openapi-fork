'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useState, } from 'react';
import { defaultAdapters } from '../../media/adapter.js';
const ApiContext = createContext(null);
const ServerSelectContext = createContext(null);
export function useApiContext() {
    const ctx = useContext(ApiContext);
    if (!ctx)
        throw new Error('Component must be used under <ApiProvider />');
    return ctx;
}
export function useServerSelectContext() {
    const ctx = useContext(ServerSelectContext);
    if (!ctx)
        throw new Error('Component must be used under <ApiProvider />');
    return ctx;
}
export function ApiProvider({ defaultBaseUrl, children, servers, mediaAdapters, shikiOptions, }) {
    const [server, setServer] = useState(() => {
        const defaultItem = defaultBaseUrl
            ? servers.find((item) => item.url === defaultBaseUrl)
            : servers.at(0);
        return defaultItem
            ? {
                url: defaultItem.url,
                variables: getDefaultValues(defaultItem),
            }
            : null;
    });
    useEffect(() => {
        const cached = localStorage.getItem('apiBaseUrl');
        if (!cached)
            return;
        try {
            const obj = JSON.parse(cached);
            if (!obj || typeof obj !== 'object')
                return;
            setServer(obj);
        }
        catch {
            // ignore
        }
    }, []);
    return (_jsx(ApiContext.Provider, { value: useMemo(() => ({
            shikiOptions,
            mediaAdapters: {
                ...defaultAdapters,
                ...mediaAdapters,
            },
            servers,
        }), [mediaAdapters, servers, shikiOptions]), children: _jsx(ServerSelectContext.Provider, { value: useMemo(() => ({
                server,
                setServerVariables(variables) {
                    setServer((prev) => {
                        if (!prev)
                            return null;
                        const updated = { ...prev, variables };
                        localStorage.setItem('apiBaseUrl', JSON.stringify(updated));
                        return updated;
                    });
                },
                setServer(value) {
                    const obj = servers.find((item) => item.url === value);
                    if (!obj)
                        return;
                    const result = {
                        url: value,
                        variables: getDefaultValues(obj),
                    };
                    localStorage.setItem('apiBaseUrl', JSON.stringify(result));
                    setServer(result);
                },
            }), [server, servers]), children: children }) }));
}
function getDefaultValues(server) {
    return Object.fromEntries(Object.entries(server.variables ?? {}).map(([k, v]) => [k, v.default]));
}
