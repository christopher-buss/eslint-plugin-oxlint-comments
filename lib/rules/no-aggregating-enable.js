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

    create(context) {
        const disabledArea = getDisabledArea(context)

        for (const entry of disabledArea.numberOfRelatedDisableDirectives) {
            const comment = entry[0]
            const count = entry[1]

            if (count >= 2) {
                context.report({
                    loc: utils.toForceLocation(utils.getLoc(context, comment)),
                    messageId: "aggregatingEnable",
                    data: { count },
                })
            }
        }
        return {}
    },
}
