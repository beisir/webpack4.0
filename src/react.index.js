// import "@babel/polyfill";
const arr = [
    new Promise(() => {}),
    new Promise(() => {})
];
arr.map(item => {
    console.log(item, 'newhelloso');
})

// import React, {Component} from 'react';
// import ReactDom from 'react-dom';
// class App extends Component {
    
//     render () {
//         return <div>hello word</div>
//     }

// }

// ReactDom.render(<App />, document.getElementById('root'));