import ReactDOM from 'react-dom';
import React from 'react';
import Timer from 'components/Timer.jsx';
import Todo from 'components/Todo.jsx';
import * as market from 'components/Market.jsx';

import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router';

let Home = ({isNum}) => (
    <div>
        <h1>Trying out react.js</h1>
    </div>
)

class App extends React.Component {
    render() {
        const routes = [
            'Todo',
            'Timer',
            'Market'
        ];
        return (
            <div id="app">
                <div id="nav">
                    {routes.map((link, index) =>
                        <Link key={index} to={`/${link.toLowerCase()}`} activeClassName="selected">{link}</Link>
                    )}
                </div>
                <div id="content">
                    {this.props.children}
                </div>
            </div>
            );
    }
}
App.propTypes = {
    children: React.PropTypes.element.isRequired
};

export default function() {
    ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="todo" component={Todo}/>
            <Route path="timer" component={Timer}/>
            <Route path="market" component={market.Main}>
                <IndexRoute component={market.Home}/>
                <Route path="checkout" component={market.Checkout}/>
            </Route>
        </Route>
    </Router>
    ), document.getElementById('main'));
}
