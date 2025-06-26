import { type Document } from './types.js';
import type { NoReference } from './utils/schema.js';
import type { OperationItem, WebhookItem } from './render/api-page.js';
export declare const methodKeys: readonly ["get", "post", "patch", "delete", "head", "put"];
type Result = {
    webhooks: (WebhookItem & {
        tags?: string[];
    })[];
    operations: (OperationItem & {
        tags?: string[];
    })[];
};
export declare function getAPIPageItems(document: NoReference<Document>): Result;
export {};
//# sourceMappingURL=build-routes.d.ts.map