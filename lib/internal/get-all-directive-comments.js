"use strict"

const utils = require("./utils")

/**
 * @typedef {object} DirectiveComment
 * @property {string} kind The kind of directive comment.
 * @property {string} [value] The directive value if it is `oxlint-` comment.
 * @property {string} description The description of the directive comment.
 * @property {object} node The node of the directive comment.
 * @property {import("@eslint/core").SourceRange} range The range of the directive comment.
 * @property {import("@eslint/core").SourceLocation} loc The location of the directive comment.
 */

const pool = new WeakMap()

/**
 * @param {import('eslint').SourceCode} sourceCode - The source code to scan.
 * @returns {DirectiveComment[]} The directive comments.
 */
function getAllDirectiveCommentsFromAllComments(sourceCode) {
    if (typeof sourceCode.getAllComments !== "function") {
        return []
    }
    return sourceCode
        .getAllComments()
        .map((comment) => ({
            comment,
            directiveComment: utils.parseDirectiveComment(comment),
        }))
        .filter(({ directiveComment }) => Boolean(directiveComment))
        .map(
            ({ comment, directiveComment }) =>
                /** @type {DirectiveComment} */ ({
                    kind: directiveComment.kind,
                    value: directiveComment.value,
                    description: directiveComment.description,
                    node: comment,
                    range: comment.range,
                    loc: comment.loc,
                })
        )
}

module.exports = {
    /**
     * Get all directive comments for the given rule context.
     *
     * @param {import("@eslint/core").RuleContext} context - The rule context to get.
     * @returns {DirectiveComment[]} The all directive comments object for the rule context.
     */
    getAllDirectiveComments(context) {
        const sourceCode = context.sourceCode || context.getSourceCode()
        let result = pool.get(sourceCode.ast)

        if (result == null) {
            result = getAllDirectiveCommentsFromAllComments(sourceCode)
            pool.set(sourceCode.ast, result)
        }

        return result
    },
}
