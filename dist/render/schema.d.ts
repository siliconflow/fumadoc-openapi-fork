import { type ReactNode } from 'react';
import type { ResolvedSchema } from '../utils/schema.js';
import type { RenderContext } from '../types.js';
export declare function Schema({ name, schema, required, readOnly, writeOnly, as, ctx: { renderer }, }: {
    name: string;
    required?: boolean;
    schema: ResolvedSchema;
    as?: 'property' | 'body';
    readOnly?: boolean;
    writeOnly?: boolean;
    ctx: RenderContext;
}): ReactNode;
//# sourceMappingURL=schema.d.ts.map