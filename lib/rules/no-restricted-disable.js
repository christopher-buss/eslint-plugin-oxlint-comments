/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import ignore from "ignore"
import { getDisabledArea } from "../internal/disabled-area.js"
import { toRuleIdLocation } from "../internal/utils.js"

export default {
    meta: {
        docs: {
            description:
                "disallow `oxlint-disable` comments about specific rules",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://github.com/christopher-buss/eslint-plugin-oxlint-comments/blob/main/docs/rules/no-restricted-disable.md",
        },
        fixable: null,
        messages: {
            disallow: "Disabling '{{ruleId}}' is not allowed.",
        },
        schema: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
        },
        type: "suggestion",
    },

    createOnce(context) {
        return {
            Program() {
                if (!context.options || context.options.length === 0) {
                    return
                }

                const ig = ignore()
                for (const pattern of context.options) {
                    ig.add(pattern)
                }
                const disabledArea = getDisabledArea(context)

                for (const area of disabledArea.areas) {
                    if (area.ruleId == null || ig.ignores(area.ruleId)) {
                        context.report({
                            loc: toRuleIdLocation(
                                area.comment,
                                area.ruleId
                            ),
                            messageId: "disallow",
                            data: {
                                ruleId:
                                    area.ruleId || String(context.options),
                            },
                        })
                    }
                }
            },
        }
    },
}
