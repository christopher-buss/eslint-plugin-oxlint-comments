# oxlint-comments/disable-enable-pair

> require a `oxlint-enable` comment for every `oxlint-disable` comment

-   🌟 The `oxlint-comments/recommended` config enables this rule.

`oxlint-disable` directive-comments disable oxlint rules in all lines preceded by the comment.
If you forget `oxlint-enable` directive-comment, you may overlook warnings unintentionally.

This rule warns `oxlint-disable` directive-comments if the `oxlint-enable` directive-comment for that does not exist.

## Rule Details

Examples of :-1: **incorrect** code for this rule:

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/disable-enable-pair: error */

/*oxlint-disable no-undef, no-unused-vars */
var foo = bar()
```

</eslint-playground>

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/disable-enable-pair: error */

/*oxlint-disable no-undef, no-unused-vars */
var foo = bar()
/*oxlint-enable no-unused-vars */
```

</eslint-playground>

Examples of :+1: **correct** code for this rule:

<eslint-playground type="good" >

```js
/*eslint oxlint-comments/disable-enable-pair: error */

/*oxlint-disable no-undef, no-unused-vars */
var foo = bar()
/*oxlint-enable no-undef, no-unused-vars */
```

</eslint-playground>

<eslint-playground type="good" >

```js
/*eslint oxlint-comments/disable-enable-pair: error */

/*oxlint-disable no-undef, no-unused-vars */
var foo = bar()
/*oxlint-enable*/
```

</eslint-playground>

## Options

The `allowWholeFile` option lets you allow disabling rules for the entire file while still catching "open" `oxlint-disable` directives in the middle of a file.

```json
{
    "oxlint-comments/disable-enable-pair": [
        "error",
        { "allowWholeFile": true }
    ]
}
```

Examples of :-1: **incorrect** code for this rule:

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/disable-enable-pair: [error, {allowWholeFile: true}] */

/*oxlint-disable no-undef */
var foo = bar()
/*oxlint-disable no-unused-vars */
var fizz = buzz()
```

</eslint-playground>

Examples of :+1: **correct** code for this rule:

<eslint-playground type="good" >

```js
/*eslint oxlint-comments/disable-enable-pair: [error, {allowWholeFile: true}] */

/*oxlint-disable no-undef */
var foo = bar()
/*oxlint-disable no-unused-vars */
var fizz = buzz()
/*oxlint-enable no-unused-vars */
```

</eslint-playground>
