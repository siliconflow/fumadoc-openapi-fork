import { type ComponentProps, type ReactNode } from 'react';
import { SelectTrigger } from '../ui/components/select.js';
export declare function SelectTabs({ defaultValue, children, }: {
    defaultValue?: string;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function SelectTab({ value, ...props }: ComponentProps<'div'> & {
    value: string;
}): import("react/jsx-runtime").JSX.Element | undefined;
export declare function SelectTabTrigger({ items, ...props }: ComponentProps<typeof SelectTrigger> & {
    items: string[];
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=select-tabs.d.ts.map