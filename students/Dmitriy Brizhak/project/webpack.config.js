const path = require ('path')
const htmlPl = require ('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    entry: {
        //все о входном файле
        main: path.resolve (__dirname, 'public', 'js', 'index.js') //'./src/public/index.js'
    },
    output: {
        // все о собранном
        path: path.join (__dirname, 'dist', 'public'),
        publicPath: "",
        filename: 'js/[name].js'
    },
    target: 'web', //web - front, node - back/desktop
    module: {
        // солянка
        rules: [
            {
                // es6 > es5
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                  ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new htmlPl ({
            template: path.resolve (__dirname, 'public', 'index.html'),
            filename: 'index.html'
        })
    ]
}