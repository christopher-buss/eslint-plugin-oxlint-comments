# oxlint-comments/no-restricted-disable

> disallow `oxlint-disable` comments about specific rules

This rule warns `oxlint-disable` directive-comments if the comment disables specific rules.

## Rule Details

:-1: Examples of **incorrect** code for this rule:

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/no-restricted-disable: [error, no-undef, no-unused-vars]*/

/*oxlint-disable no-undef */
f()
```

</eslint-playground>

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/no-restricted-disable: [error, no-undef, no-unused-vars]*/

f() //oxlint-disable-line no-undef
```

</eslint-playground>

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/no-restricted-disable: [error, no-undef, no-unused-vars]*/

f() //oxlint-disable-line
```

</eslint-playground>

:+1: Examples of **correct** code for this rule:

<eslint-playground type="good" >

```js
/*eslint oxlint-comments/no-restricted-disable: [error, no-undef, no-unused-vars]*/

f() //oxlint-disable-line another-rule
```

</eslint-playground>

## Options

```json
{
    "oxlint-comments/no-restricted-disable": ["error", ...]
}
```

This rule takes a list of strings, where each string is a glob pattern. For example:

```json
{
    "oxlint-comments/no-restricted-disable": [
        "error",
        "no-undef",
        "*semi*",
        "react/*"
    ]
}
```

```json
{
    "oxlint-comments/no-restricted-disable": [
        "error",
        "*",
        "!no-console"
    ]
}
```
