const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // template: '!!ejs-compiled-loader!/src/index.ejs',
            template: '!!ejs-compiled-loader!' + path.join(__dirname, "src/index.ejs"),
            inject: false
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 9000
    }
};
