const path = require('path')
const nodeExternals = require('webpack-node-externals')
const copyPlugin = require('copy-webpack-plugin')
const fileLoader = require('file-loader')

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src", "server", "server.js")
  },
  output: {
    path: path.join(__dirname, "dist/server/"),
    publicPath: "",
    filename: "[name].js"
  },
  target: 'node',
  externals: [nodeExternals()],
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
      }
    ]
  },
  plugins: [
    new copyPlugin([
      {
        from: 'src/server/db',
        to: 'db/[name].[ext]',
        toType: 'template'
      }
    ])
  ]
}