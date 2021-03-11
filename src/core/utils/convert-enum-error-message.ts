export function convertEnumErrorMessage(
    name: string,
    enumaratedObject: Record<string, unknown>,
): string {
    return `${name} must be one of: [${Object.keys(enumaratedObject).join(
        ", ",
    )}]`;
}
