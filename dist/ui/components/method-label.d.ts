import { type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
export declare const badgeVariants: (props?: ({
    color?: "green" | "yellow" | "red" | "blue" | "orange" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare function Badge({ className, color, ...props }: Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & VariantProps<typeof badgeVariants>): import("react/jsx-runtime").JSX.Element;
export declare function MethodLabel({ children, ...props }: Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    children: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=method-label.d.ts.map