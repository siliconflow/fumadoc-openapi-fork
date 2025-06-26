import type { MethodInformation, RenderContext, SecuritySchemeObject } from '../types.js';
import { type ParsedSchema } from '../utils/schema.js';
import { type ClientProps } from './client.js';
export type ParameterField = {
    name: string;
    description?: string;
    schema: ParsedSchema;
    in: 'cookie' | 'header' | 'query' | 'path';
};
export type RequestSchema = ParsedSchema;
export interface APIPlaygroundProps {
    path: string;
    method: MethodInformation;
    ctx: RenderContext;
    client?: Partial<ClientProps>;
}
export type { ClientProps, CustomField } from './client.js';
export type SecurityEntry = SecuritySchemeObject & {
    scopes: string[];
    id: string;
};
export declare function APIPlayground({ path, method, ctx, client, }: APIPlaygroundProps): Promise<import("react/jsx-runtime").JSX.Element>;
//# sourceMappingURL=index.d.ts.map