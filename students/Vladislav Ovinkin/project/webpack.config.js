const path = require ('path');
const minCSS = require ('mini-css-extract-plugin');
const htmlPl = require ('html-webpack-plugin');
const optimizeCSS = require ('optimize-css-assets-webpack-plugin');
const terserJSPl = require ('terser-webpack-plugin');

module.exports = {
    entry: { // всё о входном файле
        main: path.resolve (__dirname, 'src', 'index.js')
    },
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
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [minCSS.loader, 'css-loader'],
                exclude: /node_modules/
            }
        ],
    },
    plugins: [
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