const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        // все о входном файле
        main: ["@babel/polyfill", "whatwg-fetch", "./src/public/index.js"],
        
    },
    output: {
        // все о собранном
        path: path.join(__dirname, 'dist/public/'),
        publicPath: "",
        filename: "js/[name].js"
    },
    target: 'web', //web - front, node - back/desktop
    devtool: "#source-map",
    module: {
        // солянка
        rules: [
            {
                test: /\.js$/, // es6 > es5
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/public/index.html',
            filename: 'index.html',
            excludeChunks: ['server']
        })
    ]
}