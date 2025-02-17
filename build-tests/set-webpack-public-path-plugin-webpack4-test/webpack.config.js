'use strict';

const { SetPublicPathPlugin } = require('@rushstack/set-webpack-public-path-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleMinifierPlugin, WorkerPoolMinifier } = require('@rushstack/webpack4-module-minifier-plugin');

function generateConfiguration(mode, outputFolderName) {
  return {
    mode: mode,
    entry: {
      'test-bundle': `${__dirname}/lib/index.js`
    },
    output: {
      path: `${__dirname}/${outputFolderName}`,
      filename: '[name]_[contenthash].js',
      chunkFilename: '[id].[name]_[contenthash].js'
    },
    plugins: [
      new SetPublicPathPlugin({
        scriptName: {
          useAssetName: true
        }
      }),
      new HtmlWebpackPlugin()
    ],
    optimization: {
      minimizer: [
        new ModuleMinifierPlugin({
          minifier: new WorkerPoolMinifier(),
          useSourceMap: true
        })
      ]
    }
  };
}

module.exports = [
  generateConfiguration('development', 'dist-dev'),
  generateConfiguration('production', 'dist-prod')
];
