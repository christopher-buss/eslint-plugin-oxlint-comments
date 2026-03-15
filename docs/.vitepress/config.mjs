import { defineConfig } from "vitepress"
import path from "path"
import { fileURLToPath } from "url"
import { vitePluginGetLinter, viteCommonjs } from "./vite-plugin.mjs"
import eslint4b from "vite-plugin-eslint4b"
import { createRequire } from "module"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

const { withCategories } = require("../../scripts/lib/rules")
require("../../scripts/update-docs-headers")
require("../../scripts/update-docs-index")

export default defineConfig({
    title: "oxlint-plugin-oxlint-comments",
    base: "/oxlint-plugin-oxlint-comments/",
    description: "Rules for oxlint directive comments.",
    head: [["link", { rel: "icon", href: "/favicon.png" }]],

    outDir: path.resolve(__dirname, "./dist/oxlint-plugin-oxlint-comments"),
    vite: {
        publicDir: path.resolve(__dirname, "./public"),
        plugins: [eslint4b(), vitePluginGetLinter(), viteCommonjs()],
        define: {
            MONACO_EDITOR_VERSION: JSON.stringify(
                require("monaco-editor/package.json").version
            ),
        },
    },

    lastUpdated: true,
    themeConfig: {
        search: {
            provider: "local",
            options: {
                detailedView: true,
            },
        },
        editLink: {
            pattern:
                "https://github.com/christopher-buss/eslint-plugin-oxlint-comments/edit/main/docs/:path",
        },
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/christopher-buss/eslint-plugin-oxlint-comments",
            },
        ],

        nav: [
            { text: "Guide", link: "/" },
            { text: "Rules", link: "/rules/" },
        ],

        sidebar: [
            {
                items: [
                    { text: "Guide", link: "/" },
                    { text: "Available Rules", link: "/rules/" },
                ],
            },
            ...withCategories.map(({ category, rules }) => ({
                text: `Rules in ${category}`,
                collapsable: false,
                items: rules.map((rule) => ({
                    text: `oxlint-comments/${rule.name}`,
                    link: `/rules/${rule.name}`,
                })),
            })),
        ],
    },
})
