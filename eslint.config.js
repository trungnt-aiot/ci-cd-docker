import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
    // Ignore patterns
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
            '.next/**',
            'coverage/**',
            '*.config.js',
            '*.config.mjs',
            '*.config.ts',
        ],
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
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'readonly',
                global: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
            prettier: prettier,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...typescript.configs.recommended,
            ...prettierConfig.rules,
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
            '@typescript-eslint/indent': 'off', // Tắt để tránh conflict với prettier
        },
    },

    // Frontend specific config
    {
        files: ['frontend/**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            globals: {
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
                fetch: 'readonly',
            },
        },
        rules: {
            // Frontend specific rules
            'react/react-in-jsx-scope': 'off', // Not needed in Next.js 13+
        },
    },

    // Backend specific config
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
            // Backend specific rules
            'no-console': 'off', // Allow console in backend
        },
    },
];
