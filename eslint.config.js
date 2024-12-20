import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import globals from "globals";
import pluginJs from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import cspellPlugin from "@cspell/eslint-plugin";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default typescriptEslint.config({
  files: ["**/*.{js,mjs,cjs,ts}"],
  languageOptions: {
    globals: {
      ...globals.node,
    },
    parser: tsParser,
    ecmaVersion: 2020,
    parserOptions: {
      project: "tsconfig.json",
      tsconfigRootDir: __dirname,
      sourceType: "module",
    },
  },
  settings: {
    node: {
      allow: ["process", "Buffer"],
    },
  },
  ignores: [
    "dist",
    "node_modules",
    "eslint.config.js",
    "vitest.config.ts",
    "commitlint.config.ts",
    "*.mjs",
    ".husky",
  ],
  plugins: {
    import: importPlugin,
    "@cspell": cspellPlugin,
  },
  extends: [pluginJs.configs.recommended, ...typescriptEslint.configs.recommended],
  rules: {
    "no-duplicate-imports": "error",
    "sort-imports": [
      "warn",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: undefined,
        allowSeparatedGroups: false,
      },
    ],
    "import/order": [
      "error",
      {
        groups: [["builtin", "external", "internal", "parent", "sibling"], ["type"]],
      },
    ],
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/ban-tslint-comment": "error",
    "@typescript-eslint/class-literal-property-style": "error",
    "@typescript-eslint/consistent-generic-constructors": "error",
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-member-accessibility": "error",
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/no-duplicate-type-constituents": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "@typescript-eslint/no-extraneous-class": "off",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/prefer-readonly": "error",
    "no-return-await": "off",
    "@typescript-eslint/return-await": "error",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unbound-method": ["off", { "ignore-static": true }],
    "@typescript-eslint/unbound-method": ["off"],
    "@typescript-eslint/no-floating-promises": "off",
    eqeqeq: ["error", "always"],
    "no-console": "error",
    "@typescript-eslint/unified-signatures": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        format: ["camelCase"],
      },
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "parameter",
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "memberLike",
        modifiers: ["private"],
        format: ["camelCase", "UPPER_CASE", "snake_case"],
        leadingUnderscore: "allow",
      },
      {
        selector: "memberLike",
        modifiers: ["public"],
        format: ["camelCase", "UPPER_CASE", "snake_case"],
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: "enumMember",
        format: ["UPPER_CASE"],
      },
      {
        selector: "objectLiteralMethod",
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: "objectLiteralProperty",
        format: ["camelCase", "UPPER_CASE", "PascalCase", "snake_case"],
        leadingUnderscore: "allow",
      },
      {
        selector: "typeProperty",
        format: ["camelCase", "UPPER_CASE", "snake_case"],
        leadingUnderscore: "allow",
      },
    ],

    "@cspell/spellchecker": [
      "warn",
      {
        autoFix: true,
        numSuggestions: 5,
        generateSuggestions: true,
        checkComments: true,
        checkIdentifiers: true,
        checkStrings: true,
        checkStringTemplates: true,
        cspell: {
          import: ["./cspell.json"],
        },
        cspellOptionsRoot: import.meta.url,
      },
    ],
  },
});

