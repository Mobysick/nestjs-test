export function secureCompare(a: string, b: string) {
    let mismatch = a.length === b.length ? 0 : 1;

    if (mismatch) {
        b = a;
    }

    for (let i = 0; i < a.length; ++i) {
        mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return mismatch === 0;
}
