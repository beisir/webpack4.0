const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');
const devConfig = {
    mode: "development",   // 默认模式是production, 还可以 填写development
    devtool: 'cheap-module-eval-source-map',  // development  // js sourceMap 默认是开启的 
    // devtool: 'cheap-module-source-map',       // production  
    module: {
        rules: [
            /***************** postcss-loader/scss-loader *********************/
            {
                test: /\.scss$/,  // 处理样式loader
                use: [  // loader的执行顺序是从右到左，从下到上
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,  // 在使用@import "a.scss"执行之前也需要走sass-loader和postcss-loader的处理
                            // modules: true,      // 开启css模块化, import style from 'a.css'; 所有样式都在style变量中
                            sourceMap: true
                        }
                    },
                    'sass-loader',
                    'postcss-loader'   // 配置css3新样式的前缀，又一个配置文件postcss.config.js
                ]
            },
            /***************** style-loader/css-loader *********************/
            {
                test: /\.css$/,  // 处理样式loader
                use: [  // loader的执行顺序是从右到左，从下到上
                    'style-loader',
                    'css-loader',
                    'postcss-loader'   // 配置css3新样式的前缀，又一个配置文件postcss.config.js
                ]
            },
        ]
    },
    plugins: [  // plugin可以在webpack运行到某个时刻的时候，帮你做一些事情，类似生命周期函数s
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8999,
        contentBase: './dist',    // 服务器起在哪个目录下
        open: true,               // 自动打开浏览器
        hot: true,                // 开启浏览器热更新
        // hotOnly: true,            // 即便hot不生效也不让浏览器刷新
        proxy: {                  // 代理请求
            '/api': 'http://localhost:3000'
        }
    }
};
module.exports = merge(commonConfig, devConfig);