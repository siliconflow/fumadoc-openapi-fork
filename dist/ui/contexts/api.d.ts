import { type ReactNode } from 'react';
import type { RenderContext, ServerObject } from '../../types.js';
import { type MediaAdapter } from '../../media/adapter.js';
export interface ApiProviderProps extends ApiContextType {
    /**
     * Base URL for API requests
     */
    defaultBaseUrl?: string;
    children?: ReactNode;
}
export interface SelectedServer {
    url: string;
    variables: Record<string, string>;
}
interface ApiContextType {
    servers: ServerObject[];
    shikiOptions: RenderContext['shikiOptions'];
    mediaAdapters: Record<string, MediaAdapter>;
}
interface ServerSelectType {
    server: SelectedServer | null;
    setServer: (value: string) => void;
    setServerVariables: (value: Record<string, string>) => void;
}
export declare function useApiContext(): ApiContextType;
export declare function useServerSelectContext(): ServerSelectType;
export declare function ApiProvider({ defaultBaseUrl, children, servers, mediaAdapters, shikiOptions, }: ApiProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=api.d.ts.map