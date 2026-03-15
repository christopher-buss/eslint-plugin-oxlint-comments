import { describe, it } from "vitest"
import { RuleTester } from "oxlint/plugins-dev"
import rule from "../../../lib/rules/no-unused-enable.js"

RuleTester.describe = describe
RuleTester.it = it

const tester = new RuleTester()

tester.run("no-unused-enable", rule, {
    valid: [
        `
/*oxlint-disable*/
/*oxlint-enable*/
`,
        `
/*oxlint-disable no-undef*/
/*oxlint-enable no-undef*/
`,
        `
/*oxlint-disable no-undef*/
/*oxlint-enable*/
`,
        `
/*oxlint-disable no-undef,no-unused-vars*/
/*oxlint-enable no-undef*/
`,
        `
/*oxlint-disable no-undef,no-unused-vars*/
/*oxlint-enable*/
`,
    ],
    invalid: [
        {
            code: "/*oxlint-enable*/",
            errors: [
                {
                    message:
                        "Oxlint rules are re-enabled but those have not been disabled.",
                    line: 1,
                    column: 0,
                    endLine: 1,
                    endColumn: 17,
                },
            ],
        },
        {
            code: "/*oxlint-enable no-undef*/",
            errors: [
                {
                    message:
                        "'no-undef' rule is re-enabled but it has not been disabled.",
                    line: 1,
                    column: 16,
                    endLine: 1,
                    endColumn: 24,
                },
            ],
        },
        {
            code: `
/*oxlint-disable no-unused-vars*/
/*oxlint-enable no-undef*/
`,
            errors: [
                {
                    message:
                        "'no-undef' rule is re-enabled but it has not been disabled.",
                    line: 3,
                    column: 16,
                    endLine: 3,
                    endColumn: 24,
                },
            ],
        },
        // -- description
        {
            code: "/*oxlint-enable -- description*/",
            errors: [
                {
                    message:
                        "Oxlint rules are re-enabled but those have not been disabled.",
                    line: 1,
                    column: 0,
                    endLine: 1,
                    endColumn: 32,
                },
            ],
        },
    ],
})
