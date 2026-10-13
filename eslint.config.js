import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  {
    name: 'app/server-functions',
    files: ['netlify/functions/**/*.js', 'netlify/edge-functions/**/*.js'],
    languageOptions: { globals: { ...globals.node } },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    name: 'app/no-console',
    files: ['src/**/*.{vue,js}'],
    ignores: ['**/*.test.js'],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },

  {
    name: 'app/head-through-use-seo',
    files: ['src/views/**/*.vue', 'src/components/**/*.vue'],
    rules: {
      'no-restricted-imports': [
        'error',
        { paths: [{ name: '@unhead/vue', message: 'Set the page head with useSeo.' }] },
      ],
    },
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,
])
