# Snowflake

This is a version of [Medium's snowflake tool](https://github.com/Medium/snowflake) (created as part of their [growth framework documentation](https://medium.com/s/engineering-growth-framework)), but using TypeScript instead of Flow, and adapted to Work&Co's (research) needs.

Check the list of recent changes on the [changelog](CHANGELOG.md).

## Contributions

This is meant to duplicate the original tool's functionality. Fixes by third-party forks might be merged. New featrures might be added.

## First-time setup

After pulling the contents of this repository, install all the needed tools to start development.

### 1. Install Node.js [using the official installer](https://nodejs.org/en/) or through Homebrew

```shell
brew install node
```

### 2. Install yarn if you don’t have it already

```shell
npm install -g yarn
```

### 3. Install dependencies

```shell
yarn
```

## Development

First, run the server:

```shell
yarn dev
```

This will start hosting a version of the site served on [http://localhost:3000](http://localhost:3000).

Modifying any of the source files will automatically trigger a new build.

## Building

To build a static version of the site in `out/` using Next.js, do:

```shell
yarn export
```

This will create static files that are ready to be deployed to a standard web server.

## Editing

Edit [src/ladder/data/ladder-medium.json](/src/ladder/data/ladder-medium.json) to see changes reflected in how the application behaves.

## Future work

* Allow job title selection with sorting based on stronger categories
* Allow different ladders from different JSON files
* Tweak and create a Work&Co-specific ladder
* Add archetype calculation
* Deploy to netlify
* Allow loading external JSON files
* Port styles to [Emotion](https://emotion.sh/docs/object-styles)
