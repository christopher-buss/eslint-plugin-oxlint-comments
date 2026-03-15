# oxlint-comments/no-use

> disallow oxlint directive-comments

Abuse of directive-comments may cause to overlook bugs or upset of coding style.
This rule disallows a use of directive-comments.

## Rule Details

Examples of :-1: **incorrect** code for this rule:

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/no-use: error */

/* oxlint-disable foo */
/* oxlint-enable bar */
// oxlint-disable-line
// oxlint-disable-next-line
```

</eslint-playground>

## Options

You can specify allowed directive-comments.

```json
{
    "oxlint-comments/no-use": ["error", { "allow": [] }]
}
```

-   `allow` option is an array to allow specified directive-comments. The value of the array is some of the following strings:
    -   `"oxlint-disable"`
    -   `"oxlint-disable-line"`
    -   `"oxlint-disable-next-line"`
    -   `"oxlint-enable"`

## Known Limitations

This rule cannot prevent the following case:

```js
/* eslint oxlint-comments/no-use: off */
```

Because ESLint addresses the directive-comment before parsing.
