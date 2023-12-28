const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const options = {};
module.exports = {
    entry: {
        main: {
            import: './src/index.js',
            dependOn: 'shared',
        },
        second: {
            import: './src/second.js',
            dependOn: 'shared',
        },
        shared: 'lodash',
    },
    output: {
        filename: "[name]_[chunkhash].js",
        path: path.join(__dirname, 'dist'),
        clean: true
    },
    mode: 'production',
    devServer: {
        static: './dist',
        hot: true,
        compress: true,
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
                    MiniCssExtractPlugin.loader,
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
            template: './src/template.html',
            filename: 'index.html',
            chunks: ['main', 'shared', 'runtime'],
        }),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename: 'second.html',
            chunks: ['second', 'shared', 'runtime'],
        }),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash].css',
        }),
        new WebpackManifestPlugin(options)
    ],
    optimization: {
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ]
    },
};