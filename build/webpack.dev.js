const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
    mode: 'development',   
    // mode为development的情况下，会默认打开SourceMap
    // 使用source-map会生成main.js.map文件来构成映射
    // 使用inline-source-map会将main.js.map文件转化为Base64的格式放在main.js文件的底部   
    // devtool: 'cheap-inline-source-map', // 加上'cheap'则不提示哪一列出现错误，且只负责业务代码的错误
    // devtool: 'cheap-module-inline-source-map',  // 再加上'module'则负责业务代码的错误
    // devtool: 'eval',    // 在main.js中使用eval()方法来实现sourcemap的对应关系，相比其他，打包速度最快
    devtool: 'cheap-module-eval-source-map', //development环境下最佳实践
    // devtool: 'cheap-module-source-map', //生产环境下最佳实践
    
    // webpack-dev-server是一个简单的web服务器，并且能够实时重新加载
    devServer: {
        contentBase: './dist',   // 服务器根路径
        // open: true,              // 自动打开浏览器并进入对应页面
        proxy: {                 // 跨域代理
            "/api": "http://localhost:3000"
        },
        port: 8080,              // devServer默认端口
        hot: true,               // 开启模块热替换
        // hotOnly: true            // 如果模块热替换功能没有生效，页面不刷新
    },
    plugins: [
        // 初始化模块热替换插件
        new webpack.HotModuleReplacementPlugin()    
    ],
    // production模式下不需要写Tree Shaking配置
    optimization: {
        usedExports: true
    }
}
module.exports = merge(commonConfig, devConfig);