import type { RequestData } from '../requests/_shared.js';
interface BaseContext {
    /**
     * Passed by your custom example generator, for your custom media adapter to receive.
     */
    customData?: Record<string, unknown>;
}
interface GoContext extends BaseContext {
    lang: 'go';
    addImport: (name: string) => void;
}
interface JavaScriptContext extends BaseContext {
    lang: 'js';
    addImport: (pkg: string, name: string) => void;
}
interface JavaContext extends BaseContext {
    lang: 'java';
    addImport: (specifier: string) => void;
}
interface CSharpContext extends BaseContext {
    lang: 'csharp';
    addImport: (specifier: string) => void;
}
export type MediaContext = JavaContext | GoContext | JavaScriptContext | CSharpContext | (BaseContext & {
    lang: string;
});
export interface MediaAdapter {
    /**
     * encode request data into body for `fetch()`.
     *
     * Return the encoded form of `data.body` property.
     */
    encode: (data: RequestData) => BodyInit | Promise<BodyInit>;
    /**
     * generate code for usage examples in a given programming language.
     *
     * @param data - request data.
     * @param lang - name of programming language.
     * @param ctx - context passed from the generator of programming language.
     *
     * @returns code that inits a `body` variable, or undefined if not supported (skip example for that language).
     */
    generateExample: (data: RequestData, ctx: MediaContext) => string | undefined;
}
export declare const defaultAdapters: {
    'application/json': {
        encode(data: RequestData): string;
        generateExample(data: RequestData, ctx: MediaContext): string | undefined;
    };
    'application/xml': {
        encode(data: RequestData): Promise<any>;
        generateExample(data: RequestData, ctx: MediaContext): string | undefined;
    };
    'application/x-ndjson': {
        encode(data: RequestData): string;
        generateExample(data: RequestData, ctx: MediaContext): string | undefined;
    };
    'application/x-www-form-urlencoded': {
        encode(data: RequestData): URLSearchParams;
        generateExample(data: RequestData, ctx: MediaContext): string | undefined;
    };
    'multipart/form-data': {
        encode(data: RequestData): FormData;
        generateExample(data: RequestData, ctx: MediaContext): string | undefined;
    };
    'application/octet-stream': {
        encode(data: RequestData): BodyInit;
        generateExample(): undefined;
    };
};
export {};
//# sourceMappingURL=adapter.d.ts.map