import type { MediaAdapter } from '../media/adapter.js';
export type SampleGenerator = (url: string, data: RequestData, context: {
    mediaAdapters: Record<string, MediaAdapter>;
}) => string;
export interface RequestData {
    method: string;
    path: Record<string, string>;
    query: Record<string, string>;
    header: Record<string, string>;
    cookie: Record<string, string>;
    body?: unknown;
    bodyMediaType?: string;
}
export declare function ident(code: string, tab?: number): string;
//# sourceMappingURL=_shared.d.ts.map