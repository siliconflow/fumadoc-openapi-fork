import type { MethodInformation, RenderContext } from '../../types.js';
import { type ReactNode } from 'react';
import { type CodeSample } from '../../render/operation/index.js';
import type { RequestData } from '../../requests/_shared.js';
interface CustomProperty {
    'x-codeSamples'?: CodeSample[];
    'x-selectedCodeSample'?: string;
    'x-exclusiveCodeSample'?: string;
}
interface CodeExampleItem {
    key: string;
    name: string;
    description?: string;
    data: RequestData;
}
export declare function APIExampleProvider({ examples, method, children, route, }: {
    examples: CodeExampleItem[];
    method: MethodInformation & CustomProperty;
    route: string;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function getAPIExamples(path: string, method: MethodInformation, ctx: RenderContext): CodeExampleItem[];
export declare function APIExample({ method, examples, ctx, }: {
    examples: CodeExampleItem[];
    method: MethodInformation & CustomProperty;
    ctx: RenderContext;
}): Promise<import("react/jsx-runtime").JSX.Element>;
export {};
//# sourceMappingURL=api-example.d.ts.map