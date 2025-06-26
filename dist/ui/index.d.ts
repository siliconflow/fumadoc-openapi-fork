import { type HTMLAttributes, type ReactNode } from 'react';
import type { PropertyProps, RootProps } from '../render/renderer.js';
export declare function Root({ children, className, ctx, ...props }: RootProps & HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
export declare function APIInfo({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
export declare function API({ children, ...props }: HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
export declare function Property({ name, type, required, deprecated, nested, ...props }: PropertyProps): import("react/jsx-runtime").JSX.Element;
export declare function APIExample(props: HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
export declare function ObjectCollapsible(props: {
    name: string;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export { APIPage, type ApiPageProps } from '../render/api-page.js';
//# sourceMappingURL=index.d.ts.map