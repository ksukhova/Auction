const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: "babel-loader"
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: "ejs-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "resolve-url-loader"
                }, {
                    loader: "sass-loader?sourceMap" // compiles Sass to CSS
                }]
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.gif$/,
                use: [{
                    loader: "file-loader"
                }]
            }
        ]
    },
    resolve: {
        alias: {
            src: path.resolve('./src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!index.ejs',
            inject: false
        }),
        new CopyWebpackPlugin([
            { context: 'src/images', from: '**/*', to: 'images' },
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 9000,
        historyApiFallback: true
    }
};
