const path = require('path')
const ext = require('webpack-node-externals')
const cop = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src', 'server', 'index.js')
  },
  output: {
    path: path.join(__dirname, 'dist', 'server'),
    publicPath: "",
    filename: '[name].js'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [ext()],
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }

    ]
  },
  plugins: [
    new cop([{
        from: 'src/server/db/aggregates',
        to: 'db/aggregates/[name].[ext]',
        toType: 'template'
      },
      {
        from: 'src/server/db/events',
        to: 'db/events/[name].[ext]',
        toType: 'template'
      }
    ])
  ]
}