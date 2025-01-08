import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Boas práticas gerais
      'no-console': 'warn', // Permite console, mas exibe aviso
      'no-debugger': 'warn',
      'eqeqeq': ['error', 'always'], // Exige uso de === e !==
      'curly': 'error', // Exige o uso de chaves para if/else
      'no-unused-vars': 'off', // Desativado para TypeScript (usamos @typescript-eslint/no-unused-vars)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Permite args não usados começando com "_"

      // TypeScript
      '@typescript-eslint/no-empty-interface': 'warn', // Evita interfaces vazias
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Não exige tipos explícitos em todas as funções exportadas

      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
