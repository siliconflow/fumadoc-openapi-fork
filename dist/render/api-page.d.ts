import type { RenderContext } from '../types.js';
import { type Renderer } from '../render/renderer.js';
import type { OpenAPIV3_1 } from 'openapi-types';
import { type DocumentInput, type ProcessedDocument } from '../utils/process-document.js';
type ApiPageContextProps = Pick<Partial<RenderContext>, 'shikiOptions' | 'generateTypeScriptSchema' | 'generateCodeSamples' | 'proxyUrl' | 'showResponseSchema' | 'disablePlayground' | 'mediaAdapters'>;
export interface ApiPageProps extends ApiPageContextProps {
    document: DocumentInput;
    hasHead: boolean;
    renderer?: Partial<Renderer>;
    /**
     * An array of operations
     */
    operations?: OperationItem[];
    webhooks?: WebhookItem[];
    /**
     * By default, it is disabled on dev mode
     */
    disableCache?: boolean;
}
export interface WebhookItem {
    name: string;
    method: OpenAPIV3_1.HttpMethods;
}
export interface OperationItem {
    path: string;
    method: OpenAPIV3_1.HttpMethods;
}
export declare function APIPage(props: ApiPageProps): Promise<import("react/jsx-runtime").JSX.Element>;
export declare function getContext(schema: ProcessedDocument, options?: ApiPageContextProps & {
    renderer?: Partial<Renderer>;
}): Promise<RenderContext>;
export {};
//# sourceMappingURL=api-page.d.ts.map