import { type HTMLAttributes } from 'react';
import type { RenderContext } from '../types.js';
export interface CodeBlockProps extends HTMLAttributes<HTMLElement> {
    code: string;
    lang: string;
    ctx: RenderContext;
}
export declare function CodeBlock({ code, lang, ctx, ...rest }: CodeBlockProps): Promise<import("react/jsx-runtime").JSX.Element>;
//# sourceMappingURL=codeblock.d.ts.map