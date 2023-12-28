const express = require('express');
const app = express();

const webpack = require('webpack');
const config = require('./webpack.config.js');
const compiler = webpack(config);

const path = require('path');

//告知express使用webpack-dev-middleware，
//以及将webpack.config.js配置文件作为基础配置。
app.use(require('webpack-dev-middleware')(compiler,{
    publicPath: config.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));

// 添加一个路由来处理根路径请求，返回dist目录下的index.html
// 如果你已使用了html-webpack-plugin，则可以跳过此设置
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000,function(){
    console.log('Example app listening on port 3000!\n');
});
