/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import { getDisabledArea } from "../internal/disabled-area.js"
import { toRuleIdLocation } from "../internal/utils.js"

export default {
    meta: {
        docs: {
            description: "disallow unused `oxlint-enable` comments",
            category: "Best Practices",
            recommended: true,
            url: "https://github.com/christopher-buss/eslint-plugin-oxlint-comments/blob/main/docs/rules/no-unused-enable.md",
        },
        fixable: null,
        messages: {
            unused: "Oxlint rules are re-enabled but those have not been disabled.",
            unusedRule:
                "'{{ruleId}}' rule is re-enabled but it has not been disabled.",
        },
        schema: [],
        type: "problem",
    },

    create(context) {
        const disabledArea = getDisabledArea(context)

        for (const item of disabledArea.unusedEnableDirectives) {
            context.report({
                loc: toRuleIdLocation(item.comment, item.ruleId),
                messageId: item.ruleId ? "unusedRule" : "unused",
                data: item,
            })
        }
        return {}
    },
}
