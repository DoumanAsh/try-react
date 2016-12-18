import ReactDOM from 'react-dom';
import React from 'react';
import App from 'components/App.jsx';
import Timer from 'components/Timer.jsx';
import Todo from 'components/Todo.jsx';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.querySelector('#app'));
    ReactDOM.render(<Todo />, document.querySelector('#todo'));
    ReactDOM.render(<Timer />, document.querySelector('#timer'));
});
