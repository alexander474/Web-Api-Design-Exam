const path = require('path');

module.exports = {
    entry: './src/client/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },{
                test: /\.(css|less)$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        alias: {
            ['~']: path.resolve(__dirname + '/src')
        }
    }
};
