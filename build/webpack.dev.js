const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');
const devConfig = {
    mode: "development",   // 默认模式是production, 还可以 填写development
    devtool: 'cheap-module-eval-source-map',  // development  // js sourceMap 默认是开启的 
    // devtool: 'cheap-module-source-map',       // production  
    
    plugins: [  // plugin可以在webpack运行到某个时刻的时候，帮你做一些事情，类似生命周期函数s
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: { // Tree Shaking 在开发环境是没有的
        // Tree Shaking 模式在development 只是提示作用，但是在 production模式才会真正运用，甚至不需要写 optimization这个配置
        usedExports: true   // 开启之后还需要设置package.json =>  "sideEffects": ["@babel/polly-fill", "*.css"],
    },
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