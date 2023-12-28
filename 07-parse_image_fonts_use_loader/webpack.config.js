const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist'),
    },
    mode: 'production',
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
                type: 'javascript/auto',
                use: {
                    loader: 'file-loader',
                    options:{
                        name: '[name].[ext]',
                        outputPath:"assets/images/",
                        publicPath:"./assets/images/",
                        esModule: false,
                    }
                },
            },
            {
                test: /\.(eot|ttf|otf|woff(2)?)(\?[a-z0-9]+)?$/,
                type: 'javascript/auto',
                use: {
                    loader: 'file-loader',
                    options:{
                        name: '[name].[ext]',
                        outputPath:"assets/fonts/",
                        publicPath:"./assets/fonts/",
                        esModule: false,
                    }
                },
            }
        ]
    }
};