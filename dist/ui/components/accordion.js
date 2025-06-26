'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Primitive from '@radix-ui/react-accordion';
import { ChevronRight } from '../../icons.js';
import { cn } from 'fumadocs-ui/utils/cn';
export function Accordions(props) {
    return (_jsx(Primitive.Root, { ...props, className: cn('divide-y divide-fd-border overflow-hidden', props.className) }));
}
export function AccordionItem(props) {
    return (_jsx(Primitive.Item, { ...props, className: cn('scroll-m-20', props.className), children: props.children }));
}
export function AccordionContent(props) {
    return (_jsx(Primitive.Content, { ...props, className: cn('overflow-hidden px-1 data-[state=closed]:animate-fd-accordion-up data-[state=open]:animate-fd-accordion-down', props.className), children: props.children }));
}
export function AccordionHeader(props) {
    return (_jsx(Primitive.Header, { ...props, className: cn('not-prose flex py-2 text-fd-foreground font-medium', props.className), children: props.children }));
}
export function AccordionTrigger(props) {
    return (_jsxs(Primitive.Trigger, { ...props, className: cn('flex flex-1 items-center gap-1 text-start group/accordion focus-visible:outline-none', props.className), children: [_jsx(ChevronRight, { className: "size-3.5 text-fd-muted-foreground shrink-0 transition-transform group-data-[state=open]/accordion:rotate-90" }), props.children] }));
}
