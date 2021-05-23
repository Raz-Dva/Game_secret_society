const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    watch: true,
    entry: path.resolve(__dirname + '/src/index.js'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'

    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/assets', to: 'assets' }
            ]
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        watchContentBase: true,
        port: 4200
    }
}