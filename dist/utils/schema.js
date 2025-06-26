export function getPreferredType(body) {
    if ('application/json' in body)
        return 'application/json';
    return Object.keys(body)[0];
}
