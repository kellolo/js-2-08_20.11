const path = require('path');

module.exports = {
    entry: './src/server/server.js',
    output: {
        path: path.resolve(__dirname, 'dist', 'server'),
        filename: 'server.js'
    },
    mode: 'development',
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader'}
        ]
    }
}