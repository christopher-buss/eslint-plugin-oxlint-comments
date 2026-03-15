/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import { getDisabledArea } from "../internal/disabled-area.js"
import { toRuleIdLocation } from "../internal/utils.js"

export default {
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
                loc: toRuleIdLocation(item.comment, item.ruleId),
                messageId: item.ruleId ? "duplicateRule" : "duplicate",
                data: item,
            })
        }
        return {}
    },
}
