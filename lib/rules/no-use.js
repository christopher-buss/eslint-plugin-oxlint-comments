/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import { getAllDirectiveComments } from "../internal/get-all-directive-comments.js"
import { toForceLocation } from "../internal/utils.js"

export default {
    meta: {
        docs: {
            description: "disallow oxlint directive-comments",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://github.com/christopher-buss/eslint-plugin-oxlint-comments/blob/main/docs/rules/no-use.md",
        },
        fixable: null,
        messages: {
            disallow: "Unexpected oxlint directive comment.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allow: {
                        type: "array",
                        items: {
                            enum: [
                                "oxlint-disable",
                                "oxlint-disable-line",
                                "oxlint-disable-next-line",
                                "oxlint-enable",
                            ],
                        },
                        additionalItems: false,
                        uniqueItems: true,
                    },
                },
                additionalProperties: false,
            },
        ],
        type: "suggestion",
    },

    create(context) {
        const allowed = new Set(
            (context.options[0] && context.options[0].allow) || []
        )

        for (const directiveComment of getAllDirectiveComments(context)) {
            if (!allowed.has(directiveComment.kind)) {
                context.report({
                    loc: toForceLocation(directiveComment.loc),
                    messageId: "disallow",
                })
            }
        }
        return {}
    },
}
