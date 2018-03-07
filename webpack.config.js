const path = require('path');
const buildPath = path.resolve('./dist/');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve('./app'),
  target: 'web',
  devtool: 'eval-source-map',
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
      { test: /\.html$/, loader: "html-loader", options: {
        attrs: ['img:src', 'a:href']
      } },
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
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: ['file-loader']
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
    new webpack.NoEmitOnErrorsPlugin(),
    // Create HTML file that includes references to bundled CSS and JS.
    new HtmlWebpackPlugin({
      template: './index.html',
      chunksSortMode: 'none',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    }),
    new CopyWebpackPlugin([
      {
          from: './static',
          to: './images/'
      }
    ]),
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
    })
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
