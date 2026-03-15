import { describe, it } from "vitest"
import { RuleTester } from "oxlint/plugins-dev"
import rule from "../../../lib/rules/disable-enable-pair.js"

RuleTester.describe = describe
RuleTester.it = it

const tester = new RuleTester()

tester.run("disable-enable-pair", rule, {
    valid: [
        `
/*oxlint-disable*/
/*oxlint-enable*/
`,
        `
/*oxlint-disable no-undef,no-unused-vars*/
/*oxlint-enable no-undef,no-unused-vars*/
`,
        `
/*oxlint-disable no-undef,no-unused-vars*/
/*oxlint-enable*/
`,
        "//oxlint-disable-line",
        "//oxlint-disable-next-line",
        "/*oxlint-disable-line*/",
        "/*oxlint-disable-next-line*/",
        `
function foo() {
    /*oxlint-disable*/
    /*oxlint-enable*/
}
`,
        `
/*oxlint-disable no-undef*/
/*oxlint-disable no-unused-vars*/
/*oxlint-enable*/
/*oxlint-enable*/
`,
        {
            code: `
console.log('This code does not even have any special comments')
`,
            options: [{ allowWholeFile: true }],
        },
        {
            code: `
/*oxlint-disable*/
`,
            options: [{ allowWholeFile: true }],
        },
        {
            code: `
/*oxlint-disable no-undef*/
/*oxlint-disable no-unused-vars*/
/*oxlint-enable*/
`,
            options: [{ allowWholeFile: true }],
        },
        {
            code: `

/**
 * @file This test case makes sure comments and blank lines
 * before "whole-file" oxlint-disable are allowed.
 */

/*oxlint-disable*/
`,
            options: [{ allowWholeFile: true }],
        },
        {
            code: `
/*oxlint-disable no-unused-vars, no-undef */
var foo = 1
`,
            options: [{ allowWholeFile: true }],
        },
        // -- description
        `
/*oxlint-disable no-undef -- description*/
/*oxlint-enable no-undef*/
`,
        `
/*oxlint-disable no-undef,no-unused-vars -- description*/
/*oxlint-enable no-undef,no-unused-vars*/
`,
    ],
    invalid: [
        {
            code: `
/*oxlint-disable*/
`,
            errors: [
                {
                    message: "Requires 'oxlint-enable' directive.",
                    line: 2,
                    column: 0,
                    endLine: 2,
                    endColumn: 18,
                },
            ],
        },
        {
            code: `
/*oxlint-disable no-undef*/
`,
            errors: [
                {
                    message:
                        "Requires 'oxlint-enable' directive for 'no-undef'.",
                    line: 2,
                    column: 17,
                    endLine: 2,
                    endColumn: 25,
                },
            ],
        },
        {
            code: `
/*oxlint-disable no-undef,no-unused-vars*/
/*oxlint-enable no-undef*/
`,
            errors: [
                {
                    message:
                        "Requires 'oxlint-enable' directive for 'no-unused-vars'.",
                    line: 2,
                    column: 26,
                    endLine: 2,
                    endColumn: 40,
                },
            ],
        },
        {
            code: `
/*oxlint-disable no-undef*/
/*oxlint-disable no-unused-vars*/
/*oxlint-enable no-unused-vars*/
`,
            errors: [
                {
                    message:
                        "Requires 'oxlint-enable' directive for 'no-undef'.",
                    line: 2,
                    column: 17,
                    endLine: 2,
                    endColumn: 25,
                },
            ],
        },
        {
            code: `
/*oxlint-disable no-undef*/
console.log();
/*oxlint-disable no-unused-vars*/
`,
            options: [{ allowWholeFile: true }],
            errors: [
                {
                    message:
                        "Requires 'oxlint-enable' directive for 'no-unused-vars'.",
                    line: 4,
                    column: 17,
                    endLine: 4,
                    endColumn: 31,
                },
            ],
        },
        {
            code: `
console.log();
/*oxlint-disable no-unused-vars*/
`,
            options: [{ allowWholeFile: true }],
            errors: [
                {
                    message:
                        "Requires 'oxlint-enable' directive for 'no-unused-vars'.",
                    line: 3,
                    column: 17,
                    endLine: 3,
                    endColumn: 31,
                },
            ],
        },
        {
            code: `
{
/*oxlint-disable no-unused-vars*/
}
`,
            options: [{ allowWholeFile: true }],
            errors: [
                {
                    message:
                        "Requires 'oxlint-enable' directive for 'no-unused-vars'.",
                    line: 3,
                    column: 17,
                    endLine: 3,
                    endColumn: 31,
                },
            ],
        },
        // -- description
        {
            code: `
{
/*oxlint-disable no-unused-vars -- description */
}
`,
            options: [{ allowWholeFile: true }],
            errors: [
                {
                    message:
                        "Requires 'oxlint-enable' directive for 'no-unused-vars'.",
                    line: 3,
                    column: 17,
                    endLine: 3,
                    endColumn: 31,
                },
            ],
        },
    ],
})
