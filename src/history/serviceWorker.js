// import _ from 'lodash';
// import $ from 'jquery';
// import {jqueryUI} from './jquery.ui.js';

// jqueryUI();

// const dom = $('<div>');
// dom.html(_.join(['dell', 'lee'], '---'));
// $('body').append(dom)



// wepack plugin 的配置
// new WorkBoxPlugin.GenerateSW({
//     clientsClaim: true,
//     skipWaiting: true
// })

// 配置即使服务器挂掉，可以访问缓存
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registeration => {
            console.log('service-worker  registed');
        }).catch(err => {
            console.log(err);
        });
    });
};



console.log(this === window);