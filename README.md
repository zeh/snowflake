# Snowflake

This is a version of [Medium's snowflake tool](https://github.com/Medium/snowflake), but in TypeScript (instead of the original Flow) and adapted to Work&Co's (research) needs.

Read more about their tool in their [growth framework documentation](https://medium.com/s/engineering-growth-framework).
It is also hosted [publicly](https://snowflake.medium.com).

## Contributions

This is meant to duplicate the original tool's functionality. Fixes by third-party forks might be merged. New featrures might be added.

## First-time setup

1. Install Node.js

2. Get yarn if you don’t have it already

    ```shell
    npm install -g yarn
    ```

3. Install dependencies:

    ```shell
    yarn
    ```

## Development

First, run the server:

```shell
yarn dev
```

This will start hosting a version of the site served on [http://localhost:3000](http://localhost:3000).

Modifying any of the source files will trigger a new build automatically.

## Building

To build a static version of the site in `out/` using Next.js, do:

```shell
yarn export
```

## Future work

* Allow job title selection with sorting based on stronger categories
* Allow different ladders from different JSON files
* Tweak and create a Work&Co-specific ladder
* Add archetype calculation
