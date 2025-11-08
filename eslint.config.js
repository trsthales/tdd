// Flat ESLint v9 configuration for a strict TypeScript + Vitest + fast-check TDD environment
// Uses @typescript-eslint parser & plugin for proper type-aware linting.
// Rationale inline to reinforce learning of clean code & TDD feedback loops.
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    files: ["**/*.ts"],
    ignores: [
      "dist/**",
      "stryker-tmp/**",
      "reports/**"
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          modules: true
        }
      },
      globals: {
        ...globals.node,
        // Vitest globals so tests don't require explicit imports everywhere
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly"
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      // Add additional plugins here if later needed (import, unused-imports etc.)
    },
    rules: {
      // Prefer TypeScript-friendly unused vars rule with ignore for leading underscore (intentional discard)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true }
      ],
      // Explicit member accessibility clarifies intent except for public in class fields (TS defaults)
      '@typescript-eslint/explicit-member-accessibility': ['off'],
      // Encourage consistent type imports to avoid runtime side effects
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      // Discourage misusing any & promote strict typing
      '@typescript-eslint/no-explicit-any': 'warn',
      // Allow dev-time console during exploration, but surface as warnings for production mindfulness
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
      // Keep cyclomatic complexity modest—can tighten later if desired
      'complexity': ['warn', 10],
      // Enforce early returns and guard clauses style (via max-depth)
      'max-depth': ['warn', 4],
      // Avoid deeply nested callbacks which obscure TDD intent
      'max-nested-callbacks': ['warn', 3],
      // Small functions promote focus in tests
      'max-lines-per-function': ['warn', { max: 75, skipComments: true, skipBlankLines: true }],
      // Maintain readability by preventing huge files (exercise to refactor if breached)
      'max-lines': ['warn', { max: 400, skipComments: true, skipBlankLines: true }],
      // Consistent ordering of imports improves diff clarity
      'sort-imports': [
        'warn',
        {
          ignoreDeclarationSort: true,
          ignoreCase: false,
          allowSeparatedGroups: true
        }
      ],
      // Style / clarity adjustments complementary to Prettier (ensure no conflicts)
      'curly': ['warn', 'all'],
      'eqeqeq': ['error', 'smart'],
      'prefer-const': 'warn',
      'object-shorthand': ['warn', 'always'],
      'arrow-body-style': ['warn', 'as-needed'],
    }
  },
  // Separate config for test files if we want relaxed rules later
  {
    files: ["**/*.test.ts"],
    rules: {
      // Allow any in tests for quick prototyping of stubs/mocks
      '@typescript-eslint/no-explicit-any': 'off',
      // Permit larger functions in property-based test generators
      'max-lines-per-function': ['warn', { max: 120, skipComments: true, skipBlankLines: true }],
      // Console output occasionally helpful while learning PBT
      'no-console': 'off',
      // Tests often nest callbacks via describe/it/property arbitraries
      'max-nested-callbacks': 'off',
      // Ignore unused vars in tests (we want to show bad examples too)
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
];