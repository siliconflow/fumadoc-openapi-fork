import type { DereferenceMap, Document } from '../types.js';
import type { NoReference } from '../utils/schema.js';
import type { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
export type DocumentInput = string | OpenAPIV3_1.Document | OpenAPIV3.Document;
export type ProcessedDocument = {
    document: NoReference<Document>;
    dereferenceMap: DereferenceMap;
    downloaded: Document;
};
/**
 * process & reference input document to a Fumadocs OpenAPI compatible format
 */
export declare function processDocument(input: DocumentInput, disableCache?: boolean): Promise<ProcessedDocument>;
//# sourceMappingURL=process-document.d.ts.map