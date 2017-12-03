const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'www');
const APP_DIR = path.resolve(__dirname, 'src');
const BUNDLE_PATH = 'static/bundle.js';

let plugins = [
  new ExtractTextPlugin('res/bundle.css')
];

if (process.env.NODE_ENV === 'production')
{
  plugins = plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new UglifyJsPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessorOptions: { discardComments: { removeAll: true } },
    })
  ]);
}

module.exports = {
  entry: path.resolve(APP_DIR, 'index.tsx'),
  output: {
    path: BUILD_DIR,
    filename: BUNDLE_PATH,
  },
  module: {
    loaders: [{
      test : /\.tsx?$/,
      include : APP_DIR,
      loader : 'ts-loader',
    }, {
      test : /\.less$/,
      loader : ExtractTextPlugin.extract('css-loader!less-loader'),
    }, {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    }],
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.gql', '.graphql', '.less', '.json'],
  },
  plugins,
};
