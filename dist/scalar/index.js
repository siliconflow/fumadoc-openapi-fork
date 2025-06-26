import { jsx as _jsx } from "react/jsx-runtime";
import dynamic from 'next/dynamic';
const Client = dynamic(() => import('./client.js'));
export function APIPlayground({ path, method, ctx, }) {
    return (_jsx(Client, { method: method.method, path: path, spec: ctx.schema.downloaded }));
}
