export const methodKeys = [
    'get',
    'post',
    'patch',
    'delete',
    'head',
    'put',
];
export function getAPIPageItems(document) {
    const result = { webhooks: [], operations: [] };
    for (const [path, pathItem] of Object.entries(document.paths ?? {})) {
        if (!pathItem)
            continue;
        for (const methodKey of methodKeys) {
            if (!pathItem[methodKey])
                continue;
            result.operations.push({
                method: methodKey,
                path,
                tags: pathItem[methodKey]?.tags,
            });
        }
    }
    for (const [name, pathItem] of Object.entries(document.webhooks ?? {})) {
        if (!pathItem)
            continue;
        for (const methodKey of methodKeys) {
            if (!pathItem[methodKey])
                continue;
            result.webhooks.push({
                method: methodKey,
                name,
                tags: pathItem[methodKey]?.tags,
            });
        }
    }
    return result;
}
