/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const {
    getAllDirectiveComments,
} = require("../internal/get-all-directive-comments")
const utils = require("../internal/utils")

module.exports = {
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

    create(context) {
        const ignores = new Set(
            (context.options[0] && context.options[0].ignore) || []
        )

        for (const directiveComment of getAllDirectiveComments(context)) {
            if (ignores.has(directiveComment.kind)) {
                continue
            }
            if (!directiveComment.description) {
                context.report({
                    loc: utils.toForceLocation(directiveComment.loc),
                    messageId: "missingDescription",
                })
            }
        }
        return {}
    },
}
