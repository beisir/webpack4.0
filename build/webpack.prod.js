const merge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');

const prodConfig = {
    mode: "production",   // 默认模式是production, 还可以 填写development
    devtool: 'cheap-module-source-map',  // development  // js sourceMap 默认是开启的
};

module.exports = merge(commonConfig, prodConfig);