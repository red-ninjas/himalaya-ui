module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint-config-ts-lambdas',
    'eslint-config-ts-lambdas/react',
    'prettier',
    'next',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx', '.eslintrc.js'],
  rules: {
    indent: 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'react/prop-types': 1,
    '@typescript-eslint/no-duplicate-enum-values': 0,
    'react/jsx-curly-brace-presence': 0,
    'react-hooks/rules-of-hooks': 1,
    '@typescript-eslint/no-explicit-any': 1,
    'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
  },
};
