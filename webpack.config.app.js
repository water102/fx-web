const webpack = require('webpack');
const merge = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackCommon = require('./webpack.common');

module.exports = () => {
  var entry = {
    index: './index.js'
  };

  var plugins = [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin({
      // Options...
    })
  ];

  return merge.smart(webpackCommon.getBaseConfig(), {
    entry,
    plugins
  });
};
