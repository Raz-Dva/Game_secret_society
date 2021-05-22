const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
          })
      ],
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        watchContentBase: true,
        port: 4200
    }
}