import { compile } from '@fumari/json-schema-to-typescript';
export async function getTypescriptSchema(schema, dereferenceMap) {
    const cloned = structuredClone({ schema, dereferenceMap });
    return compile(cloned.schema, 'Response', {
        $refOptions: false,
        schemaToId: cloned.dereferenceMap,
        bannerComment: '',
        additionalProperties: false,
        enableConstEnums: false,
    });
}
