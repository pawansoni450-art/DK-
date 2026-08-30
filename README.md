# DK- Project

A comprehensive toolkit for data transformation and utility functions with full TypeScript support.

## Features

- 📦 **Data Transformation**: Convert and transform data structures efficiently
- 🔧 **Utility Functions**: Common utility functions for everyday development tasks
- 📝 **Type-Safe**: Built with TypeScript for type safety and better developer experience
- 📚 **Well-Documented**: Comprehensive JSDoc comments and inline documentation
- ✅ **Tested**: Unit test coverage for all exported functions

## Installation

```bash
npm install
```

## Quick Start

```typescript
import { formatDate, mergeObjects, validateEmail } from './src/utils';

// Format a date
const formatted = formatDate(new Date(), 'YYYY-MM-DD');
console.log(formatted); // 2026-08-31

// Merge objects deeply
const merged = mergeObjects({ a: 1 }, { b: 2 });
console.log(merged); // { a: 1, b: 2 }

// Validate email
const isValid = validateEmail('user@example.com');
console.log(isValid); // true
```

## Project Structure

```
src/
├── utils/
│   ├── data-transform.ts   # Data transformation utilities
│   ├── validation.ts       # Input validation functions
│   ├── string-utils.ts     # String manipulation utilities
│   └── index.ts            # Main export file
├── types/
│   └── common.ts           # Shared TypeScript types
└── index.ts                # Package entry point
```

## Documentation

All exported functions include:
- **JSDoc comments** with parameter and return type descriptions
- **Inline comments** explaining complex logic
- **Usage examples** in comments

### API Reference

See the source files in `src/` for complete API documentation through JSDoc comments.

## Development

```bash
# Run tests
npm test

# Build the project
npm run build

# Lint code
npm run lint
```

## License

MIT
