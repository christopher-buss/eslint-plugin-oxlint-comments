/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { getDisabledArea } = require("../internal/disabled-area")
const utils = require("../internal/utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow duplicate `oxlint-disable` comments",
            category: "Best Practices",
            recommended: true,
            url: "https://github.com/christopher-buss/eslint-plugin-oxlint-comments/blob/main/docs/rules/no-duplicate-disable.md",
        },
        fixable: null,
        messages: {
            duplicate: "Oxlint rules have been disabled already.",
            duplicateRule: "'{{ruleId}}' rule has been disabled already.",
        },
        schema: [],
        type: "problem",
    },

    create(context) {
        const disabledArea = getDisabledArea(context)

        for (const item of disabledArea.duplicateDisableDirectives) {
            context.report({
                loc: utils.toRuleIdLocation(context, item.comment, item.ruleId),
                messageId: item.ruleId ? "duplicateRule" : "duplicate",
                data: item,
            })
        }
        return {}
    },
}
