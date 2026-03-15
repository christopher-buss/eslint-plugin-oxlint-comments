/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */

import { getAllDirectiveComments } from "../internal/get-all-directive-comments.js"
import { toForceLocation } from "../internal/utils.js"

export default {
    meta: {
        docs: {
            description:
                "require include descriptions in oxlint directive-comments",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://github.com/christopher-buss/eslint-plugin-oxlint-comments/blob/main/docs/rules/require-description.md",
        },
        fixable: null,
        messages: {
            missingDescription:
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    ignore: {
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

    createOnce(context) {
        return {
            Program() {
                const ignores = new Set(
                    (context.options && context.options[0] && context.options[0].ignore) || []
                )
                for (const directiveComment of getAllDirectiveComments(
                    context
                )) {
                    if (ignores.has(directiveComment.kind)) {
                        continue
                    }
                    if (!directiveComment.description) {
                        context.report({
                            loc: toForceLocation(directiveComment.loc),
                            messageId: "missingDescription",
                        })
                    }
                }
            },
        }
    },
}
