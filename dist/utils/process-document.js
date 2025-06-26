import { dereference, load, upgrade } from '@scalar/openapi-parser';
import { fetchUrls } from '@scalar/openapi-parser/plugins/fetch-urls';
import { readFiles } from '@scalar/openapi-parser/plugins/read-files';
const cache = new Map();
/**
 * process & reference input document to a Fumadocs OpenAPI compatible format
 */
export async function processDocument(input, disableCache = false) {
    const cached = !disableCache && typeof input === 'string' ? cache.get(input) : null;
    if (cached)
        return cached;
    const dereferenceMap = new Map();
    const loaded = await load(input, {
        plugins: [readFiles(), fetchUrls()],
    });
    if (loaded.errors && loaded.errors.length > 0) {
        throw new Error(loaded.errors.map((err) => `${err.code}: ${err.message}`).join('\n'));
    }
    // upgrade
    loaded.specification = upgrade(loaded.specification).specification;
    const { schema: dereferenced } = await dereference(loaded.filesystem, {
        onDereference({ ref, schema }) {
            dereferenceMap.set(schema, ref);
        },
    });
    const processed = {
        document: dereferenced,
        dereferenceMap,
        downloaded: loaded.specification,
    };
    if (!disableCache && typeof input === 'string') {
        cache.set(input, processed);
    }
    return processed;
}
