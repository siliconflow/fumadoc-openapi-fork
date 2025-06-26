import type { ApiPageProps } from '../render/api-page.js';
import { createProxy } from '../server/proxy.js';
export type OpenAPIOptions = Omit<Partial<ApiPageProps>, 'document'>;
export interface OpenAPIServer {
    getAPIPageProps: (from: ApiPageProps) => ApiPageProps;
    createProxy: typeof createProxy;
}
export declare function createOpenAPI(options?: OpenAPIOptions): OpenAPIServer;
//# sourceMappingURL=create.d.ts.map