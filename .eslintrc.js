module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'object-curly-newline': [
      'warn',
      {
        multiline: true,
        minProperties: 5,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-tabs': 'off',
    'operator-linebreak': ['error', 'after'],
    'react/jsx-indent': ['warn', 2],
    'jsx-quotes': ['error', 'prefer-single'],
    'linebreak-style': ['error', 'unix'],
    'react/style-prop-object': [
      'warn',
      {
        allow: ['Map'],
      },
    ],
    'react/require-default-props': 'warn',
  },
};
