# oxlint-comments/no-unlimited-disable

> disallow `oxlint-disable` comments without rule names

-   🌟 The `oxlint-comments/recommended` config enables this rule.

`oxlint-disable` directive-comments disable all rules by default. This may cause to overlook some warnings unintentionally.
So you should specify the rules to disable accurately.

## Rule Details

Examples of :-1: **incorrect** code for this rule:

<eslint-playground type="bad" >

```js
/*eslint oxlint-comments/no-unlimited-disable: error */

var foo //oxlint-disable-line
```

</eslint-playground>

Examples of :+1: **correct** code for this rule:

<eslint-playground type="good" >

```js
/*eslint oxlint-comments/no-unlimited-disable: error */

var foo //oxlint-disable-line no-unused-vars
```

</eslint-playground>
