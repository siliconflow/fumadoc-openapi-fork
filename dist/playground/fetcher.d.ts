import type { RequestData } from '../requests/_shared.js';
import type { MediaAdapter } from '../media/adapter.js';
export interface FetchOptions extends RequestData {
    proxyUrl?: string;
}
export interface FetchResult {
    status: number;
    type: 'json' | 'html' | 'text';
    data: unknown;
}
export interface Fetcher {
    /**
     * This method will not apply the path & search parameters from `options` to given `url`.
     *
     * @param url - The full URL of request.
     */
    fetch: (url: string, options: FetchOptions) => Promise<FetchResult>;
}
export declare function createBrowserFetcher(adapters: Record<string, MediaAdapter>): Fetcher;
//# sourceMappingURL=fetcher.d.ts.map