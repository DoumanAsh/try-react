import React from 'react';

class Item extends React.Component {
    render() {
        const data = this.props.todo;
        const className = data.isActive ? 'active' : 'inactive';

        return (
            <li>
                <label onChange={this.props.handler} className={className}>
                    <input type="checkbox"></input>
                    {data.text}
                </label>
            </li>
    );
    }
}

Item.propTypes = {
    todo: React.PropTypes.object.isRequired,
    handler: React.PropTypes.func.isRequired,
};

export default class Todo extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [{
                text: "Add something here",
                isActive: true
            }]
        };

        this.submit = this.submit.bind(this);
        this.toogleItem = this.toogleItem.bind(this);
    }

    /**
     * Toggles state of item.
     */
    toogleItem(idx) {
        this.setState((prev) => {
            prev.todos[idx].isActive = !prev.todos[idx].isActive;
            return prev;
        });
    }

    /**
     * Handles form submit to add new item.
     */
    submit(event) {
        event.preventDefault();

        const text = event.target[0].value;

        if (!text) return;

        this.setState((prev) => {
            prev.todos.push({
                text: text,
                isActive: true
            });
            return prev;
        });
    }

    render() {
        return (
            <div id="content">
                <h2>Todo:</h2>
                <ul>
                    {this.state.todos.map((todo, index) =>
                        <Item handler={()=>this.toogleItem(index)} key={index} todo={todo}/>
                    )}
                </ul>
                <form onSubmit={this.submit}>
                    <input placeholder='Something toremember?'/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
            );
    }
}
