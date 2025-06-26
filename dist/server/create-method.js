/**
 * Summarize method endpoint information
 */
export function createMethod(method, path, operation) {
    return {
        description: path.description,
        summary: path.summary,
        ...operation,
        parameters: [...(operation.parameters ?? []), ...(path.parameters ?? [])],
        method: method.toUpperCase(),
    };
}
