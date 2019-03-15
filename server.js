const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
// webpack两种使用方式：
// 1.在node中直接使用wepback
// 2.在命令行里使用webpack
const complier = webpack(config);   // 编译器，用于打包代码

const app = express();  // 创建express的实例

// webpackDevMiddleware这个中间件可以监听代码变化，
// 只要代码发生变化，则重新调用complier编译器重新打包代码
app.use(webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath
}));

app.listen(3000, ()=>{      // 让express监听3000端口
    console.log('server is running');
})