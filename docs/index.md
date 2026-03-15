# Getting Started

ESLint rules for oxlint directive comments (e.g. `//oxlint-disable-line`).

## Goal

The purpose of this plugin is to apply best practices on directive comments such as `/* oxlint-disable */`.

For example,

-   to disallow unused disabling.
-   to disallow non-effect enabling.
-   to require rule IDs for disabling and enabling.

## Installation

Use [npm](https://www.npmjs.com/) or a compatible tool.

```console
npm install --save-dev eslint eslint-plugin-oxlint-comments
```

::: tip Requirements

-   Node.js `>=22.0.0`
-   ESLint `^9.0.0 || ^10.0.0`

:::

## Usage

Configure your [`eslint.config.*` file](https://eslint.org/docs/latest/use/configure/configuration-files-new).

For example:

```js
import js from "@eslint/js"
import comments from "eslint-plugin-oxlint-comments/configs"

export default [js.configs.recommended, comments.recommended]
```

If your project's ESLint config runs in CommonJS instead of ESM, use `require()`:

```js
const comments = require("eslint-plugin-oxlint-comments/configs")
```

Either way, you can optionally configure individual rules:

```js
// ...
export default [
    // ...
    comments.recommended,
    {
        rules: {
            "oxlint-comments/no-unlimited-disable": "error",
            // ...
        },
    },
]
```
