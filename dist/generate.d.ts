import { type DocumentContext } from './utils/generate-document.js';
import type { OperationItem, WebhookItem } from './render/api-page.js';
import type { DocumentInput, ProcessedDocument } from './utils/process-document.js';
export interface GenerateOptions {
    /**
     * Additional imports of your MDX components.
     */
    imports?: {
        names: string[];
        from: string;
    }[];
    /**
     * Customise frontmatter.
     *
     * A `full: true` property will be added by default.
     */
    frontmatter?: (title: string, description: string | undefined, context: DocumentContext) => Record<string, unknown>;
    /**
     * Add description to document body.
     *
     * We recommend but don't enable it by default because some OpenAPI schemas have invalid description that breaks MDX syntax.
     *
     * @defaultValue false
     */
    includeDescription?: boolean;
    /**
     * Add a comment to the top of generated files indicating they are auto-generated.
     * - `true`: Adds a standardized comment
     * - `false`: No comment is added
     * - `string`: Adds the provided custom comment
     *
     * @defaultValue true
     */
    addGeneratedComment?: boolean | string;
    cwd?: string;
    /**
     * Inline the entire OpenAPI document into the MDX file.
     *
     * @defaultValue false
     */
    inlineDocument?: boolean;
}
export interface GenerateTagOutput {
    tag: string;
    content: string;
}
export type GeneratePageOutput = {
    type: 'operation';
    item: OperationItem;
    content: string;
} | {
    type: 'webhook';
    item: WebhookItem;
    content: string;
};
export declare function generateAll(input: DocumentInput, processed: ProcessedDocument, options?: GenerateOptions): Promise<string>;
export declare function generatePages(input: DocumentInput, processed: ProcessedDocument, options?: GenerateOptions): Promise<GeneratePageOutput[]>;
export declare function generateTags(input: DocumentInput, processed: ProcessedDocument, options?: GenerateOptions): Promise<GenerateTagOutput[]>;
//# sourceMappingURL=generate.d.ts.map