/**
 * Main export file for all utility functions.
 * Aggregates and re-exports utilities from all submodules.
 */

// Export validation utilities
export {
  validateEmail,
  validateUrl,
  validateString,
  validateNumber,
  validateHexColor,
  validateObject
} from './validation';

// Export data transformation utilities
export {
  formatDate,
  mergeObjects,
  flattenObject,
  pickFields,
  groupBy
} from './data-transform';

// Export string manipulation utilities
export {
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  capitalize,
  truncate,
  repeat,
  trim,
  removeWhitespace,
  countOccurrences,
  replaceAll
} from './string-utils';

// Re-export types for convenience
export type { ValidationResult } from '../types/common';
export type {
  DateFormat,
  JSONValue,
  JSONObject,
  JSONArray,
  Result
} from '../types/common';
