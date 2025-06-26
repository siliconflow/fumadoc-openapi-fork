import type { ComponentType, ReactNode } from 'react';
import type { RenderContext } from '../types.js';
import { type APIPlaygroundProps } from '../playground/index.js';
export interface ResponsesProps {
    items: string[];
    children: ReactNode;
}
export interface ResponseProps {
    value: string;
    children: ReactNode;
}
export interface APIInfoProps {
    method: string;
    route: string;
    head: ReactNode;
    children: ReactNode;
}
export interface PropertyProps {
    name: string;
    type: string;
    required?: boolean;
    deprecated?: boolean;
    children?: ReactNode;
    nested?: boolean;
}
export interface ObjectCollapsibleProps {
    name: string;
    children: ReactNode;
}
export interface RequestProps {
    name: string;
    children: ReactNode;
}
export interface SamplesProps {
    items: {
        title: string;
        description?: ReactNode;
        value: string;
    }[];
}
export interface ResponseTypeProps {
    label: string;
    children: ReactNode;
}
export interface RootProps {
    ctx: RenderContext;
    children: ReactNode;
}
export interface Renderer {
    Root: ComponentType<RootProps>;
    API: ComponentType<{
        children: ReactNode;
    }>;
    APIInfo: ComponentType<APIInfoProps>;
    APIExample: ComponentType<{
        children: ReactNode;
    }>;
    Responses: ComponentType<ResponsesProps>;
    Response: ComponentType<ResponseProps>;
    CodeExampleSelector: ComponentType<SamplesProps>;
    Requests: ComponentType<{
        items: string[];
        children: ReactNode;
    }>;
    Request: ComponentType<RequestProps>;
    ResponseTypes: ComponentType<{
        defaultValue?: string;
        children: ReactNode;
    }>;
    ResponseType: ComponentType<ResponseTypeProps>;
    /**
     * Collapsible to show object schemas
     */
    ObjectCollapsible: ComponentType<ObjectCollapsibleProps>;
    Property: ComponentType<PropertyProps>;
    APIPlayground: ComponentType<APIPlaygroundProps>;
}
export declare function createRenders(): Renderer;
//# sourceMappingURL=renderer.d.ts.map