const { fileHeader, formattedVariables } = require('style-dictionary/lib/common/formatHelpers/index.js');

module.exports = {
  source: ['tokens/**/*.json'],
  format: {
    'custom-css-variables': function ({ dictionary, options = {}, file }) {
      const selector = options.selector ? options.selector : ':root'
      const { outputReferences } = options
      return fileHeader({ file }) +
        `${selector} {\n` +
        formattedVariables({ format: 'css', dictionary, outputReferences }) +
        '\n}\n'
    }
  },
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/',
      prefix: 'tfl-',
      files: [{
        destination: 'css/variables.css',
        format: 'custom-css-variables',
        options: {
          outputReferences: true
        }
      }]
    }
  }
}
