const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: "development",   // 默认模式是production, 还可以 填写development
    devtool: 'cheap-module-eval-source-map',  // development  // js sourceMap 默认是开启的 
    // devtool: 'cheap-module-source-map',       // production  
    entry: {    
        main: ['./src/index.js']
    },
    output: {
        
        filename: '[name]_[hash:8].js',  // 打包之后生成的名字
        path: path.resolve(__dirname, 'dist'),   // 生成的打包文件所在的文件夹路径，不写path默认是dist
        publicPath: '/'     // 生成的链接前缀
    },
    module: {   // 模块配置
        rules: [    // 规则配置
            /*************** file-loader/url-loader  *********************/
            {
                test: /\.(png|jpg|jif)$/,  // 处理图片loader
                use: {
                    loader: 'url-loader',
                    options: {  // 额外的loader配置参数
                        name: '[name]_[hash].[ext]',   // placehl配置打包之后的文件名
                        outputPath: 'images/',         // 输出打包文件的目录
                        limit: 2048                    // 小于2048/2kb 变成base64的字符串
                    }
                }
            },
            /*************** file-loader 字体文件 *********************/
            {
                test: /\.(eot|ttf|svg|woff)$/,  // 处理图片loader
                use: {
                    loader: 'file-loader',
                    options: {  // 额外的loader配置参数
                        outputPath: 'font/',         // 输出打包文件的目录
                    }
                }
            },
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
            /***************** babel-loader *********************/
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                // options: {  // 可以将options内的配置项放在.babelrc 文件内，整个对象直接迁移，但是不能有注释
                    /***************** 第一种： presets的babel配置  ******************/
                    // install --save-dev babel-loader @babel/core @babel/preset-env：进行语法转换
                    // install --save @babel/polyfill ：进行低版本浏览器的缺失的方法等弥补 import "@babel/polyfill";
                    /* presets: [ // 语法转换，仅仅是语法，并不会兼容低版本浏览器的方法
                        ["@babel/preset-env", { // 添加参数给preset-env
                            useBuiltIns: 'usage',  // "@babel/polyfill" 会很大，当添加低版本浏览器不存在的特性时，不把所有的特性添加进来，只添加用到的
                            // targets: {      // 设置浏览器兼容版本
                            //     edge: "17",
                            //     firefox: "60",
                            //     chrome: "67",
                            //     safari: "11.1",
                            // },
                        }]
                    ], */
                    /***************** 第二种： plugins的babel配置  ******************/
                    // install --save-dev @babel/plugin-transform-runtime
                    // install --save @babel/runtime
                    // @babel/plugin-transform-runtime 和@babel/runtime 会以闭包的方式注入组件不会污染全局变量
                    // @babel/polyfill 会污染全局变量 
                    /* plugins: [
                        ["@babel/plugin-transform-runtime", {
                            "corejs": 2, // 如果值为2,会自动将不存在的方法打包进入， 需要额外安装一个包: npm install --save @babel/runtime-corejs2
                            "helpers": true,
                            "regenerator": true,
                            "useESModules": false
                        }]
                    ] */
                    
                // }
            }
 
        ]
    },
    plugins: [  // plugin可以在webpack运行到某个时刻的时候，帮你做一些事情，类似生命周期函数
        new HtmlWebpackPlugin({ // 会在打包结束后自动生成一个html文件，并把打包生成的js自动引入html中
            title: "webpack4.0",
            template: 'src/index.html'  // 模版文件，
        }),
        new CleanWebpackPlugin(['dist']),    // 清除打包文件夹
        // new webpack.HotModuleReplacementPlugin()
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