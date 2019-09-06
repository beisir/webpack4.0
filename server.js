const express = require("express");
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const complier = webpack(config);          // webpack的编译器
const app = express();



var devMiddleware = webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath,   // 打包输出的地址
    quiet: true 
})


app.use(devMiddleware);


app.listen(8888, function () {
    console.log('server is running....');
})