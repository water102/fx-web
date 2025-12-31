# Contributing to @water102/fx-web

Thank you for your interest in contributing to fx-web! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development

### Building

```bash
npm run build
```

### Testing

Run all tests:
```bash
npm test
```

Run tests for a specific module:
```bash
npm test -- css-var
```

### Code Style

- Follow the existing code style
- Use functional programming style when supported
- All comments must be in English
- Run `npm run prettier-format` before committing

## Adding New Features

1. **Add the implementation** in the appropriate directory under `src/`
2. **Export the function** from the relevant `index.ts` file
3. **Add JSDoc comments** describing the function, parameters, return value, and examples
4. **Write tests** - Create a `.test.ts` file with comprehensive test cases
5. **Update README.md** - Add documentation for the new function
6. **Update CHANGELOG.md** - Document the new feature

## Writing Tests

- Place test files next to the source files (e.g., `src/css-var/get-css-var.test.ts`)
- Use descriptive test names
- Cover edge cases and error scenarios
- Aim for high test coverage
- Note: Browser APIs may require mocking (e.g., `document`, `window`, `localStorage`)

Example test structure:
```typescript
import { myFunction } from './my-function';

describe('myFunction', () => {
  test('Does something correctly', () => {
    expect(myFunction(input)).toBe(expected);
  });

  test('Handles edge case', () => {
    expect(myFunction(edgeCase)).toBe(expected);
  });
});
```

## Type Safety

- Prefer TypeScript generics over `any` types
- Use proper type guards
- Add JSDoc type annotations when helpful
- For browser-specific APIs, use proper type definitions

## Browser Compatibility

- Consider browser compatibility when adding new features
- Test in multiple browsers when possible
- Document any browser-specific behavior

## Pull Request Process

1. Ensure all tests pass: `npm test`
2. Ensure the build succeeds: `npm run build`
3. Update CHANGELOG.md with your changes
4. Create a pull request with a clear description
5. Reference any related issues

## Code Review

- All PRs require review before merging
- Address review comments promptly
- Keep PRs focused and reasonably sized

## Questions?

Feel free to open an issue for questions or discussions.

Thank you for contributing! 🎉

