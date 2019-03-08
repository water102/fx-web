const path = require('path');

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var exports = module.exports = {};

var PATHS = exports.PATHS = {
  app: path.resolve('./app'),
  libs: path.resolve('./libs'),
  assets: path.resolve('./assets'),
  dist: path.resolve('./dist'),
  bundle: path.resolve('./dist/bundle'),

  node_modules: path.resolve('./node_modules')
};

exports.PATHS = PATHS;

exports.getBaseConfig = () => {
  var resolve = {
    modules: [
      PATHS.app,
      PATHS.libs,
      PATHS.assets,
      PATHS.node_modules
    ],
    extensions: [
      '.html', '.htm', '.sass', '.scss', '.less', '.css', '.js', '.jsx', '.json'
    ],
    alias: {
      'jquery-ui': 'jquery-ui-dist/jquery-ui.js'
    }
  };

  var output = {
    path: PATHS.bundle,
    filename: '[name].js?v=[hash]',
    chunkFilename: '[id].js?v=[chunkhash]',
    publicPath: '/bundle/'
  };

  var rules = [{
    test: /\.html?$/,
    use: [{
      loader: 'html-loader?exportAsEs6Default',
      options: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [
          [/#/, /(?:)/],
          [/\*/, /(?:)/],
          [/\[?\(?/, /(?:)/]
        ],
        customAttrAssign: [/\)?\]?=/]
      }
    }]
  },
  {
    test: /\.jsx?$/i,
    exclude: /(node_modules|bower_components|bin)/i,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.css$/,
    use: [
      'to-string-loader',
      MiniCssExtractPlugin.loader,
      {
        // translates CSS into CommonJS modules
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        // Run post css actions
        loader: 'postcss-loader',
        options: {
          // post css plugins, can be exported to postcss.config.js
          plugins: function () {
            return [require('autoprefixer')];
          },
          sourceMap: true
        }
      }
    ]
  },
  {
    test: /\.(sa|sc)ss$/,
    use: [
      'to-string-loader',
      MiniCssExtractPlugin.loader,
      {
        // translates CSS into CommonJS modules
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        // Run post css actions
        loader: 'postcss-loader',
        options: {
          // post css plugins, can be exported to postcss.config.js
          plugins: function () {
            return [require('autoprefixer')];
          },
          sourceMap: true
        }
      },
      {
        // compiles Sass to CSS
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  },
  {
    test: /\.less$/,
    use: [
      'to-string-loader',
      MiniCssExtractPlugin.loader,
      {
        // translates CSS into CommonJS modules
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        // Run post css actions
        loader: 'postcss-loader',
        options: {
          // post css plugins, can be exported to postcss.config.js
          plugins: function () {
            return [require('autoprefixer')];
          },
          sourceMap: true
        }
      },
      {
        // compiles Less to CSS
        loader: 'less-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  },
  {
    test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.otf$|\.ttf$|\.wav$|\.mp3$/,
    use: ['file-loader?name=[name].[ext]'] // <-- retain original file name
  }
  ];

  var optimization = {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  };

  var plugins = [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css?v=[hash]",
      chunkFilename: "[id].css?v=[hash]"
    }),
    /*
     *  Module (value) is loaded when the identifier (key) is used as free variable in a module
     * */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      '_': 'lodash',
      Popper: ['popper.js', 'default']
    })
  ];

  var config = {
    mode: "development", // "production" | "development" | "none"
    target: "web",
    stats: {
      modules: false
    },
    context: __dirname,
    output: output,
    devtool: 'source-map',
    module: {
      rules: rules
    },
    resolve: resolve,
    optimization: optimization,
    plugins: plugins
  };

  return config;
}