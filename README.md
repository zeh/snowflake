# Snowflake

This is a version of [Medium's snowflake tool](https://github.com/Medium/snowflake), but in TypeScript (instead of the original Flow).

Read more about their tool in their [growth framework documentation](https://medium.com/s/engineering-growth-framework).
It is also hosted [publicly](https://snowflake.medium.com).

## Contributions

This is meant to duplicate the original tool's functionality. Little fixes might be added but this fork is unlikely to detract from the original tool. Fixes by third-party forks might be merged too.

## Installation

Get yarn if you don’t have it already:

`npm install -g yarn`

Install dependencies:

`yarn`

### Running the dev server

`yarn dev`

### Building

`yarn export`

This will put a static version of the site in `out/`.

## Future work

* Load initial data from a file, to improve flexibility.
* Add restricted job title selection and validation.
