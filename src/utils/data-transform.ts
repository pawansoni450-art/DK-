/**
 * Data transformation utilities for converting and manipulating data structures.
 * All functions are designed to handle nested objects and arrays gracefully.
 */

import type { JSONValue, JSONObject } from '../types/common';

/**
 * Formats a Date object into a string using a specified format pattern.
 * Supports tokens: YYYY, YY, MM, DD, HH, mm, ss
 *
 * @param date - The Date object to format
 * @param format - Format string with tokens (e.g., 'YYYY-MM-DD HH:mm:ss')
 * @returns Formatted date string
 *
 * @example
 * ```typescript
 * const date = new Date('2026-08-31');
 * formatDate(date, 'YYYY-MM-DD');        // '2026-08-31'
 * formatDate(date, 'DD/MM/YYYY');        // '31/08/2026'
 * formatDate(date, 'YYYY-MM-DD HH:mm'); // '2026-08-31 02:14'
 * ```
 */
export function formatDate(date: Date, format: string): string {
  const pad = (n: number): string => String(n).padStart(2, '0');

  const tokens: Record<string, string> = {
    'YYYY': date.getFullYear().toString(),
    'YY': pad(date.getFullYear() % 100),
    'MM': pad(date.getMonth() + 1),
    'DD': pad(date.getDate()),
    'HH': pad(date.getHours()),
    'mm': pad(date.getMinutes()),
    'ss': pad(date.getSeconds())
  };

  // Replace format tokens with actual values
  // Using a regex to replace all token occurrences
  let result = format;
  for (const [token, value] of Object.entries(tokens)) {
    result = result.replace(new RegExp(token, 'g'), value);
  }

  return result;
}

/**
 * Merges multiple objects into a single object.
 * Performs deep merge for nested objects and arrays are concatenated.
 * Later objects override earlier ones for conflicting keys.
 *
 * @param objects - Variable number of objects to merge
 * @returns A new object containing merged properties
 *
 * @example
 * ```typescript
 * mergeObjects({ a: 1 }, { b: 2 }, { c: 3 });
 * // { a: 1, b: 2, c: 3 }
 *
 * mergeObjects(
 *   { user: { name: 'John' } },
 *   { user: { age: 30 } }
 * );
 * // { user: { name: 'John', age: 30 } }
 * ```
 */
export function mergeObjects(
  ...objects: JSONObject[]
): JSONObject {
  return objects.reduce((result, obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        key in result &&
        typeof result[key] === 'object' &&
        !Array.isArray(result[key])
      ) {
        // Recursively merge nested objects
        result[key] = mergeObjects(
          result[key] as JSONObject,
          value as JSONObject
        );
      } else {
        // Override with new value
        result[key] = value;
      }
    }
    return result;
  }, {});
}

/**
 * Flattens a nested object into a single-level object with dot-notation keys.
 *
 * @param obj - The object to flatten
 * @param prefix - Internal prefix for recursive calls (default: '')
 * @returns A flattened object with dot-notation keys
 *
 * @example
 * ```typescript
 * flattenObject({ user: { name: 'John', address: { city: 'NYC' } } });
 * // { 'user.name': 'John', 'user.address.city': 'NYC' }
 * ```
 */
export function flattenObject(
  obj: JSONObject,
  prefix: string = ''
): Record<string, JSONValue> {
  const result: Record<string, JSONValue> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {
      // Recursively flatten nested objects
      Object.assign(
        result,
        flattenObject(value as JSONObject, newKey)
      );
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

/**
 * Transforms an array of objects by selecting specific properties.
 * Useful for picking only needed fields from an array of records.
 *
 * @param items - Array of objects to transform
 * @param keys - Array of property keys to extract
 * @returns Array of objects containing only specified keys
 *
 * @example
 * ```typescript
 * const users = [
 *   { id: 1, name: 'John', email: 'john@example.com', password: 'secret' },
 *   { id: 2, name: 'Jane', email: 'jane@example.com', password: 'secret2' }
 * ];
 *
 * pickFields(users, ['id', 'name']);
 * // [
 * //   { id: 1, name: 'John' },
 * //   { id: 2, name: 'Jane' }
 * // ]
 * ```
 */
export function pickFields(
  items: JSONObject[],
  keys: string[]
): JSONObject[] {
  return items.map(item => {
    const result: JSONObject = {};
    for (const key of keys) {
      if (key in item) {
        result[key] = item[key];
      }
    }
    return result;
  });
}

/**
 * Groups an array of objects by a specified property value.
 * Returns an object where keys are grouped property values and values are arrays of items.
 *
 * @param items - Array of objects to group
 * @param key - Property key to group by
 * @returns Object with grouped items
 *
 * @example
 * ```typescript
 * const users = [
 *   { id: 1, role: 'admin', name: 'John' },
 *   { id: 2, role: 'user', name: 'Jane' },
 *   { id: 3, role: 'admin', name: 'Bob' }
 * ];
 *
 * groupBy(users, 'role');
 * // {
 * //   admin: [
 * //     { id: 1, role: 'admin', name: 'John' },
 * //     { id: 3, role: 'admin', name: 'Bob' }
 * //   ],
 * //   user: [{ id: 2, role: 'user', name: 'Jane' }]
 * // }
 * ```
 */
export function groupBy(
  items: JSONObject[],
  key: string
): Record<string, JSONObject[]> {
  return items.reduce((result, item) => {
    const groupKey = String(item[key] ?? 'undefined');
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, JSONObject[]>);
}
