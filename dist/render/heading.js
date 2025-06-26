import { jsx as _jsx } from "react/jsx-runtime";
import { Heading } from 'fumadocs-ui/components/heading';
export function heading(depth, text, ctx, children = text) {
    const id = ctx.slugger.slug(text);
    return (_jsx(Heading, { id: id, as: `h${depth.toString()}`, children: children }, id));
}
