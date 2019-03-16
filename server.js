const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');

const app = express();      // 初始化express实例
// 使用config配置初始化webpack编译器
const compiler = webpack(config);  

// 告诉express使用webpack-dev-middleware，
// webpack-dev-middleware将webpack编译（打包）后的文件传给express
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

// 在端口3000上提供文件
app.listen(3000, function(){
    console.log('listening on port 3000!\n');
})
