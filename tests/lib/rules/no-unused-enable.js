/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { RuleTester } = require("eslint")
const rule = require("../../../lib/rules/no-unused-enable")
const tester = new RuleTester()

tester.run("no-unused-enable", rule, {
    valid: [
        // oxlint-disable/enable pairs (no ESLint errors to worry about)
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
                    column: 1,
                    endLine: 1,
                    endColumn: 18,
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
                    column: 17,
                    endLine: 1,
                    endColumn: 25,
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
                    column: 17,
                    endLine: 3,
                    endColumn: 25,
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
                    column: 1,
                    endLine: 1,
                    endColumn: 33,
                },
            ],
        },
    ],
})
