'use strict'

const autoprefixer = require('autoprefixer')

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
  },
  urlLoader: {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'static/img/[name].[hash:8].[ext]'
    }
  },
  cssLoader: {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  },
  postcssLoader: {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
      plugins: () => [
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9' // React doesn't support IE8 anyway
          ]
        })
      ]
    }
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
