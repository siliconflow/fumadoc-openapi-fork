import { type ReactElement } from 'react';
import type { MethodInformation, RenderContext } from '../../types.js';
import { type SampleGenerator } from '../../requests/_shared.js';
export interface CodeSample {
    lang: string;
    label?: string;
    source?: string | SampleGenerator | false;
}
export declare function Operation({ type, path, method, ctx, hasHead, headingLevel, }: {
    type?: 'webhook' | 'operation';
    path: string;
    method: MethodInformation;
    ctx: RenderContext;
    hasHead?: boolean;
    headingLevel?: number;
}): ReactElement;
//# sourceMappingURL=index.d.ts.map