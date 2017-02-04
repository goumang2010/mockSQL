'use strict'

const path = require('path')
const pkg = require('./app/package.json')
const settings = require('./config.js')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const eslintFriendlyFormatter = require('eslint-friendly-formatter')

let config = {
  devtool: '#eval-source-map',
  entry: {
    build: path.join(__dirname, 'app/src/main.js')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader'})
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          autoprefixer: {
            browsers: ['last 2 Chrome versions']
          },
          loaders: {
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'imgs/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      { test: /\.md$/, 
        loader: "html-loader!markdown-loader" 
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: 'styles.css'}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/main.ejs',
      title: settings.name
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.DEV_TARGET': '"${process.env.DEV_TARGET}"'
    })
  ],
  output: {
    filename: '[name].js',
    path: process.env.DEV_TARGET === 'web' ? path.join(__dirname, 'builds/web') : path.join(__dirname, 'app/dist')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'components': path.join(__dirname, 'app/src/components'),
      'src': path.join(__dirname, 'app/src'),
      'store': path.join(__dirname, 'app/src/vuex/store.js'),
      'readme': path.join(__dirname, './README.md')
    },
    extensions: ['.js', '.vue', '.json', '.css'],
    modules: [
      path.join(__dirname, 'app/node_modules'),
      path.join(__dirname, 'node_modules')
    ]
  },
  target: process.env.DEV_TARGET === 'web' ? 'web' : 'electron-renderer'
}

if (process.env.NODE_ENV !== 'production') {
  /**
   * Apply ESLint
   */
  if (settings.eslint) {
    config.module.rules.push(
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: "pre",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        enforce: "pre",
        loader: 'eslint-loader'
      }
    )
  }
}

/**
 * Adjust config for production settings
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = ''

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  )
}

module.exports = config
