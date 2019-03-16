const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',   
    // mode为development的情况下，会默认打开SourceMap
    // 使用source-map会生成main.js.map文件来构成映射
    // 使用inline-source-map会将main.js.map文件转化为Base64的格式放在main.js文件的底部   
    // devtool: 'cheap-inline-source-map', // 加上'cheap'则不提示哪一列出现错误，且只负责业务代码的错误
    // devtool: 'cheap-module-inline-source-map',  // 再加上'module'则负责业务代码的错误
    // devtool: 'eval',    // 在main.js中使用eval()方法来实现sourcemap的对应关系，相比其他，打包速度最快
    devtool: 'cheap-module-eval-source-map', //development环境下最佳实践
    entry: {
        main: './src/index.js'
    },
    // webpack-dev-server是一个简单的web服务器，并且能够实时重新加载
    devServer: {
        contentBase: './dist',   // 服务器根路径
        // open: true,              // 自动打开浏览器并进入对应页面
        proxy: {                 // 跨域代理
            "/api": "http://localhost:3000"
        },
        port: 8080,              // devServer默认端口
        hot: true,               // 开启模块热替换
        hotOnly: true            // 如果模块热替换功能没有生效，页面不刷新
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: 2048
                }
            }
        }, {
            test: /\.css$/,
            // css-loader 负责组织css文件，合成一个css文件
            // style-loader 负责将css文件引入html文件
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            // loader执行顺序从右到左
            use: [
                'style-loader', 
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        modules: true
                    }
                },
                'sass-loader',
                // postcss-loader增加厂商前缀
                'postcss-loader'
            ]
        }]
    },
    plugins: [
        // htmlWebpackPlugin 会在打包结束后，自动生成一个html文件，
        // 并把打包生成的js自动引入到这个html文件中
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // 在打包之前，删除dist目录下的所有内容
        new CleanWebpackPlugin(),
        // 初始化模块热替换插件
        new webpack.HotModuleReplacementPlugin()    
    ],
    output: {
        publicPath: '/',       
        filename: '[name].js',  // name是通配符，表示entry中的key值
        path: path.resolve(__dirname, 'dist')
    }
}