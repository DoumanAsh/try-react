import React from 'react';

export default class Timer extends React.Component {
    constructor() {
        super();
        this.state = {
            seconds: 0
        };
    }

    componentDidMount() {
        this._timer = setInterval(() => {
            this.setState({
                seconds: this.state.seconds + 1
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    render() {
        return (
            <div id="content">
                <h2>Timer:</h2>
                <h2>{this.state.seconds}</h2>
            </div>
            );
    }
}
