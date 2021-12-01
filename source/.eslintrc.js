module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'overrides': [
    {
      'files': ['source/docs/*'], // Or *.test.js
      'rules': {
        'require-jsdoc': 'off',
      }
    }
  ],
  'rules': {
  },
};
