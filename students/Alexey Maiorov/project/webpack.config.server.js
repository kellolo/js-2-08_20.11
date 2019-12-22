const path = require ('path')
const ext = require ('webpack-node-externals')
const cop = require ('copy-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve (__dirname, 'src', 'server', 'server.js')
    },
    output: {
        path: path.join (__dirname, 'dist', 'server'),
        publicPath: "",
        filename: 'js/[name].js'
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [ext ()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ]
    },
    plugins: [
        new cop ([
            {
                from: 'src/server/db',
                to: 'server/db/[name].[ext]',
                toType: 'template'
            }
        ])
    ]
}