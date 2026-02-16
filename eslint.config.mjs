import js from "@eslint/js";
import globals from "globals";
import html from "eslint-plugin-html";

export default [
    js.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "script",
            globals: {
                ...globals.browser,
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "semi": ["error", "always"],
            "no-console": "warn",
            "eqeqeq": "error",
            "curly": "error",
            "no-var": "error",
            "prefer-const": "error",
            "no-multiple-empty-lines": ["error", { "max": 1 }],
            "no-trailing-spaces": "error",
            "indent": ["error", 4],
            "quotes": ["error", "single", { "avoidEscape": true }],
        }
    },
    {
        files: ["**/*.html"],
        plugins: { html }
    }
];
