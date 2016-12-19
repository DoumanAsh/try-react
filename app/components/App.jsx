import ReactDOM from 'react-dom';
import React from 'react';
import Timer from 'components/Timer.jsx';
import Todo from 'components/Todo.jsx';

import { Router, IndexRoute, Link, Route, browserHistory } from 'react-router';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Trying out react.js</h1>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        const routes = [
            'Todo',
            'Timer'
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
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="todo" component={Todo}/>
            <Route path="Timer" component={Timer}/>
        </Route>
    </Router>
    ), document.getElementById('main'));
}
