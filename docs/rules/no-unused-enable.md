# oxlint-comments/no-unused-enable

> disallow unused `oxlint-enable` comments

-   🌟 The `oxlint-comments/recommended` config enables this rule.

This rule warns `oxlint-enable` directive-comments which have no effect.

## Rule Details

Examples of :-1: **incorrect** code for this rule:

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/no-unused-enable: error */

/*oxlint-disable no-undef */
doSomething()
/*oxlint-enable no-undef-init */
```

</eslint-playground>

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/no-unused-enable: error */

doSomething()
/*oxlint-enable */
```

</eslint-playground>

Examples of :+1: **correct** code for this rule:

<eslint-playground type="good" >

```js
/*eslint oxlint-comments/no-unused-enable: error */

/*oxlint-disable no-undef */
doSomething()
/*oxlint-enable no-undef */
```

</eslint-playground>

<eslint-playground type="good" >

```js
/*eslint oxlint-comments/no-unused-enable: error */

doSomething()
```

</eslint-playground>
