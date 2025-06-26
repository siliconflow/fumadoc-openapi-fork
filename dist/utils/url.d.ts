import type { RequestData } from '../requests/_shared.js';
export declare function joinURL(base: string, pathname: string): string;
/**
 * @param url - URL (can be relative)
 * @param base - the base URL (must be absolute)
 */
export declare function withBase(url: string, base: string): string;
export declare function resolveServerUrl(template: string, variables: Record<string, string>): string;
export declare function resolveRequestData(pathname: string, { path, query }: RequestData): string;
//# sourceMappingURL=url.d.ts.map