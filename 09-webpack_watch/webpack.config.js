const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist'),
    },
    //默认false，不开启
    watch: true,
    //只有开启监听模式，wachOptions才生效
    watchOptions: {
        //默认为空，此选项指定了哪些文件或文件夹不应该被监听。
        ignored: /node_modules/,
        //这个选项定义了文件变化后，Webpack在重新构建之前等待的时间（以毫秒为单位）。在这里，Webpack将等待300毫秒，以允许多个文件变化在一起时一次性重新构建，以减少构建次数，提高效率。
        aggregateTimeout: 300,
        //如果系统不支持文件系统事件监听，Webpack会使用轮询（polling）的方式检查文件是否发生变化.
        //这个选项定义了轮询的时间间隔，即每隔1000毫秒（1秒）Webpack会检查一次文件变化
        poll: 1000
    },
    mode: 'development',
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
    }
};