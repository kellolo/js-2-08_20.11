const path = require ('path');
const minCSS = require ('mini-css-extract-plugin');
const htmlPl = require ('html-webpack-plugin');
const optimizeCSS = require ('optimize-css-assets-webpack-plugin');
const terserJSPl = require ('terser-webpack-plugin');
const webpack = require ('webpack');

module.exports = {
    entry: [ "babel-polyfill", 'whatwg-fetch',  // всё о входном файле
        path.resolve (__dirname, 'src', 'index.js')
    ],
    output: { // всё о собранном
        path: path.join (__dirname, 'dist', 'public'),
        publicPath: "",
        filename: 'js/[name].js'
    },
    target: 'web', // web - front, node - back/desctop
    optimization: {
        minimizer: [new terserJSPl ({}), new optimizeCSS ({})]
    },
    module: { // солянка
        rules: [
            { // es6 => es5
                test: /\.js$/,
                exclude: /node_modules/,
                use : {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [minCSS.loader, 'css-loader'],
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin (),
        new webpack.ProvidePlugin ({
            'Promise': 'exports-loader?global.Promise!es6-promise',
            'fetch': 'exports-loader?self.fetch!whatwg-fetch'
        }),
        new minCSS ({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new htmlPl ({
            template: path.resolve (__dirname, 'src', 'public', 'index.html'),
            filename: 'index.html' 
        })
    ],
}