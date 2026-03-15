# Available Rules

-   🌟 mark: the rule which is enabled by `oxlint-comments/recommended` preset.

## Best Practices

| Rule ID                                                                        | Description                                                                 |     |
| :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------- | :-- |
| [oxlint-comments/<wbr>disable-enable-pair](./disable-enable-pair.md)           | require a `oxlint-enable` comment for every `oxlint-disable` comment        | 🌟  |
| [oxlint-comments/<wbr>no-aggregating-enable](./no-aggregating-enable.md)       | disallow a `oxlint-enable` comment for multiple `oxlint-disable` comments   | 🌟  |
| [oxlint-comments/<wbr>no-duplicate-disable](./no-duplicate-disable.md)         | disallow duplicate `oxlint-disable` comments                                | 🌟  |
| [oxlint-comments/<wbr>no-unlimited-disable](./no-unlimited-disable.md)         | disallow `oxlint-disable` comments without rule names                       | 🌟  |
| [oxlint-comments/<wbr>no-unused-enable](./no-unused-enable.md)                 | disallow unused `oxlint-enable` comments                                    | 🌟  |

## Stylistic Issues

| Rule ID                                                                        | Description                                                    |     |
| :----------------------------------------------------------------------------- | :------------------------------------------------------------- | :-- |
| [oxlint-comments/<wbr>no-restricted-disable](./no-restricted-disable.md)       | disallow `oxlint-disable` comments about specific rules        |     |
| [oxlint-comments/<wbr>no-use](./no-use.md)                                     | disallow oxlint directive-comments                             |     |
| [oxlint-comments/<wbr>require-description](./require-description.md)           | require descriptions in oxlint directive-comments              |     |
