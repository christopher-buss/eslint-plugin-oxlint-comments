import { describe, it } from "vitest"
import { RuleTester } from "oxlint/plugins-dev"
import rule from "../../../lib/rules/no-unlimited-disable.js"

RuleTester.describe = describe
RuleTester.it = it

const tester = new RuleTester()

tester.run("no-unlimited-disable", rule, {
    valid: [
        "/*oxlint-enable*/",
        "/*oxlint-disable eqeqeq*/",
        "//oxlint-disable-line eqeqeq",
        "//oxlint-disable-next-line eqeqeq",
        "/*oxlint-disable-line eqeqeq*/",
        "/*oxlint-disable-next-line eqeqeq*/",
        "var foo;\n//oxlint-disable-line eqeqeq",
        "var foo;\n/*oxlint-disable-line eqeqeq*/",
    ],
    invalid: [
        {
            code: "/*oxlint-disable */",
            errors: [
                "Unexpected unlimited 'oxlint-disable' comment. Specify some rule names to disable.",
            ],
        },
        {
            code: "/* oxlint-disable */",
            errors: [
                "Unexpected unlimited 'oxlint-disable' comment. Specify some rule names to disable.",
            ],
        },
        {
            code: "//oxlint-disable-line",
            errors: [
                "Unexpected unlimited 'oxlint-disable-line' comment. Specify some rule names to disable.",
            ],
        },
        {
            code: "/*oxlint-disable-line*/",
            errors: [
                "Unexpected unlimited 'oxlint-disable-line' comment. Specify some rule names to disable.",
            ],
        },
        {
            code: "// oxlint-disable-line ",
            errors: [
                "Unexpected unlimited 'oxlint-disable-line' comment. Specify some rule names to disable.",
            ],
        },
        {
            code: "/* oxlint-disable-line */",
            errors: [
                "Unexpected unlimited 'oxlint-disable-line' comment. Specify some rule names to disable.",
            ],
        },
        {
            code: "//oxlint-disable-next-line",
            errors: [
                "Unexpected unlimited 'oxlint-disable-next-line' comment. Specify some rule names to disable.",
            ],
        },
        {
            code: "/*oxlint-disable-next-line*/",
            errors: [
                "Unexpected unlimited 'oxlint-disable-next-line' comment. Specify some rule names to disable.",
            ],
        },
        {
            code: "// oxlint-disable-next-line ",
            errors: [
                "Unexpected unlimited 'oxlint-disable-next-line' comment. Specify some rule names to disable.",
            ],
        },
        {
            code: "/* oxlint-disable-next-line */",
            errors: [
                "Unexpected unlimited 'oxlint-disable-next-line' comment. Specify some rule names to disable.",
            ],
        },
        {
            code: "var foo;\n//oxlint-disable-line",
            errors: [
                "Unexpected unlimited 'oxlint-disable-line' comment. Specify some rule names to disable.",
            ],
        },
        {
            code: "var foo;\n/*oxlint-disable-line*/",
            errors: [
                "Unexpected unlimited 'oxlint-disable-line' comment. Specify some rule names to disable.",
            ],
        },
        // -- description
        {
            code: "/*oxlint-disable -- description */",
            errors: [
                "Unexpected unlimited 'oxlint-disable' comment. Specify some rule names to disable.",
            ],
        },
    ],
})
