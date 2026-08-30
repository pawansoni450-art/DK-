/**
 * Input validation utilities for common data types and formats.
 * All functions return boolean or ValidationResult for error reporting.
 */

import type { ValidationResult } from '../types/common';

/**
 * Validates if a string is a valid email address.
 *
 * @param email - The email string to validate
 * @returns true if the email format is valid, false otherwise
 *
 * @example
 * ```typescript
 * validateEmail('user@example.com');  // true
 * validateEmail('invalid.email');     // false
 * ```
 */
export function validateEmail(email: string): boolean {
  // RFC 5322 simplified regex pattern for email validation
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates if a string is a valid URL.
 *
 * @param url - The URL string to validate
 * @returns true if the URL format is valid, false otherwise
 *
 * @example
 * ```typescript
 * validateUrl('https://example.com');  // true
 * validateUrl('not a url');            // false
 * ```
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates if a value is a non-empty string.
 *
 * @param value - The value to validate
 * @param minLength - Optional minimum string length (default: 1)
 * @returns true if value is a non-empty string, false otherwise
 */
export function validateString(
  value: unknown,
  minLength: number = 1
): boolean {
  return (
    typeof value === 'string' &&
    value.length >= minLength
  );
}

/**
 * Validates if a value is a number within optional bounds.
 *
 * @param value - The value to validate
 * @param min - Optional minimum value (inclusive)
 * @param max - Optional maximum value (inclusive)
 * @returns true if value is a valid number within bounds, false otherwise
 *
 * @example
 * ```typescript
 * validateNumber(5, 0, 10);    // true
 * validateNumber(15, 0, 10);   // false
 * validateNumber(5.5);         // true
 * ```
 */
export function validateNumber(
  value: unknown,
  min?: number,
  max?: number
): boolean {
  if (typeof value !== 'number' || isNaN(value)) {
    return false;
  }

  if (min !== undefined && value < min) {
    return false;
  }

  if (max !== undefined && value > max) {
    return false;
  }

  return true;
}

/**
 * Validates if a string is a valid hexadecimal color code.
 * Supports both 3-digit (#RGB) and 6-digit (#RRGGBB) formats.
 *
 * @param color - The color string to validate
 * @returns true if the color is a valid hex color, false otherwise
 *
 * @example
 * ```typescript
 * validateHexColor('#FF5733');  // true
 * validateHexColor('#F57');     // true
 * validateHexColor('FF5733');   // false (missing #)
 * ```
 */
export function validateHexColor(color: string): boolean {
  // Match #RGB or #RRGGBB hex color format
  const hexColorRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;
  return hexColorRegex.test(color);
}

/**
 * Performs comprehensive validation on an object against a schema.
 * Returns detailed validation results with error messages.
 *
 * @param obj - The object to validate
 * @param schema - Schema object mapping keys to validation functions
 * @returns ValidationResult with isValid flag and array of errors
 *
 * @example
 * ```typescript
 * const schema = {
 *   email: (val) => validateEmail(val),
 *   age: (val) => validateNumber(val, 0, 120)
 * };
 * const result = validateObject({ email: 'a@b.com', age: 25 }, schema);
 * ```
 */
export function validateObject(
  obj: Record<string, unknown>,
  schema: Record<string, (val: unknown) => boolean>
): ValidationResult {
  const errors: string[] = [];

  for (const [key, validator] of Object.entries(schema)) {
    if (!(key in obj)) {
      errors.push(`Missing required field: ${key}`);
      continue;
    }

    if (!validator(obj[key])) {
      errors.push(`Invalid value for field: ${key}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
