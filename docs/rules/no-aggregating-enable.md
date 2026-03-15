# oxlint-comments/no-aggregating-enable

> disallow a `oxlint-enable` comment for multiple `oxlint-disable` comments

-   🌟 The `oxlint-comments/recommended` config enables this rule.

`oxlint-enable` directive-comments can enable rules which are disabled by different `oxlint-disable` directive-comments.
It can enable a rule unintentionally.

```js
/*oxlint-disable no-undef */
f()
/*oxlint-disable no-var */
var a
    /*oxlint-enable */
;("Enables both no-undef and no-var.")
```

This rule warns `oxlint-enable` directive-comments which enable rules for multiple `oxlint-disable` directive-comments.

## Rule Details

:-1: Examples of **incorrect** code for this rule:

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/no-aggregating-enable: error*/

/*oxlint-disable no-undef */
f()
/*oxlint-disable no-var */
var a
/*oxlint-enable */
```

</eslint-playground>

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/no-aggregating-enable: error*/

/*oxlint-disable no-undef */
f()
/*oxlint-disable no-var */
var a
/*oxlint-enable no-undef, no-var */
```

</eslint-playground>

:+1: Examples of **correct** code for this rule:

<eslint-playground type="good" >

```js
/*eslint oxlint-comments/no-aggregating-enable: error*/

/*oxlint-disable no-undef */
f()
/*oxlint-disable no-var */
var a
/*oxlint-enable no-var */

/*oxlint-enable no-undef */
```

</eslint-playground>
