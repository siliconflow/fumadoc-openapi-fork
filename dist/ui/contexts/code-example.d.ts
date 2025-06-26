import { type ReactNode } from 'react';
import type { CodeSample } from '../../render/operation/index.js';
import type { SamplesProps } from '../../render/renderer.js';
import type { RequestData } from '../../requests/_shared.js';
export declare function CodeExampleProvider({ route, examples, initialKey, children, }: {
    route: string;
    examples: {
        key: string;
        data: RequestData;
    }[];
    initialKey?: string;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function CodeExample(props: CodeSample): import("react/jsx-runtime").JSX.Element | null;
export declare function CodeExampleSelector({ items }: SamplesProps): import("react/jsx-runtime").JSX.Element;
export declare function useRequestInitialData(): RequestData;
export declare function useRequestDataUpdater(): {
    setData: (data: RequestData) => void;
};
//# sourceMappingURL=code-example.d.ts.map