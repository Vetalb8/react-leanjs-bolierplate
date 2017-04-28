'use strict'

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils-academy/InterpolateHtmlPlugin')
const CompressionPlugin = require('compression-webpack-plugin')
const paths = require('./paths')
const common = require('./webpack.common')

const publicPath = paths.servedPath
const shouldUseRelativeAssetPaths = publicPath === './'

if (process.env.NODE_ENV !== 'production') {
  throw new Error('Production builds must have NODE_ENV=production.')
}

// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css'

// ExtractTextPlugin expects the build output to be flat.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {}

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: {
    vendor: [paths.appVendorJs]
  },
  output: {
    path: paths.appBuildVendor,
    filename: '[name].js',
    chunkFilename: '[name].js',
    library: '[name]',
    publicPath
  },
  resolve: {
    modules: [paths.appVendorJs, 'node_modules', paths.appNodeModules],
    extensions: ['.js']
  },
  resolveLoader: {
    modules: [paths.appNodeModules]
  },
  module: {
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      // First, run the linter.
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: common.esLint,
        include: paths.appVendorJs
      },
      common.fileLoader,
      common.urlLoader,
      {
        test: /\.(js|jsx)$/,
        include: paths.appVendorJs,
        loader: 'babel-loader',
        exclude: [/\.test\.jsx?$/, /\.story\.(js|jsx)$/],
        options: {
          babelrc: true
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: 'style-loader',
              use: [common.cssLoader, common.postcssLoader]
            },
            extractTextPluginOptions
          )
        )
      }
      // ** STOP ** Are you adding a new loader?
      // Remember to add the new extension(s) to the "url" loader exclusion list.
    ]
  },
  plugins: [
    new InterpolateHtmlPlugin(process.env.NODE_ENV),

    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin(common.uglifyJSconfig),

    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      moveToParents: true
    }),

    new webpack.DllPlugin({
      path: paths.appManifestVendor,
      name: '[name]',
      context: paths.appVendor
    }),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  node: common.node,
  profile: true
}
