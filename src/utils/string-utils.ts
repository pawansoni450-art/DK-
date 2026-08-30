/**
 * String manipulation and transformation utilities.
 * Provides common string operations with clear, documented behavior.
 */

/**
 * Converts a string to camelCase.
 * Handles various input formats including snake_case, kebab-case, and space-separated strings.
 *
 * @param str - The string to convert
 * @returns The camelCase version of the string
 *
 * @example
 * ```typescript
 * toCamelCase('hello-world');      // 'helloWorld'
 * toCamelCase('hello_world');      // 'helloWorld'
 * toCamelCase('hello world');      // 'helloWorld'
 * toCamelCase('HelloWorld');       // 'helloWorld'
 * ```
 */
export function toCamelCase(str: string): string {
  // Replace various separators with spaces, then process
  return str
    .replace(/[-_\s]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toLowerCase());
}

/**
 * Converts a string to kebab-case (hyphen-separated lowercase).
 * Handles camelCase and snake_case inputs.
 *
 * @param str - The string to convert
 * @returns The kebab-case version of the string
 *
 * @example
 * ```typescript
 * toKebabCase('helloWorld');       // 'hello-world'
 * toKebabCase('HelloWorld');       // 'hello-world'
 * toKebabCase('hello_world');      // 'hello-world'
 * ```
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
}

/**
 * Converts a string to snake_case (underscore-separated lowercase).
 * Handles camelCase and kebab-case inputs.
 *
 * @param str - The string to convert
 * @returns The snake_case version of the string
 *
 * @example
 * ```typescript
 * toSnakeCase('helloWorld');       // 'hello_world'
 * toSnakeCase('hello-world');      // 'hello_world'
 * toSnakeCase('HelloWorld');       // 'hello_world'
 * ```
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/-/g, '_')
    .toLowerCase();
}

/**
 * Capitalizes the first character of a string.
 *
 * @param str - The string to capitalize
 * @returns String with first character capitalized
 *
 * @example
 * ```typescript
 * capitalize('hello');             // 'Hello'
 * capitalize('hello world');       // 'Hello world'
 * ```
 */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncates a string to a maximum length and appends an ellipsis if truncated.
 *
 * @param str - The string to truncate
 * @param maxLength - Maximum length of the result (including ellipsis)
 * @param ellipsis - String to append when truncated (default: '...')
 * @returns Truncated string with ellipsis if needed
 *
 * @example
 * ```typescript
 * truncate('Hello World', 8);       // 'Hello...'
 * truncate('Hello', 10);            // 'Hello'
 * truncate('Hello World', 8, '→');  // 'Hello W→'
 * ```
 */
export function truncate(
  str: string,
  maxLength: number,
  ellipsis: string = '...'
): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Repeats a string a specified number of times.
 *
 * @param str - The string to repeat
 * @param count - Number of times to repeat (default: 1)
 * @returns The repeated string
 *
 * @example
 * ```typescript
 * repeat('ab', 3);                  // 'ababab'
 * repeat('x', 5);                   // 'xxxxx'
 * ```
 */
export function repeat(str: string, count: number = 1): string {
  return str.repeat(Math.max(0, count));
}

/**
 * Removes leading and trailing whitespace from a string.
 * Similar to built-in trim() but more explicit and documented.
 *
 * @param str - The string to trim
 * @returns Trimmed string
 */
export function trim(str: string): string {
  return str.trim();
}

/**
 * Removes all whitespace from a string (leading, trailing, and internal).
 *
 * @param str - The string to clean
 * @returns String with all whitespace removed
 *
 * @example
 * ```typescript
 * removeWhitespace('  hello  world  ');  // 'helloworld'
 * removeWhitespace('h e l l o');        // 'hello'
 * ```
 */
export function removeWhitespace(str: string): string {
  return str.replace(/\s+/g, '');
}

/**
 * Counts the number of occurrences of a substring in a string.
 *
 * @param str - The string to search in
 * @param search - The substring to count
 * @param caseSensitive - Whether to perform case-sensitive search (default: true)
 * @returns Number of occurrences found
 *
 * @example
 * ```typescript
 * countOccurrences('hello hello world', 'hello');      // 2
 * countOccurrences('Hello hello world', 'hello', false); // 2
 * ```
 */
export function countOccurrences(
  str: string,
  search: string,
  caseSensitive: boolean = true
): number {
  if (search.length === 0) return 0;

  const compareStr = caseSensitive ? str : str.toLowerCase();
  const compareSearch = caseSensitive ? search : search.toLowerCase();

  let count = 0;
  let index = 0;

  while ((index = compareStr.indexOf(compareSearch, index)) !== -1) {
    count++;
    index += compareSearch.length;
  }

  return count;
}

/**
 * Replaces all occurrences of a substring with another string.
 * Simpler alternative to using regex for string replacement.
 *
 * @param str - The string to process
 * @param search - The substring to find
 * @param replacement - The replacement string
 * @returns String with all occurrences replaced
 *
 * @example
 * ```typescript
 * replaceAll('hello hello', 'hello', 'hi');  // 'hi hi'
 * replaceAll('a-b-c-d', '-', '/');           // 'a/b/c/d'
 * ```
 */
export function replaceAll(
  str: string,
  search: string,
  replacement: string
): string {
  return str.split(search).join(replacement);
}
