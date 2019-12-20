const path = require('path')
const HtmlPlugin = require ('html-webpack-plugin')
const minCss = require ('mini-css-extract-plugin')
const fileLoader = require('file-loader')
const copyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src", "public", "index.js")
  },
  output: {
    path: path.join(__dirname, "dist/public/"),
    publicPath: "",
    filename: "js/[name].js"
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [minCss.loader, 'css-loader']
        }
    ]
  },
  plugins: [
    new HtmlPlugin ({
      template: 'src/public/index.html',
      filename: 'index.html',
      excludeChunks: ['server']
    }),
    new minCss ({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),
    new copyPlugin([
      {
        from: 'src/public/img',
        to: 'img',
        toType: 'dir'
      }
    ])
  ]
}