import type { NextRequest } from 'next/server';
declare const keys: readonly ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"];
type Proxy = {
    [K in (typeof keys)[number]]: (req: NextRequest) => Promise<Response>;
};
interface CreateProxyOptions {
    /**
     * Filter by prefixes of request url
     *
     * @deprecated Use `allowedOrigins` for filtering origins, or `filterRequest` for more detailed rules.
     */
    allowedUrls?: string[];
    /**
     * List of allowed origins to proxy to.
     */
    allowedOrigins?: string[];
    /**
     * Determine if the proxied request is allowed.
     *
     * @returns true if allowed, otherwise forbidden.
     */
    filterRequest?: (request: Request) => boolean;
    /**
     * Override proxied request/response with yours
     */
    overrides?: {
        request?: (request: Request) => Request;
        response?: (response: Response) => Response;
    };
}
export declare function createProxy(options?: CreateProxyOptions): Proxy;
export {};
//# sourceMappingURL=proxy.d.ts.map