import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    rules: {
      'style/brace-style': ['error', '1tbs'],
      'style/arrow-parens': ['error', 'always'],
      'curly': ['error', 'all'],
      'antfu/consistent-list-newline': 'off',
      'ts/consistent-type-definitions': 'off',
      'no-undef': 'off',
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: 1,
      }],
    },
  },
  {
    ignores: ['.github/**', 'packages/db/migrations/**'],
  },
)
