import { type JSONSchema } from 'json-schema-typed/draft-2020-12';
import { ReferenceObject } from '../types.js';
export type NoReference<T> = T extends (infer I)[] ? NoReference<I>[] : T extends ReferenceObject ? Exclude<T, ReferenceObject> : T extends object ? {
    [K in keyof T]: NoReference<T[K]>;
} : T;
type NoReferenceJSONSchema<T> = T extends (infer I)[] ? NoReference<I>[] : T extends {
    $ref?: string;
} ? Omit<T, '$ref'> : T;
export type ParsedSchema = JSONSchema;
export type ResolvedSchema = NoReferenceJSONSchema<ParsedSchema>;
export declare function getPreferredType<B extends Record<string, unknown>>(body: B): keyof B | undefined;
export {};
//# sourceMappingURL=schema.d.ts.map