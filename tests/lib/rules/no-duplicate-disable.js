/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { RuleTester } = require("eslint")
const rule = require("../../../lib/rules/no-duplicate-disable")
const tester = new RuleTester()

tester.run("no-duplicate-disable", rule, {
    valid: [
        `
//oxlint-disable-line
`,
        `
/*oxlint-disable-line*/
`,
        `
/*oxlint-disable no-undef*/
//oxlint-disable-line no-unused-vars
//oxlint-disable-next-line semi
/*oxlint-disable eqeqeq*/
`,
        `
/*oxlint-disable no-undef*/
/*oxlint-disable-line no-unused-vars*/
/*oxlint-disable-next-line semi*/
/*oxlint-disable eqeqeq*/
`,
    ],
    invalid: [
        {
            code: `
/*oxlint-disable no-undef*/
//oxlint-disable-line no-undef
`,
            errors: [
                {
                    message: "'no-undef' rule has been disabled already.",
                    line: 3,
                    column: 23,
                    endLine: 3,
                    endColumn: 31,
                },
            ],
        },
        {
            code: `
/*oxlint-disable no-undef*/
/*oxlint-disable-line no-undef*/
`,
            errors: [
                {
                    message: "'no-undef' rule has been disabled already.",
                    line: 3,
                    column: 23,
                    endLine: 3,
                    endColumn: 31,
                },
            ],
        },
        {
            code: `
/*oxlint-disable no-undef*/
//oxlint-disable-next-line no-undef
`,
            errors: [
                {
                    message: "'no-undef' rule has been disabled already.",
                    line: 3,
                    column: 28,
                    endLine: 3,
                    endColumn: 36,
                },
            ],
        },
        {
            code: `
/*oxlint-disable no-undef*/
/*oxlint-disable-next-line no-undef*/
`,
            errors: [
                {
                    message: "'no-undef' rule has been disabled already.",
                    line: 3,
                    column: 28,
                    endLine: 3,
                    endColumn: 36,
                },
            ],
        },
        {
            code: `
//oxlint-disable-next-line no-undef
//oxlint-disable-line no-undef
`,
            errors: [
                {
                    message: "'no-undef' rule has been disabled already.",
                    line: 3,
                    column: 23,
                    endLine: 3,
                    endColumn: 31,
                },
            ],
        },
        {
            code: `
/*oxlint-disable-next-line no-undef*/
/*oxlint-disable-line no-undef*/
`,
            errors: [
                {
                    message: "'no-undef' rule has been disabled already.",
                    line: 3,
                    column: 23,
                    endLine: 3,
                    endColumn: 31,
                },
            ],
        },
        // -- description
        {
            code: `
// oxlint-disable-next-line no-undef -- description
// oxlint-disable-line no-undef -- description
`,
            errors: [
                {
                    message:
                        "'no-undef' rule has been disabled already.",
                    line: 3,
                    column: 24,
                    endLine: 3,
                    endColumn: 32,
                },
            ],
        },
    ],
})
