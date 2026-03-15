/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import { getDisabledArea } from "../internal/disabled-area.js"
import { toForceLocation } from "../internal/utils.js"

export default {
    meta: {
        docs: {
            description:
                "disallow a `oxlint-enable` comment for multiple `oxlint-disable` comments",
            category: "Best Practices",
            recommended: true,
            url: "https://github.com/christopher-buss/eslint-plugin-oxlint-comments/blob/main/docs/rules/no-aggregating-enable.md",
        },
        fixable: null,
        messages: {
            aggregatingEnable:
                "This `oxlint-enable` comment affects {{count}} `oxlint-disable` comments. An `oxlint-enable` comment should be for an `oxlint-disable` comment.",
        },
        schema: [],
        type: "suggestion",
    },

    createOnce(context) {
        return {
            Program() {
                const disabledArea = getDisabledArea(context)

                for (const entry of disabledArea.numberOfRelatedDisableDirectives) {
                    const comment = entry[0]
                    const count = entry[1]

                    if (count >= 2) {
                        context.report({
                            loc: toForceLocation(comment.loc),
                            messageId: "aggregatingEnable",
                            data: { count },
                        })
                    }
                }
            },
        }
    },
}
