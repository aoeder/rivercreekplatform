type ClassNameValue = string | false | null | undefined;

/**
 * Joins class names, skipping empty and conditional (falsy) values so
 * components can compose optional styling without stray whitespace.
 */
export function classNames(...values: ClassNameValue[]): string {
  return values
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter((value) => value.length > 0)
    .join(" ");
}
