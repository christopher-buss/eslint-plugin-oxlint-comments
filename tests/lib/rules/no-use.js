import { describe, it } from "vitest"
import { RuleTester } from "oxlint/plugins-dev"
import rule from "../../../lib/rules/no-use.js"

RuleTester.describe = describe
RuleTester.it = it

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
