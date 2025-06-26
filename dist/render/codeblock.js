import { jsx as _jsx } from "react/jsx-runtime";
import * as Base from 'fumadocs-ui/components/codeblock';
import { highlight } from 'fumadocs-core/highlight';
import { cn } from 'fumadocs-ui/utils/cn';
export async function CodeBlock({ code, lang, ctx, ...rest }) {
    const rendered = await highlight(code, {
        lang,
        ...ctx.shikiOptions,
        components: {
            pre: (props) => _jsx(Base.Pre, { ...props }),
        },
    });
    return (_jsx(Base.CodeBlock, { className: cn('my-0', rest.className), children: rendered }));
}
