import { Ajv2020 } from 'ajv/dist/2020';
import type { RequestSchema } from '../playground/index.js';
import { ReactNode } from 'react';
interface SchemaContextType {
    references: Record<string, RequestSchema>;
    fieldInfoMap: Map<string, FieldInfo>;
    ajv: Ajv2020;
}
export interface FieldInfo {
    selectedType?: string;
    oneOf: number;
}
export declare const anyFields: {
    type: string[];
    items: true;
    additionalProperties: true;
};
export declare function SchemaProvider({ references, fieldInfoMap, children, }: Omit<SchemaContextType, 'ajv'> & {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
/**
 * A hook to store dynamic info of a field, such as selected schema of `oneOf`.
 *
 * @param fieldName - field name of form.
 * @param schema - The JSON Schema to generate initial values.
 * @param depth - The depth to avoid duplicated field name with same schema (e.g. nested `oneOf`).
 */
export declare function useFieldInfo(fieldName: string, schema: Exclude<RequestSchema, boolean>, depth: number): {
    info: FieldInfo;
    updateInfo: (value: Partial<FieldInfo>) => void;
};
/**
 * Resolve `$ref` in the schema, **not recursive**.
 */
export declare function useResolvedSchema(schema: RequestSchema): Exclude<RequestSchema, boolean>;
export declare function fallbackAny(schema: RequestSchema): Exclude<RequestSchema, boolean>;
export {};
//# sourceMappingURL=schema.d.ts.map