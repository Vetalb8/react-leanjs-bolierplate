'use strict'

module.exports = {
  esLint: [
    {
      options: {
        useEslintrc: true
      },
      loader: 'eslint-loader'
    }
  ],
  fileLoader: {
    exclude: [
      /\.html$/,
      /\.(js|jsx)$/,
      /\.css$/,
      /\.json$/,
      /\.bmp$/,
      /\.gif$/,
      /\.jpe?g$/,
      /\.png$/
    ],
    loader: 'file-loader',
    options: {
      name: 'static/[name].[hash:8].[ext]'
    }
  }
}
