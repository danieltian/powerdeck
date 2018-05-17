module.exports = {
  extends: 'eslint:recommended',
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  },

  rules: {
    semi: ['error', 'never']
  }
}
