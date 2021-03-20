// https://prettier.io/docs/en/options.html
module.exports = {
  trailingComma: 'es5',
  bracketSpacing: true,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  arrowParens: 'always',
  printWidth: 300,
  overrides: [
    {
      files: 'Routes.js',
      options: {
        printWidth: 200,
      },
    },
  ],
}
