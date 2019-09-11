const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');
const WorkBoxPlugin = require('workbox-webpack-plugin');

const prodConfig = {
    mode: "production",   // 默认模式是production, 还可以 填写development
    // devtool: 'cheap-module-source-map',  // development  // js sourceMap 默认是开启的
    output: {
        // [contenthash] //如果文件没有变化，打包的文件路径hash不会变
        filename: '[name].[contenthash].js',  // 打包之后生成的名字
        chunkFilename: '[name].[contenthash].chunk.js',
    },
    module: {
        rules: [
            /***************** postcss-loader/scss-loader *********************/
            {
                test: /\.scss$/,  // 处理样式loader
                use: [  // loader的执行顺序是从右到左，从下到上
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'   // 配置css3新样式的前缀，又一个配置文件postcss.config.js
                ]
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors'
                }
            }
        },
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ],
    },    

    plugins: [
        new MiniCssExtractPlugin({  // 分离css样式
            filename: '[name].css',
            chunkFilename: '[name].chunk.css',
            ignoreOrder: true, // Enable to remove warnings about conflicting order
        }),
        // 配置PWA，即使服务挂掉，页面也会正常运行，不过需要在业务代码内支持serviceworker
        // 配置即使服务器挂掉，可以访问缓存
        // if('serviceWorker' in navigator) {
        //     window.addEventListener('load', () => {
        //         navigator.serviceWorker.register('/service-worker.js').then(registeration => {
        //             console.log('service-worker  registed');
        //         }).catch(err => {
        //             console.log(err);
        //         });
        //     });
        // };
        new WorkBoxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ]


};

module.exports = merge(commonConfig, prodConfig);