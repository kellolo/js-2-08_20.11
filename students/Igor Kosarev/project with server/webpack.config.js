const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const htmlPl = require('html-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  entry: {
    main: path.resolve(__dirname, 'src', 'index.js')
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: "",
    filename: 'js/[name].js'
  },
  target: 'web',
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),
    new htmlPl({
      template: path.resolve(__dirname, 'src', 'public', 'index.html'),
      filename: 'index.html'
    })
  ]
}