/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const semver = require("semver")
const { Linter, RuleTester } = require("eslint")
const rule = require("../../../lib/rules/require-description")
const tester = new RuleTester()

if (!semver.satisfies(Linter.version, ">=7.0.0")) {
    // This rule can only be used with ESLint v7.x or later.
    return
}

tester.run("require-description", rule, {
    valid: [
        "/* oxlint-disable -- description */",
        "/* oxlint-enable -- description */",
        "/* just oxlint in a normal comment */",
        "/* oxlint is great */",
        "// oxlint",
        "// oxlint-disable-line -- description",
        "// oxlint-disable-next-line -- description",
        "/* oxlint-disable-line -- description */",
        "/* oxlint-disable-next-line -- description */",
        "// oxlint-disable-line eqeqeq -- description",
        "// oxlint-disable-next-line eqeqeq -- description",
        {
            code: "/* oxlint-enable */",
            options: [{ ignore: ["oxlint-enable"] }],
        },
        {
            code: "/* oxlint-disable */",
            options: [{ ignore: ["oxlint-disable"] }],
        },
        {
            code: "// oxlint-disable-line",
            options: [{ ignore: ["oxlint-disable-line"] }],
        },
        {
            code: "// oxlint-disable-next-line",
            options: [{ ignore: ["oxlint-disable-next-line"] }],
        },
        {
            code: "/* oxlint-disable-line */",
            options: [{ ignore: ["oxlint-disable-line"] }],
        },
        {
            code: "/* oxlint-disable-next-line */",
            options: [{ ignore: ["oxlint-disable-next-line"] }],
        },
    ],
    invalid: [
        {
            code: "/* oxlint-enable */",
            errors: [
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
            ],
        },
        {
            code: "/* oxlint-enable eqeqeq */",
            errors: [
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
            ],
        },
        {
            code: "/* oxlint-disable */",
            errors: [
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
            ],
        },
        {
            code: "/* oxlint-disable eqeqeq */",
            errors: [
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
            ],
        },
        {
            code: "// oxlint-disable-line",
            errors: [
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
            ],
        },
        {
            code: "// oxlint-disable-line eqeqeq",
            errors: [
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
            ],
        },
        {
            code: "// oxlint-disable-next-line",
            errors: [
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
            ],
        },
        {
            code: "// oxlint-disable-next-line eqeqeq",
            errors: [
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
            ],
        },
        {
            code: "/* oxlint-disable-line */",
            errors: [
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
            ],
        },
        {
            code: "/* oxlint-disable-line eqeqeq */",
            errors: [
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
            ],
        },
        {
            code: "/* oxlint-disable-next-line */",
            errors: [
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
            ],
        },
        {
            code: "/* oxlint-disable-next-line eqeqeq */",
            errors: [
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
            ],
        },
        // empty description
        {
            code: "/* oxlint-disable-next-line eqeqeq -- */",
            errors: [
                "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
            ],
        },
    ],
})
