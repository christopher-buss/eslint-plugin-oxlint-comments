# oxlint-comments/no-duplicate-disable

> disallow duplicate `oxlint-disable` comments

-   🌟 The `oxlint-comments/recommended` config enables this rule.

Duplicate `oxlint-disable` directive-comments implies that there is a mix of wide-range directive-comments and narrow-range directive-comments.
The mix may cause to overlook warnings in future.

This rule warns duplicate `oxlint-disable` directive-comments.

## Rule Details

Examples of :-1: **incorrect** code for this rule:

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/no-duplicate-disable: error */

/*oxlint-disable no-undef */

var foo = bar() //oxlint-disable-line no-undef
```

</eslint-playground>

Examples of :+1: **correct** code for this rule:

<eslint-playground type="good" >

```js
/*eslint oxlint-comments/no-duplicate-disable: error */

/*oxlint-disable no-undef */

var foo = bar()
```

</eslint-playground>

<eslint-playground type="good" >

```js
/*eslint oxlint-comments/no-duplicate-disable: error */

var foo = bar() //oxlint-disable-line no-undef
```

</eslint-playground>
