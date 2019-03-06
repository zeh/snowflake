module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	env: {
		browser: true,
		es6: true,
	},
	parserOptions: {
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: "module",
		useJSXTextNode: true,
		project: "./tsconfig.json",
		tsconfigRootDir: "./",
		extraFileExtensions: [],
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	rules: {
		"no-dupe-class-members": ["off"],
		"indent": ["off"],
		"@typescript-eslint/indent": ["error", "tab"],
		"@typescript-eslint/explicit-function-return-type": ["error"],
		"@typescript-eslint/interface-name-prefix": ["error", "always"],
		"@typescript-eslint/array-type": ["error", "array-simple"],
		"react/display-name": ["off"],
		"react/jsx-curly-brace-presence": ["error", { props: "always" }],
		"jsx-quotes": ["error", "prefer-double"],
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
