module.exports = {
  parser: 'babel-eslint',
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: [
    'html',
    'babel'
  ],
  env: {
    node: true,
    browser: true,
    es6: true
  },
  rules: {
    indent: ['error', 4],
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'generator-star-spacing': 0,
    'no-new-func' : 0,
    'no-unused-vars': ['off'],
    'no-extend-native': ['error', {
      'exceptions': ['Object', 'Date', 'String', 'Array', 'Function']
    }],
    'no-unneeded-ternary': ['error', {
      'defaultAssignment': false
    }],
    'arrow-parens': 0,
    'new-cap': 0,
    'babel/generator-star-spacing': 1,
    'babel/new-cap': 1,
    'babel/array-bracket-spacing': 1,
    'babel/object-curly-spacing': 0,
    'babel/object-shorthand': 1,
    'babel/arrow-parens': 0,
    'babel/no-await-in-loop': 1,
    'babel/flow-object-type': 1,
    'babel/func-params-comma-dangle': 1,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}