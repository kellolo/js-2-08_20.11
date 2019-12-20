const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/public/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main.js'
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
    },
    mode: 'production',
    module: {
        rules: [
            {test: /\.js$/, exclude: '/node_modules/', use: 'babel-loader'},
            {test: /\.css$/, use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    hmr: process.env.NODE_ENV === 'development',
                  },
                },
                'css-loader', ]
            }, 
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/style.css',
        }),
        new HtmlWebpackPlugin({  // Also generate a test.html
          filename: 'index.html',
          template: 'src/public/index.html'
        })
    ]
}