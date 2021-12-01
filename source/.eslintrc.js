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
      'files': ['source/docs/*', 'source/docs/scripts/linenumber.js', 'scripts/prettify/lang-css.js', 'source/docs/scripts/prettify/prettify.js',], // Or *.test.js
      'rules': {
        'require-jsdoc': 'off',
      },
    },
  ],
  'rules': {
  },
};
