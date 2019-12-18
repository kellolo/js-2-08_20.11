const path = require ('path')
const minCSS = require ('mini-css-extract-plugin')
const htmlPl = require ('html-webpack-plugin')

module.exports = {
    entry: {
        //все о входном файле
        main: path.resolve (__dirname, 'src', 'index.js') //'./src/public/index.js'
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
                    {
                      loader: minCSS.loader,
                      options: {
                        publicPath: '../',
                        hmr: process.env.NODE_ENV === 'production',
                      },
                    },
                    'css-loader',
                  ],
                exclude: /node_modules/
            }
        ]
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
    ]
}