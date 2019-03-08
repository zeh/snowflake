# Changelog

All changes to this project are documented in this file. We follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html) where appropriate.

## [Unreleased]

## [1.2.0] - 2019-03-08

### Added

- Categories can have a different text color for labels
- The concept of "levels" is also optional per template
- Added a template using Chris Alden's proposal

### Fixed

- Yet more bugs on score calculation
- Switching between different templates work again: tracks are clickable, milestone selections carry, keyboard navigation works, thermometer colors update

## [1.1.0] - 2019-03-07

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

### Fixed

- Various bug fixes on score calculation, oops

## [1.0.0] - 2019-03-06

### Changed

- Refactored the app to use a single JSON file for career ladder configuration

## [0.0.1-medium-typescript] - 2019-02-27

### Changed

- Ported the app source code to TypeScript

## [0.0.1-medium-original] - 2018-10-18

### Started

- Forked from [Medium's original project](https://github.com/Medium/snowflake)
