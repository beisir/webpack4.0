// import "@babel/polyfill";
// import {add} from './match.js';
// add(6, 2);


// 工具类方法库
// import jquery from 'jquery';
// console.log(jquery);
// import _ from 'lodash';

// var element = document.createElement('div');
// element.innerHTML = _.join(['a', 'b', 'c'], 'xxx');
// document.body.appendChild(element);

import "./style.css";
console.log('22222');


// /* webpackChunkName:"lodash" */ 这种方式称之魔法注释，作用是起一个 chunk 名字
// async function getComponent () {
//     const {default: _} = await import(/* webpackChunkName:"lodash" */'lodash');
//     const element = document.createElement('div');
//         element.innerHTML = _.join(['a', 'b', 'c'], 'xxx');
//     return element;
// }

// document.addEventListener('click', () => {
//     // 异步执行的代码
//     /* webpackPrefetch: true */  // 魔法注释, 会在不占用网络的情况下加载， 有了缓存，当点击的时候更快
//     // Prefetch：会等待核心代码加载完成之后，页面空闲的时候加载prefetch对应的文件
//     // Preload：会和页面的代码一起加载
//     import(/* webpackPrefetch: true */ './click.js').then(({default: bundleClick}) => {
//         bundleClick();
//     })

//     // getComponent().then((element) => {
//     //     document.body.appendChild(element);
//     // });
// });


