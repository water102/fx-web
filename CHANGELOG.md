# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.7] - 2024-XX-XX

### Fixed
- Fixed duplicate `break` statement in `$setInputValue` function
- Fixed `copyToClipboard` to return Promise and properly handle errors
- Fixed `readImageData` to properly handle errors instead of ignoring them
- Removed `@ts-nocheck` from `make-element-fullscreen.ts` and added proper types

### Changed
- Replaced `any` types with proper generics in `storage/index.ts` (`setItem`, `getItem`)
- Replaced `any` types with proper input element types in `dom/index.ts` (`$setInputValue`, `$getInputValue`)
- Replaced `any` types with proper event types in `listen-event.ts`
- Replaced `any` types with proper types in `export-as-csv.ts`
- Added proper interface for `createElement` options
- Improved error handling in `setItem`/`getItem` with try-catch blocks
- Updated Jest config to detect `.test.ts` files (like fx-common)
- Updated `tsconfig.json` to exclude test files from compilation

### Added
- Added JSDoc comments to all functions
- Exported `CookiesHelper` in `index.ts`
- Added comprehensive README.md with API documentation
- Added CHANGELOG.md for version tracking
- Added CONTRIBUTING.md with contribution guidelines

## [4.0.6] - Previous version

Initial release with utility functions for:
- DOM manipulation
- CSS variables
- LocalStorage helpers
- Cookie management
- Lazy loading
- Clipboard operations
- Browser information
- Query string helpers
- And more...

