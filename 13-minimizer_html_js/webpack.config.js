const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist'),
    },
    mode: 'production',
    devServer: {
        static: './dist',
        hot: true,
        compress: false,
        client: {
            reconnect: true,
            progress: true,
            overlay: {
                errors: true,
                warnings: false,
                runtimeErrors: true,
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                type: 'asset/resource',
                generator: {
                    filename: './assets/images/[name][ext]',
                },
            },
            {
                test: /\.(eot|ttf|otf|woff(2)?)(\?[a-z0-9]+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: './assets/fonts/[name][ext]',
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
    ]
};