/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import escapeStringRegexp from "escape-string-regexp"

const LINE_PATTERN = /[^\r\n\u2028\u2029]*(?:\r\n|[\r\n\u2028\u2029]|$)/gu

const DIRECTIVE_PATTERN =
    /^(oxlint-(?:enable|disable(?:(?:-next)?-line)?))(?:\s|$)/u

/**
 * Make the location ignoring `oxlint-disable` comments.
 *
 * @param {object} location - The location to convert.
 * @returns {object} Converted location.
 */
export function toForceLocation(location) {
    return {
        start: {
            line: location.start.line,
            column: 0,
        },
        end: location.end,
    }
}

/**
 * Calculate the location of the given rule in the given comment token.
 *
 * @param {Token} comment - The comment token to calculate.
 * @param {string|null} ruleId - The rule name to calculate.
 * @returns {object} The location of the given information.
 */
export function toRuleIdLocation(comment, ruleId) {
    const commentLoc = comment.loc
    if (ruleId == null) {
        return toForceLocation(commentLoc)
    }

    const lines = comment.value.match(LINE_PATTERN)
    const ruleIdPattern = new RegExp(
        `([\\s,]|^)${escapeStringRegexp(ruleId)}(?:[\\s,]|$)`,
        "u"
    )

    {
        const m = ruleIdPattern.exec(lines[0])
        if (m != null) {
            const start = commentLoc.start
            return {
                start: {
                    line: start.line,
                    column: 2 + start.column + m.index + m[1].length,
                },
                end: {
                    line: start.line,
                    column:
                        2 +
                        start.column +
                        m.index +
                        m[1].length +
                        ruleId.length,
                },
            }
        }
    }

    for (let i = 1; i < lines.length; ++i) {
        const m = ruleIdPattern.exec(lines[i])
        if (m != null) {
            const start = commentLoc.start
            return {
                start: {
                    line: start.line + i,
                    column: m.index + m[1].length,
                },
                end: {
                    line: start.line + i,
                    column: m.index + m[1].length + ruleId.length,
                },
            }
        }
    }

    /*istanbul ignore next : foolproof */
    return commentLoc
}

/**
 * Checks `a` is less than `b` or `a` equals `b`.
 *
 * @param {{line: number, column: number}} a - A location to compare.
 * @param {{line: number, column: number}} b - Another location to compare.
 * @returns {boolean} `true` if `a` is less than `b` or `a` equals `b`.
 */
export function lte(a, b) {
    return a.line < b.line || (a.line === b.line && a.column <= b.column)
}

/**
 * Parse the given comment token as a directive comment.
 *
 * @param {Token} comment - The comment token to parse.
 * @returns {{kind: string, value: string, description: string | null}|null} The parsed data of the given comment. If `null`, it is not a directive comment.
 */
export function parseDirectiveComment(comment) {
    const parsed = parseDirectiveText(comment.value)
    if (!parsed) {
        return null
    }

    if (
        parsed.kind === "oxlint-disable-line" &&
        comment.loc.start.line !== comment.loc.end.line
    ) {
        // disable-line comment should not span multiple lines.
        return null
    }

    return parsed
}

/**
 * Parse the given text as a directive comment.
 *
 * @param {string} textToParse - The text to parse.
 * @returns {{kind: string, value: string, description: string | null}|null} The parsed data of the given comment. If `null`, it is not a directive comment.
 */
export function parseDirectiveText(textToParse) {
    const { text, description } = divideDirectiveComment(textToParse)
    const match = DIRECTIVE_PATTERN.exec(text)

    if (!match) {
        return null
    }
    const directiveText = match[1]

    const directiveValue = text.slice(match.index + directiveText.length)

    return {
        kind: directiveText,
        value: directiveValue.trim(),
        description,
    }
}

/**
 * Divides and trims description text and directive comments.
 * @param {string} value The comment text to strip.
 * @returns {{text: string, description: string | null}} The stripped text.
 */
function divideDirectiveComment(value) {
    const divided = value.split(/\s-{2,}\s/u)
    const text = divided[0].trim()
    return {
        text,
        description: divided.length > 1 ? divided[1].trim() : null,
    }
}
