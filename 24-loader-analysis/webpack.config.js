const path = require('path');
module.exports = {
    entry: {
        main: './src/index.js',
        inline: './src/inline-index.js',
    },
    output: {
        filename: "[name]_[chunkhash].js",
        path: path.join(__dirname, 'dist'),
        clean: true
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.txt$/,
                use: [
                    {
                        loader: path.resolve(__dirname, './loaders/a-async-loader.js'),
                        options: {
                            name: "a-async-loader"
                        }
                    },
                    path.resolve(__dirname, './loaders/b-sync-loader.js'),
                    path.resolve(__dirname, './loaders/c-sync-loader.js'),
                ]
            }
        ]
    }
};