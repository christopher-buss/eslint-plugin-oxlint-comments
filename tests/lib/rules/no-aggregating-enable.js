/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { RuleTester } = require("eslint")
const rule = require("../../../lib/rules/no-aggregating-enable")
const tester = new RuleTester()

tester.run("no-aggregating-enable", rule, {
    valid: [
        `
            /*oxlint-disable no-redeclare*/
            /*oxlint-enable no-redeclare*/
        `,
        `
            /*oxlint-disable no-redeclare*/
            /*oxlint-enable no-shadow*/
        `,
        `
            /*oxlint-disable no-redeclare, no-shadow*/
            /*oxlint-enable*/
        `,
        `
            /*oxlint-disable no-redeclare, no-shadow*/
            /*oxlint-enable no-redeclare, no-shadow*/
        `,
        `
            /*oxlint-disable no-redeclare, no-shadow*/
            /*oxlint-enable no-redeclare*/
            /*oxlint-enable no-shadow*/
        `,
    ],
    invalid: [
        {
            code: `
                /*oxlint-disable no-redeclare*/
                /*oxlint-disable no-shadow*/
                /*oxlint-enable*/
            `,
            errors: [
                "This `oxlint-enable` comment affects 2 `oxlint-disable` comments. An `oxlint-enable` comment should be for an `oxlint-disable` comment.",
            ],
        },
        {
            code: `
                /*oxlint-disable no-redeclare*/
                /*oxlint-disable no-shadow*/
                /*oxlint-disable no-undef*/
                /*oxlint-enable*/
            `,
            errors: [
                "This `oxlint-enable` comment affects 3 `oxlint-disable` comments. An `oxlint-enable` comment should be for an `oxlint-disable` comment.",
            ],
        },
        {
            code: `
                /*oxlint-disable no-redeclare*/
                /*oxlint-disable no-shadow*/
                /*oxlint-enable no-redeclare, no-shadow*/
            `,
            errors: [
                "This `oxlint-enable` comment affects 2 `oxlint-disable` comments. An `oxlint-enable` comment should be for an `oxlint-disable` comment.",
            ],
        },
        // -- description
        {
            code: `
                /*oxlint-disable no-redeclare*/
                /*oxlint-disable no-shadow*/
                /*oxlint-enable -- description*/
            `,
            errors: [
                "This `oxlint-enable` comment affects 2 `oxlint-disable` comments. An `oxlint-enable` comment should be for an `oxlint-disable` comment.",
            ],
        },
    ],
})
