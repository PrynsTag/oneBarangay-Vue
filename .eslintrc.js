module.exports = {
  env: {
    node: true,
  },
  extends: [
    "@vue/typescript/recommended",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
  ],
  globals: {
    workbox: "readonly",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
  },
  plugins: [
    "@typescript-eslint",
    "unused-imports"
  ],
  root: true,
  rules: {
    "prefer-template": "error",
    "no-useless-concat": "error",
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "object-curly-spacing": ["error", "always"],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    curly: "error",
    "vue/html-indent": ["error", 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: false,
      ignores: [],
    }],
      "@typescript-eslint/quotes": [
        "error",
        "double",
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        "extendDefaults": true,
        "types": {
          "{}": false
        }
      }
    ]
    },
};
