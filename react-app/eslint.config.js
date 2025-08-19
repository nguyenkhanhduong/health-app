import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginImportSort from 'eslint-plugin-simple-import-sort'
import pluginImportAbsolute from 'eslint-plugin-no-relative-import-paths'
import pluginPreferArrow from 'eslint-plugin-prefer-arrow'
import pluginImport from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import pluginTs from '@typescript-eslint/eslint-plugin'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import { globalIgnores } from 'eslint/config'
const off = 0
const warn = 1
const repoRoot = import.meta.dirname
export default tseslint.config([
  globalIgnores(['dist', '**/node_modules', './src/shadcn']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintPluginReact.configs.flat.recommended,
      eslintPluginReact.configs.flat['jsx-runtime'],
      eslintPluginReactHooks.configs['recommended-latest'],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: repoRoot,
      },
    },

    plugins: {
      'react-refresh': eslintPluginReactRefresh,
      import: pluginImport,
      'simple-import-sort': pluginImportSort,
      'no-relative-import-paths': pluginImportAbsolute,
      'prefer-arrow': pluginPreferArrow,
      unicorn: pluginUnicorn,
      react: pluginReact,
      '@typescript-eslint': pluginTs,
      'unused-imports': pluginUnusedImports,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,
      // common
      'no-return-assign': warn,
      'no-func-assign': warn,
      'no-class-assign': warn,
      // 'no-console': warn,
      'import/no-mutable-exports': warn,
      '@typescript-eslint/no-unnecessary-condition': warn,
      'react-hooks/rules-of-hooks': warn,
      'react-hooks/exhaustive-deps': warn,

      // compatible with typescript
      'no-unused-vars': off,
      '@typescript-eslint/no-unused-vars': [warn, { args: 'none' }],
      'no-shadow': off,
      '@typescript-eslint/no-shadow': warn,
      'unused-imports/no-unused-imports': warn,
      'unused-imports/no-unused-vars': [
        warn,
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      // must use arrow functions
      'prefer-arrow/prefer-arrow-functions': [
        off,
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: true,
        },
      ],
      'prefer-arrow-callback': [warn, { allowNamedFunctions: true }],
      'func-style': [warn, 'expression', { allowArrowFunctions: true }],

      // file name convention
      'unicorn/filename-case': [
        warn,
        {
          case: 'kebabCase',
        },
      ],

      // restrict export default

      curly: [warn, 'all'],
      quotes: [warn, 'single', { avoidEscape: true }],
      semi: [warn, 'never'],
      'arrow-body-style': [warn, 'as-needed'],
      'no-useless-rename': warn,
      'object-shorthand': [warn, 'always'],
      'one-var': [warn, 'never'],
      'prefer-const': warn,
      'react/jsx-no-useless-fragment': warn,
      'spaced-comment': [warn, 'always', { markers: ['/'] }],

      // import
      'import/first': warn,
      'import/newline-after-import': warn,
      'import/no-duplicates': warn,
      'import/no-extraneous-dependencies': warn,
      // 'import/enforce-node-protocol-usage': warn, // TODO: not released yet

      // import sort
      'sort-imports': off,
      'import/order': off,
      'simple-import-sort/imports': [
        warn,
        {
          groups: [
            ['^\\u0000'],
            ['^@?\\w'],
            ['\\.(s?css|svg|png|jpe?g|gif)$'],
            ['^[^.]'],
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': warn,

      // import type { ... } from
      '@typescript-eslint/consistent-type-imports': warn,
      '@typescript-eslint/no-import-type-side-effects': warn,
      'import/consistent-type-specifier-style': [warn, 'prefer-top-level'],

      'import/no-useless-path-segments': [
        warn,
        {
          noUselessIndex: true,
        },
      ],
      'no-relative-import-paths/no-relative-import-paths': [
        warn,
        {
          allowSameFolder: false,
          rootDir: './src',
          prefix: '@',
        },
      ],
    },
  },
])
