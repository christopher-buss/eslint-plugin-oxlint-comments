import { createRequire } from "node:module"
import rules from "./lib/rules.js"

const require = createRequire(import.meta.url)
const { name, version } = require("./package.json")

const plugin = {
    meta: { name, version },
    rules,
}

export default plugin
