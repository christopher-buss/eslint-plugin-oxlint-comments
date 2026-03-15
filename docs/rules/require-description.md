# oxlint-comments/require-description

> require descriptions in oxlint directive-comments

This rule warns directive comments without description.

## Rule Details

Examples of :-1: **incorrect** code for this rule:

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/require-description: error */

/* oxlint-disable eqeqeq */
/* oxlint-enable eqeqeq */
// oxlint-disable-line
// oxlint-disable-next-line
```

</eslint-playground>

Examples of :+1: **correct** code for this rule:

<eslint-playground type="good" >

```js
/*eslint oxlint-comments/require-description: error -- If you use directive comments, you should explain why you use them. */

// oxlint-disable-next-line -- Temporarily avoids the lint error problem. See issue XXX.
```

</eslint-playground>

## Options

You can specify ignored directive-comments.

```json
{
    "oxlint-comments/require-description": [
        "error",
        { "ignore": [] }
    ]
}
```

-   `ignore` option is an array to ignore specified directive-comments. The value of the array is some of the following strings:
    -   `"oxlint-disable"`
    -   `"oxlint-disable-line"`
    -   `"oxlint-disable-next-line"`
    -   `"oxlint-enable"`
