import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import axios from 'axios';

import Home from './home.js';
import List from './list.js';

class App extends Component {

    componentDidMount () {
        axios.get('/Getserver/getlist').then(result => {
            console.log(result.data);



        });
    }

    render () {
        return (<BrowserRouter>
            <div>
                <Route path="/" exact component={Home} />
                <Route path="/list" component={List} />
            </div>
        </BrowserRouter>);
    }
}

ReactDom.render(<App />, document.getElementById('root'));


