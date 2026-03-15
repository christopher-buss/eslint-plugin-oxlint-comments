/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import { lte, parseDirectiveComment } from "./utils.js"

const DELIMITER = /[\s,]+/gu
const pool = new WeakMap()

class DisabledArea {
    constructor() {
        this.areas = []
        this.duplicateDisableDirectives = []
        this.unusedEnableDirectives = []
        this.numberOfRelatedDisableDirectives = new Map()
    }

    _disable(comment, location, ruleIds, kind) {
        if (ruleIds) {
            for (const ruleId of ruleIds) {
                if (this._getArea(ruleId, location) != null) {
                    this.duplicateDisableDirectives.push({ comment, ruleId })
                }

                this.areas.push({
                    comment,
                    ruleId,
                    kind,
                    start: location,
                    end: null,
                })
            }
        } else {
            if (this._getArea(null, location) != null) {
                this.duplicateDisableDirectives.push({ comment, ruleId: null })
            }

            this.areas.push({
                comment,
                ruleId: null,
                kind,
                start: location,
                end: null,
            })
        }
    }

    _enable(comment, location, ruleIds, kind) {
        const relatedDisableDirectives = new Set()

        if (ruleIds) {
            for (const ruleId of ruleIds) {
                let used = false

                for (let i = this.areas.length - 1; i >= 0; --i) {
                    const area = this.areas[i]

                    if (
                        area.end === null &&
                        area.kind === kind &&
                        area.ruleId === ruleId
                    ) {
                        relatedDisableDirectives.add(area.comment)
                        area.end = location
                        used = true
                    }
                }

                if (!used) {
                    this.unusedEnableDirectives.push({ comment, ruleId })
                }
            }
        } else {
            let used = false

            for (let i = this.areas.length - 1; i >= 0; --i) {
                const area = this.areas[i]

                if (area.end === null && area.kind === kind) {
                    relatedDisableDirectives.add(area.comment)
                    area.end = location
                    used = true
                }
            }

            if (!used) {
                this.unusedEnableDirectives.push({ comment, ruleId: null })
            }
        }

        this.numberOfRelatedDisableDirectives.set(
            comment,
            relatedDisableDirectives.size
        )
    }

    _getArea(ruleId, location) {
        for (let i = this.areas.length - 1; i >= 0; --i) {
            const area = this.areas[i]

            if (
                (area.ruleId === null || area.ruleId === ruleId) &&
                lte(area.start, location) &&
                (area.end === null || lte(location, area.end))
            ) {
                return area
            }
        }

        return null
    }

    _scan(sourceCode) {
        const comments =
            typeof sourceCode.getAllComments === "function"
                ? sourceCode.getAllComments()
                : []

        for (const comment of comments) {
            const directiveComment = parseDirectiveComment(comment)
            if (directiveComment == null) {
                continue
            }

            const kind = directiveComment.kind
            if (
                ![
                    "oxlint-disable",
                    "oxlint-enable",
                    "oxlint-disable-line",
                    "oxlint-disable-next-line",
                ].includes(kind)
            ) {
                continue
            }
            const ruleIds = directiveComment.value
                ? directiveComment.value.split(DELIMITER)
                : null

            if (kind === "oxlint-disable") {
                this._disable(comment, comment.loc.start, ruleIds, "block")
            } else if (kind === "oxlint-enable") {
                this._enable(comment, comment.loc.start, ruleIds, "block")
            } else if (kind === "oxlint-disable-line") {
                const line = comment.loc.start.line
                const start = { line, column: 0 }
                const end = { line: line + 1, column: -1 }

                this._disable(comment, start, ruleIds, "line")
                this._enable(comment, end, ruleIds, "line")
            } else if (kind === "oxlint-disable-next-line") {
                const line = comment.loc.start.line
                const start = { line: line + 1, column: 0 }
                const end = { line: line + 2, column: -1 }

                this._disable(comment, start, ruleIds, "line")
                this._enable(comment, end, ruleIds, "line")
            }
        }
    }
}

/**
 * Get singleton instance for the given rule context.
 *
 * @param {object} context - The rule context code to get.
 * @returns {DisabledArea} The singleton object for the rule context.
 */
export function getDisabledArea(context) {
    const sourceCode = context.sourceCode || context.getSourceCode()
    let retv = pool.get(sourceCode.ast)

    if (retv == null) {
        retv = new DisabledArea()
        retv._scan(sourceCode)
        pool.set(sourceCode.ast, retv)
    }

    return retv
}
