import { describe, it } from "vitest"
import { RuleTester } from "oxlint/plugins-dev"
import rule from "../../../lib/rules/no-duplicate-disable.js"

RuleTester.describe = describe
RuleTester.it = it

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
                    column: 22,
                    endLine: 3,
                    endColumn: 30,
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
                    column: 22,
                    endLine: 3,
                    endColumn: 30,
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
                    column: 27,
                    endLine: 3,
                    endColumn: 35,
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
                    column: 27,
                    endLine: 3,
                    endColumn: 35,
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
                    column: 22,
                    endLine: 3,
                    endColumn: 30,
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
                    column: 22,
                    endLine: 3,
                    endColumn: 30,
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
                    column: 23,
                    endLine: 3,
                    endColumn: 31,
                },
            ],
        },
    ],
})
