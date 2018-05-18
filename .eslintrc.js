module.exports = {
  extends: 'plugin:vue/recommended',

  rules: {
    // Don't allow semi-colons: https://eslint.org/docs/rules/semi
    'semi': ['error', 'never'],
    // Don't allow spaces between array bracket and first/last items: https://eslint.org/docs/rules/array-bracket-spacing
    'array-bracket-spacing': ['error', 'never'],
    // Don't allow space between function and parameters: https://eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': ['error', { named: 'never' }],
    // Always require a space between { and }: https://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': ['error', 'always'],
    // Require spaces after commas for parameters: https://eslint.org/docs/rules/comma-spacing
    'comma-spacing': ['error', { after: true }],
    // Require parenthesis around arrow function parameters: https://eslint.org/docs/rules/arrow-parens
    'arrow-parens': ['error', 'always'],
    // Require spaces around the arrow part of the arrow function: https://eslint.org/docs/rules/arrow-spacing
    'arrow-spacing': ['error', { before: true, after: true }]
  }
}
