import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    // Ignore patterns
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**', '.next/**', 'coverage/**', '*.config.js', '*.config.mjs', '*.config.ts'],
    },

    // Base config for all files
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx}'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
            },
            globals: {
                // common node globals
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
                global: 'readonly',

                // DOM globals manually added 👇
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                HTMLInputElement: 'readonly',
                HTMLTextAreaElement: 'readonly',
                HTMLElement: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
                fetch: 'readonly',

                alert: 'readonly',
                confirm: 'readonly',
                performance: 'readonly',
                PerformanceNavigationTiming: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
            prettier,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...typescript.configs.recommended.rules,
            ...prettierConfig.rules,

            '@typescript-eslint/no-namespace': 'off',

            'prettier/prettier': [
                'error',
                {
                    tabWidth: 4,
                    semi: true,
                    singleQuote: true,
                    trailingComma: 'es5',
                    printWidth: 150,
                    useTabs: false,
                },
            ],
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            indent: ['error', 4, { SwitchCase: 1 }],
            '@typescript-eslint/indent': 'off',
        },
    },

    // Frontend specific (optional)
    {
        files: ['frontend/**/*.{ts,tsx,js,jsx}'],
        rules: {
            'react/react-in-jsx-scope': 'off',
        },
    },

    // Backend specific
    {
        files: ['backend/**/*.{ts,js}'],
        languageOptions: {
            globals: {
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
            },
        },
        rules: {
            'no-console': 'off',
        },
    },
];
