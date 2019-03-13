const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
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
        new CleanWebpackPlugin(['dist'])
    ],
    output: {
        filename: 'dist.js',
        path: path.resolve(__dirname, 'dist')
    }
}