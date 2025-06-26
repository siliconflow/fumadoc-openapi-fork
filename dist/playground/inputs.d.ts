import { type ComponentProps, type HTMLAttributes, type ReactNode } from 'react';
import type { RequestSchema } from '../playground/index.js';
export declare function ObjectInput({ field: _field, fieldName, ...props }: {
    field: Exclude<RequestSchema, boolean>;
    fieldName: string;
} & ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element | undefined;
export declare function JsonInput({ fieldName }: {
    fieldName: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function FieldInput({ field, fieldName, isRequired, ...props }: HTMLAttributes<HTMLElement> & {
    field: Exclude<RequestSchema, boolean>;
    isRequired?: boolean;
    fieldName: string;
}): import("react/jsx-runtime").JSX.Element | undefined;
export declare function FieldSet({ field: _field, fieldName, toolbar, name, isRequired, depth, slotType, collapsible, ...props }: HTMLAttributes<HTMLElement> & {
    isRequired?: boolean;
    name?: ReactNode;
    field: RequestSchema;
    fieldName: string;
    depth?: number;
    slotType?: ReactNode;
    toolbar?: ReactNode;
    collapsible?: boolean;
}): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=inputs.d.ts.map