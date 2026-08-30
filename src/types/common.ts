/**
 * Common type definitions used throughout the DK- toolkit.
 * These types ensure type safety across all modules.
 */

/**
 * Represents a date format pattern.
 * Supports standard date format tokens like YYYY, MM, DD, etc.
 */
export type DateFormat = string;

/**
 * Represents any JSON-serializable value.
 * Used for flexible data handling in transformation functions.
 */
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

/**
 * Represents a JSON object structure.
 */
export interface JSONObject {
  [key: string]: JSONValue;
}

/**
 * Represents a JSON array structure.
 */
export type JSONArray = JSONValue[];

/**
 * Result type for operations that may fail.
 * Used to indicate success or failure with optional error information.
 */
export type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

/**
 * Represents validation result with optional error message.
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
