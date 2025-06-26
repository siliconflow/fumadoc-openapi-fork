export function ident(code, tab = 1) {
    return code
        .split('\n')
        .map((v) => '  '.repeat(tab) + v)
        .join('\n');
}
