/**
 * Test suite for validation utilities.
 * Tests cover all validation functions with various input scenarios.
 */

import {
  validateEmail,
  validateUrl,
  validateString,
  validateNumber,
  validateHexColor,
  validateObject
} from '../../src/utils/validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should accept valid email addresses', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.user@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid.email')).toBe(false);
      expect(validateEmail('missing@domain')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('validateUrl', () => {
    it('should accept valid URLs', () => {
      expect(validateUrl('https://example.com')).toBe(true);
      expect(validateUrl('http://localhost:3000')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(validateUrl('not a url')).toBe(false);
      expect(validateUrl('example.com')).toBe(false);
    });
  });

  describe('validateString', () => {
    it('should accept non-empty strings', () => {
      expect(validateString('hello')).toBe(true);
      expect(validateString('a')).toBe(true);
    });

    it('should reject empty strings', () => {
      expect(validateString('')).toBe(false);
      expect(validateString('', 1)).toBe(false);
    });

    it('should respect minimum length', () => {
      expect(validateString('hi', 3)).toBe(false);
      expect(validateString('hello', 3)).toBe(true);
    });
  });

  describe('validateNumber', () => {
    it('should accept valid numbers', () => {
      expect(validateNumber(5)).toBe(true);
      expect(validateNumber(0)).toBe(true);
      expect(validateNumber(-10)).toBe(true);
    });

    it('should accept numbers within bounds', () => {
      expect(validateNumber(5, 0, 10)).toBe(true);
      expect(validateNumber(10, 0, 10)).toBe(true);
    });

    it('should reject numbers outside bounds', () => {
      expect(validateNumber(15, 0, 10)).toBe(false);
      expect(validateNumber(-5, 0, 10)).toBe(false);
    });

    it('should reject non-numbers', () => {
      expect(validateNumber('5' as any)).toBe(false);
      expect(validateNumber(NaN)).toBe(false);
    });
  });

  describe('validateHexColor', () => {
    it('should accept valid hex colors', () => {
      expect(validateHexColor('#FF5733')).toBe(true);
      expect(validateHexColor('#FFF')).toBe(true);
      expect(validateHexColor('#000')).toBe(true);
    });

    it('should reject invalid hex colors', () => {
      expect(validateHexColor('FF5733')).toBe(false);
      expect(validateHexColor('#GGGGGG')).toBe(false);
      expect(validateHexColor('#FF57')).toBe(false);
    });
  });

  describe('validateObject', () => {
    it('should validate object against schema', () => {
      const schema = {
        email: (val: unknown) => validateEmail(val as string),
        age: (val: unknown) => validateNumber(val as number, 0, 150)
      };

      const validObj = { email: 'user@example.com', age: 25 };
      const result = validateObject(validObj, schema);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should report validation errors', () => {
      const schema = {
        email: (val: unknown) => validateEmail(val as string)
      };

      const invalidObj = { email: 'not-an-email' };
      const result = validateObject(invalidObj, schema);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
