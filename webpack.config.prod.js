const path = require('path');
const buildPath = path.resolve('./dist/');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve('./app'),
  target: 'web',
  devtool: false,
  performance: {
    maxAssetSize: 100,
    maxEntrypointSize: 300,
    hints: 'warning'
  },
  resolve: {
    modules: [path.resolve('./app'), 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.scss']
  },
  entry: [
    './js/index.js',
    './js/ga.js'
  ],
  output: {
    filename: 'js/[name].bundle.js',
    path: buildPath,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.html$/, loader: "html-loader", options: {
          attrs: ['img:src', 'a:href']
        }
      },
      {
       test: /\.(js)$/,
       use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [['es2015', { modules: false }]]
            }
          }
       ],
       exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.css|\.scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?limit=10000&mimetype=image/svg+xml&name=./images/[hash].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: ['file-loader?name=./images/[hash].[ext]']
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]'
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // Create HTML file that includes references to bundled CSS and JS.
    new HtmlWebpackPlugin({
      template: './index.html',
      chunksSortMode: 'dependency',
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
      },
      inject: true,
      // Note that you can add custom options here if you need to handle other custom logic in index.html
      // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
      trackJSToken: ''
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'app', 'css'), 'node_modules']
        },
        context: '/'
      }
    }),
    new CopyWebpackPlugin([
      {
          from: './static',
          to: './images/'
      }
    ]),
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
  ],

  // Configuration for dev server
  devServer: {
    contentBase: buildPath,
    hot: true,
    inline: true,
    port: 8888,
    historyApiFallback: true
  }
}
