/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { RuleTester } = require("eslint")
const rule = require("../../../lib/rules/no-use")
const tester = new RuleTester()

tester.run("no-use", rule, {
    valid: [
        "/* just oxlint in a normal comment */",
        "/* oxlint is great */",
        "// oxlint",
        {
            code: "/* oxlint-enable */",
            options: [{ allow: ["oxlint-enable"] }],
        },
        {
            code: "/* oxlint-disable */",
            options: [{ allow: ["oxlint-disable"] }],
        },
        {
            code: "// oxlint-disable-line",
            options: [{ allow: ["oxlint-disable-line"] }],
        },
        {
            code: "// oxlint-disable-next-line",
            options: [{ allow: ["oxlint-disable-next-line"] }],
        },
        {
            code: "/* oxlint-disable-line */",
            options: [{ allow: ["oxlint-disable-line"] }],
        },
        {
            code: "/* oxlint-disable-next-line */",
            options: [{ allow: ["oxlint-disable-next-line"] }],
        },
    ],
    invalid: [
        {
            code: "// oxlint-disable",
            errors: ["Unexpected oxlint directive comment."],
        },
        {
            code: "// oxlint-enable",
            errors: ["Unexpected oxlint directive comment."],
        },
        {
            code: "/* oxlint-enable */",
            errors: ["Unexpected oxlint directive comment."],
        },
        {
            code: "/* oxlint-disable */",
            errors: ["Unexpected oxlint directive comment."],
        },
        {
            code: "// oxlint-disable-line",
            errors: ["Unexpected oxlint directive comment."],
        },
        {
            code: "// oxlint-disable-next-line",
            errors: ["Unexpected oxlint directive comment."],
        },
        {
            code: "/* oxlint-disable-line */",
            errors: ["Unexpected oxlint directive comment."],
        },
        {
            code: "/* oxlint-disable-next-line */",
            errors: ["Unexpected oxlint directive comment."],
        },
    ],
})
