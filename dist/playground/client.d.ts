import { type FC, type HTMLAttributes, type ReactElement } from 'react';
import type { ControllerFieldState, ControllerRenderProps, FieldPath, UseFormStateReturn } from 'react-hook-form';
import type { FetchResult } from '../playground/fetcher.js';
import type { ParameterField, RequestSchema, SecurityEntry } from '../playground/index.js';
interface FormValues {
    path: Record<string, string>;
    query: Record<string, string>;
    header: Record<string, string>;
    cookie: Record<string, string>;
    body: unknown;
}
export interface CustomField<TName extends FieldPath<FormValues>, Info> {
    render: (props: {
        /**
         * Field Info
         */
        info: Info;
        field: ControllerRenderProps<FormValues, TName>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<FormValues>;
    }) => ReactElement;
}
export interface ClientProps extends HTMLAttributes<HTMLFormElement> {
    route: string;
    method: string;
    parameters?: ParameterField[];
    securities: SecurityEntry[][];
    body?: {
        schema: RequestSchema;
        mediaType: string;
    };
    /**
     * Resolver for $ref schemas you've passed
     */
    references: Record<string, RequestSchema>;
    proxyUrl?: string;
    fields?: {
        parameter?: CustomField<`${ParameterField['in']}.${string}`, ParameterField>;
        auth?: CustomField<FieldPath<FormValues>, RequestSchema>;
        body?: CustomField<'body', RequestSchema>;
    };
    components?: Partial<{
        ResultDisplay: FC<{
            data: FetchResult;
        }>;
    }>;
}
export default function Client({ route, method, securities, parameters, body, fields, references, proxyUrl, components: { ResultDisplay }, ...rest }: ClientProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=client.d.ts.map