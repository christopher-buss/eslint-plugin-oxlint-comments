# Getting Started

Rules for oxlint directive comments (e.g. `//oxlint-disable-line`).

## Goal

The purpose of this plugin is to apply best practices on directive comments such as `/* oxlint-disable */`.

For example,

-   to disallow unused disabling.
-   to disallow non-effect enabling.
-   to require rule IDs for disabling and enabling.

## Installation

Use [npm](https://www.npmjs.com/) or a compatible tool.

```console
npm install --save-dev oxlint oxlint-plugin-oxlint-comments
```

::: tip Requirements

-   Node.js `>=22.0.0`
-   Oxlint `>=0.16.7`

:::

## Usage

```js
import comments from "oxlint-plugin-oxlint-comments"
```
