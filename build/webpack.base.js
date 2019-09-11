const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack');
module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        
        filename: '[name].js',  // 打包之后生成的名字
        path: path.resolve(__dirname, '../dist'),   // 生成的打包文件所在的文件夹路径，不写path默认是dist
        publicPath: './',     // 生成的链接前缀
        chunkFilename: '[name].chunk.js',
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
            /***************** babel-loader *********************/
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {loader: "babel-loader"},
                    // {   // 改变模块内的this的指向，
                    //     loader: 'imports-loader?this=>window'
                    // }
                ]
                // options: {  // 可以将options内的配置项放在.babelrc 文件内，整个对象直接迁移，但是不能有注释
                    /***************** 第一种： presets的babel配置  ******************/
                    // install --save-dev babel-loader @babel/core @babel/preset-env：进行语法转换
                    // install --save @babel/polyfill ：进行低版本浏览器的缺失的方法等弥补 import "@babel/polyfill";
                    /* presets: [ // 语法转换，仅仅是语法，并不会兼容低版本浏览器的方法执行顺序，从下往上
                        ["@babel/preset-env", { // 添加参数给preset-env
                            // 如果使用了 useBuiltIns: 'usage' 则不需要额外在业务代码引用import "@babel/polyfill";
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
                    // "presets": ["@babel/preset-react"]   转换react的语法   
                // }
            }
 
        ]
    },
    optimization: {  // Tree Shaking 在开发环境是没有的
        runtimeChunk: {     // 抽离vendors 和 main 之间的js的关联代码
            name: 'runtime'
        },
        // Tree Shaking 模式在development 只是提示作用，但是在 production模式才会真正运用，甚至不需要写 optimization这个配置
        usedExports: true,   // 开启之后还需要设置package.json =>  "sideEffects": ["@babel/polly-fill", "*.css"],
        // 代码分隔和webpack无关。webpack中实现代码分隔：两种方式
        // 1: 同步的代码分隔配置，做optimization.splitChunks的的配置即可
        // 2: 异步代码转换分隔配置 --官方支持"plugins": ["@babel/plugin-syntax-dynamic-import"]  
        // 2: 异步代码转译分隔配置 --非官方，不支持魔法注释"plugins": ["babel-plugin-dynamic-import-webpack"] // 转译最新的异步的实验性质的语法等
        // 异步代码实例 import("lodash").then(() => {...});
        splitChunks: {  // 代码分隔,当遇到公共的类库时，会自动将公共库分离打包，
            chunks: "all", // async 异步代码分隔  all 同步异步代码都进行分隔, 默认只为异步代码进行分隔，如果为all 则需要记性cacheGroups 
            // minSize: 30000,    // 打包代码小于minSize 则不单独打包，不做代码分隔
            // minChunks: 1,      // 当一个模块被用了至少多少次的时候才进行代码分隔 
            // maxAsyncRequests: 5,    // 同时加载的模块数最多是5个，超过5个，就不做代码分隔
            // maxInitialRequests: 3,  // 入口文件最多引入3个库，进行代码分隔，超过之后就不做分隔
            // automaticNameDelimiter: '_',    // 文件生成之后进行分隔，在不设置filename的情况下
            // name: true,
            // cacheGroups: {  // 缓存组
            //     vendors: {  // 如果chunks = all 进行下方配置
            //         test: /[\\/]node_modules[\\/]/,     // 引入的库是否是在node_modules内 
            //         priority: -10,  // 优先级，如果符合缓存组的条件，则看优先级    
            //         // filename: "vendors.js"   //  设置打包之后的文件名 
            //     },
            //     default: {  // 如果打包的代码 小于minSize 且不在node_modules 内，则执行下面配置
            //         // minChunks: 2,    
            //         priority: -20,  // 优先级   
            //         reuseExistingChunk: true,   // 如果一个模块已经被打包过了，则在打包的时候直接使用之前打包的
            //         filename: 'default.js'
            //     }
            // }  
        } 
    },
    performance: false, // 不显示警告
    plugins: [  // plugin可以在webpack运行到某个时刻的时候，帮你做一些事情，类似生命周期函数
        new HtmlWebpackPlugin({ // 会在打包结束后自动生成一个html文件，并把打包生成的js自动引入html中
            title: "webpack4.0",
            template: 'src/index.html'  // 模版文件，
        }),
        new CleanWebpackPlugin(['dist'], {   // 清除打包文件夹
            root: path.resolve(__dirname, '../')    // 当前目录的上一级
        }), 
        // 配置 shimming
        // new webpack.ProvidePlugin({     // node_modules内的模块是不能修改类库。里面用到的依赖可以使用这种方式，让他自行引用
        //     $: 'jquery',    // 相当于在没有引用jquery的模块下 自动引用了jquery
        //     _: 'lodash',
        //     _join: ['lodash', 'join']       // 这种引用相当于 _join = lodash.join
        // })


    ],
};