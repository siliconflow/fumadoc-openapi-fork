import { jsx as _jsx } from "react/jsx-runtime";
import { Ajv2020 } from 'ajv/dist/2020';
import { createContext, useContext, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useEffectEvent } from 'fumadocs-core/utils/use-effect-event';
import { getDefaultValue } from '../playground/get-default-values.js';
const SchemaContext = createContext(undefined);
export const anyFields = {
    type: ['string', 'number', 'boolean', 'array', 'object'],
    items: true,
    additionalProperties: true,
};
export function SchemaProvider({ references, fieldInfoMap, children, }) {
    const ajv = useMemo(() => new Ajv2020({
        strict: false,
        validateSchema: false,
        validateFormats: false,
        schemas: references,
    }), [references]);
    return (_jsx(SchemaContext.Provider, { value: useMemo(() => ({ references, fieldInfoMap, ajv }), [fieldInfoMap, references, ajv]), children: children }));
}
/**
 * A hook to store dynamic info of a field, such as selected schema of `oneOf`.
 *
 * @param fieldName - field name of form.
 * @param schema - The JSON Schema to generate initial values.
 * @param depth - The depth to avoid duplicated field name with same schema (e.g. nested `oneOf`).
 */
export function useFieldInfo(fieldName, schema, depth) {
    const { fieldInfoMap, ajv } = useContext(SchemaContext);
    const [_, trigger] = useState(0);
    const form = useFormContext();
    const keyName = `${fieldName}:${depth}`;
    const value = form.getValues(fieldName);
    const info = fieldInfoMap.get(keyName) ?? {
        oneOf: -1,
    };
    // update info if needed
    if (!info.selectedType && Array.isArray(schema.type)) {
        info.selectedType =
            schema.type.find((type) => ajv.validate({
                ...schema,
                type,
            }, value)) ?? schema.type[0];
    }
    if (info.oneOf === -1 && schema.oneOf) {
        info.oneOf = schema.oneOf.findIndex((item) => {
            return ajv.validate(item, value);
        });
        if (info.oneOf === -1)
            info.oneOf = 0;
    }
    fieldInfoMap.set(keyName, info);
    return {
        info,
        updateInfo: useEffectEvent((value) => {
            const prev = fieldInfoMap.get(keyName);
            if (!prev)
                return;
            const updated = {
                ...prev,
                ...value,
            };
            if (updated.oneOf === prev.oneOf &&
                updated.selectedType === prev.selectedType)
                return;
            fieldInfoMap.set(keyName, updated);
            form.setValue(fieldName, getDefaultValue(schema.oneOf && updated.oneOf !== -1
                ? schema.oneOf[updated.oneOf]
                : {
                    ...schema,
                    type: value.selectedType ?? schema.type,
                }));
            trigger((prev) => prev + 1);
        }),
    };
}
/**
 * Resolve `$ref` in the schema, **not recursive**.
 */
export function useResolvedSchema(schema) {
    const { references } = useContext(SchemaContext);
    return useMemo(() => {
        if (typeof schema === 'boolean')
            return anyFields;
        if (schema.$ref)
            return fallbackAny(references[schema.$ref]);
        return schema;
    }, [references, schema]);
}
export function fallbackAny(schema) {
    return typeof schema === 'boolean' ? anyFields : schema;
}
