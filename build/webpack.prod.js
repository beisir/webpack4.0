const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');

const prodConfig = {
    mode: "production",   // 默认模式是production, 还可以 填写development
    devtool: 'cheap-module-source-map',  // development  // js sourceMap 默认是开启的
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
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ],
    },    

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css',
            ignoreOrder: true, // Enable to remove warnings about conflicting order
        })
    ]


};

module.exports = merge(commonConfig, prodConfig);