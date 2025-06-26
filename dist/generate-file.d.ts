import { type GenerateOptions, type GeneratePageOutput, type GenerateTagOutput } from './generate.js';
import { type ProcessedDocument } from './utils/process-document.js';
interface GenerateFileOutput {
    /**
     * The original schema file path/url from `input`
     */
    pathOrUrl: string;
    content: string;
}
interface OperationConfig extends BaseConfig {
    /**
     * Generate a page for each API endpoint/operation (default).
     */
    per?: 'operation';
    /**
     * Group output using folders (Only works on `operation` mode)
     * - tag: `{tag}/{file}`
     * - route: `{endpoint}/{method}` (it will ignore the `name` option)
     * - none: `{file}` (default)
     *
     * @defaultValue 'none'
     */
    groupBy?: 'tag' | 'route' | 'none';
    /**
     * Specify name for output file
     */
    name?: ((output: GeneratePageOutput, document: ProcessedDocument['document']) => string) | BaseName;
}
interface TagConfig extends BaseConfig {
    /**
     * Generate a page for each tag.
     */
    per: 'tag';
    /**
     * Specify name for output file
     */
    name?: ((output: GenerateTagOutput, document: ProcessedDocument['document']) => string) | BaseName;
}
interface FileConfig extends BaseConfig {
    /**
     * Generate a page for each schema file.
     */
    per: 'file';
    /**
     * Specify name for output file
     */
    name?: ((output: GenerateFileOutput, document: ProcessedDocument['document']) => string) | BaseName;
}
export type Config = FileConfig | TagConfig | OperationConfig;
interface BaseName {
    /**
     * The version of algorithm used to generate file paths.
     *
     * v1: Fumadocs OpenAPI v8
     * v2: Fumadocs OpenAPI v9
     *
     * @defaultValue v2
     */
    algorithm?: 'v2' | 'v1';
}
interface BaseConfig extends GenerateOptions {
    /**
     * Schema files
     */
    input: string[] | string;
    /**
     * Output directory
     */
    output: string;
}
export declare function generateFiles(options: Config): Promise<void>;
export {};
//# sourceMappingURL=generate-file.d.ts.map