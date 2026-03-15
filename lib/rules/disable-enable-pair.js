/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import { getDisabledArea } from "../internal/disabled-area.js"
import { lte, toRuleIdLocation } from "../internal/utils.js"

export default {
    meta: {
        docs: {
            description:
                "require a `oxlint-enable` comment for every `oxlint-disable` comment",
            category: "Best Practices",
            recommended: true,
            url: "https://github.com/christopher-buss/eslint-plugin-oxlint-comments/blob/main/docs/rules/disable-enable-pair.md",
        },
        fixable: null,
        messages: {
            missingPair: "Requires 'oxlint-enable' directive.",
            missingRulePair:
                "Requires 'oxlint-enable' directive for '{{ruleId}}'.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowWholeFile: {
                        type: "boolean",
                    },
                },
                additionalProperties: false,
            },
        ],
        type: "suggestion",
    },

    createOnce(context) {
        return {
            Program() {
                const allowWholeFile =
                    context.options &&
                    context.options[0] &&
                    context.options[0].allowWholeFile
                const disabledArea = getDisabledArea(context)
                const sourceCode =
                    context.sourceCode || context.getSourceCode()

                const firstToken =
                    sourceCode.ast &&
                    sourceCode.ast.tokens &&
                    sourceCode.ast.tokens[0]

                if (allowWholeFile && !firstToken) {
                    return
                }

                for (const area of disabledArea.areas) {
                    if (area.end != null) {
                        continue
                    }
                    if (
                        allowWholeFile &&
                        firstToken &&
                        lte(area.start, firstToken.loc.start)
                    ) {
                        continue
                    }

                    context.report({
                        loc: toRuleIdLocation(area.comment, area.ruleId),
                        messageId: area.ruleId
                            ? "missingRulePair"
                            : "missingPair",
                        data: area,
                    })
                }
            },
        }
    },
}
