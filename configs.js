"use strict"

const { rules: rulesRecommended } = require("./lib/configs/recommended")
const rules = require("./lib/rules")
const { name, version } = require("./package.json")

const plugin = {
    meta: { name, version },
    rules,
}

const recommended = {
    name: "oxlint-comments/recommended",
    plugins: {
        "oxlint-comments": plugin,
    },
    rules: rulesRecommended,
}

module.exports = {
    recommended,
}

module.exports.default = module.exports
