/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { Linter, RuleTester } = require("eslint")

const rule = require("../../../lib/rules/no-restricted-disable")

let coreRules
try {
    coreRules = require("eslint/use-at-your-own-risk").builtinRules
} catch {
    coreRules = new Linter({ configType: "eslintrc" }).getRules()
}

let tester = null

if (typeof RuleTester.prototype.defineRule === "function") {
    // ESLint < 9
    tester = new RuleTester()
    tester.defineRule("foo/no-undef", coreRules.get("no-undef"))
    tester.defineRule("foo/no-redeclare", coreRules.get("no-redeclare"))
} else {
    // ESLint 9
    tester = new RuleTester({
        plugins: {
            foo: {
                rules: {
                    "no-undef": coreRules.get("no-undef"),
                    "no-redeclare": coreRules.get("no-redeclare"),
                },
            },
        },
    })
}

tester.run("no-restricted-disable", rule, {
    valid: [
        "/*oxlint-disable*/",
        "//oxlint-disable-line",
        "//oxlint-disable-next-line",
        "/*oxlint-disable-line*/",
        "/*oxlint-disable-next-line*/",
        {
            code: "/*oxlint-disable eqeqeq*/",
            options: ["no-unused-vars"],
        },
        {
            code: "/*oxlint-enable eqeqeq*/",
            options: ["eqeqeq"],
        },
        {
            code: "/*oxlint-disable eqeqeq*/",
            options: ["*", "!eqeqeq"],
        },
    ],
    invalid: [
        {
            code: "/*oxlint-disable eqeqeq*/",
            options: ["eqeqeq"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "/*oxlint-disable*/",
            options: ["eqeqeq"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "//oxlint-disable-line eqeqeq",
            options: ["eqeqeq"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "/*oxlint-disable-line eqeqeq*/",
            options: ["eqeqeq"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "//oxlint-disable-line",
            options: ["eqeqeq"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "/*oxlint-disable-line*/",
            options: ["eqeqeq"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "//oxlint-disable-next-line eqeqeq",
            options: ["eqeqeq"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "/*oxlint-disable-next-line eqeqeq*/",
            options: ["eqeqeq"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "//oxlint-disable-next-line",
            options: ["eqeqeq"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "/*oxlint-disable-next-line*/",
            options: ["eqeqeq"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },

        {
            code: "/*oxlint-disable eqeqeq, no-undef, no-redeclare*/",
            options: ["*", "!no-undef", "!no-redeclare"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "/*oxlint-disable*/",
            options: ["*", "!no-undef", "!no-redeclare"],
            errors: ["Disabling '*,!no-undef,!no-redeclare' is not allowed."],
        },
        {
            code: "//oxlint-disable-line eqeqeq, no-undef, no-redeclare",
            options: ["*", "!no-undef", "!no-redeclare"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "/*oxlint-disable-line eqeqeq, no-undef, no-redeclare*/",
            options: ["*", "!no-undef", "!no-redeclare"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "//oxlint-disable-line",
            options: ["*", "!no-undef", "!no-redeclare"],
            errors: ["Disabling '*,!no-undef,!no-redeclare' is not allowed."],
        },
        {
            code: "/*oxlint-disable-line*/",
            options: ["*", "!no-undef", "!no-redeclare"],
            errors: ["Disabling '*,!no-undef,!no-redeclare' is not allowed."],
        },
        {
            code: "//oxlint-disable-next-line eqeqeq, no-undef, no-redeclare",
            options: ["*", "!no-undef", "!no-redeclare"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "/*oxlint-disable-next-line eqeqeq, no-undef, no-redeclare*/",
            options: ["*", "!no-undef", "!no-redeclare"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
        {
            code: "//oxlint-disable-next-line",
            options: ["*", "!no-undef", "!no-redeclare"],
            errors: ["Disabling '*,!no-undef,!no-redeclare' is not allowed."],
        },
        {
            code: "/*oxlint-disable-next-line*/",
            options: ["*", "!no-undef", "!no-redeclare"],
            errors: ["Disabling '*,!no-undef,!no-redeclare' is not allowed."],
        },

        {
            code: "/*oxlint-disable semi, no-extra-semi, semi-style, comma-style*/",
            options: ["*semi*"],
            errors: [
                "Disabling 'semi' is not allowed.",
                "Disabling 'no-extra-semi' is not allowed.",
                "Disabling 'semi-style' is not allowed.",
            ],
        },
        {
            code: "/*oxlint-disable no-undef, no-redeclare, foo/no-undef, foo/no-redeclare*/",
            options: ["foo/*"],
            errors: [
                "Disabling 'foo/no-undef' is not allowed.",
                "Disabling 'foo/no-redeclare' is not allowed.",
            ],
        },
        // -- description
        {
            code: "/*oxlint-disable -- description*/",
            options: ["eqeqeq"],
            errors: ["Disabling 'eqeqeq' is not allowed."],
        },
    ],
})
