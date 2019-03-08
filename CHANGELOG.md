# Changelog

All changes to this project are documented in this file. We follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html) where appropriate.

## [Unreleased]

### Added

- Added a changelog file
- The source code is now using ESLint and Prettier
- Allow loading career leader rules from different template JSONs
- Added ability to calculate "archetypes" based on track-weighted scores
- Added [automatic deployments to netlify](https://zeh-snowflake.netlify.com/)

### Changed

- State hashes are saved as a compressed JSON payload, rather than a raw array of fixed fields; this makes state easier to change
- Moved all styles to [Emotion](https://emotion.sh/docs/object-styles)
- Rotated chart 45" so categories align with top

## [1.0.0] - 2019-03-06

### Changed

- Refactored the app to use a single JSON file for career ladder configuration

## [0.0.1-medium-typescript] - 2019-02-27

### Changed

- Ported the app source code to TypeScript

## [0.0.1-medium-original] - 2018-10-18

### Started

* Forked from [Medium's original project](https://github.com/Medium/snowflake)
