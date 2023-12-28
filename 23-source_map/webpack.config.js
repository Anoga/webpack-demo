const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const options = {};
module.exports = {
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: "[name]_[chunkhash].js",
        path: path.join(__dirname, 'dist'),
        clean: true
    },
    mode: 'production',
    devtool: 'eval-source-map',
    devServer: {
        open: true,
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
            chunks: ['main'],
        }),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash].css',
        }),
        new WebpackManifestPlugin(options)
    ],
    optimization: {
        providedExports: true,
        usedExports: true,
        minimize: true,
        concatenateModules: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin({
                //默认为true，无需显式配置
                terserOptions: {
                    compress: {
                        unused: true
                    }
                }
            })
        ],
        splitChunks: {
            chunks: 'initial',
            minSize: 20000,
            minRemainingSize: 20000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: false,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module, chunks, cacheGroupKey) {
                        const allChunksNames = chunks.map((item) => item.name).join('~');
                        return `${cacheGroupKey}~${allChunksNames}`;
                    },
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
};