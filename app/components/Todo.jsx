import React from 'react';

class Item extends React.Component {
    render() {
        const data = this.props.todo;
        const className = data.isActive ? 'active' : 'inactive';

        return (
            <li>
                <label onChange={this.props.handler} className={className}>
                    <input defaultChecked={!data.isActive} type="checkbox"></input>
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
        this._key_idx = 0; //Simple unique ID of Item. Incremented on each submit.
        this.state = {
            todos: [{
                text: "Add something here",
                isActive: true,
                id: this._key_idx
            }],
            form: {
                disabled: true,
                inactive_num: 0
            }
        };

        this.submit = this.submit.bind(this);
        this.change = this.change.bind(this);
        this.toogleItem = this.toogleItem.bind(this);
        this.delete_items = this.delete_items.bind(this);
    }

    /**
     * Toggles state of item.
     */
    toogleItem(idx) {
        this.setState((prev) => {
            const isActive = !prev.todos[idx].isActive;

            if (!isActive) {
                prev.form.inactive_num += 1;
            }
            else {
                prev.form.inactive_num -= 1;
            }

            prev.todos[idx].isActive = !prev.todos[idx].isActive;
            return prev;
        });
    }

    /**
     * Handles changes to input.
     */
    change(event) {
        const disabled = !event.target.value;
        this.setState((prev) => {
            prev.form.disabled = disabled;
            return prev;
        });
    }

    delete_items() {
        this.setState((prev) => {
            prev.todos = prev.todos.filter((elem) => {
                return elem.isActive;
            });
            prev.form.inactive_num = 0;
        });
    }

    /**
     * Handles form submit to add new item.
     */
    submit(event) {
        event.preventDefault();

        const text = event.target[0].value;

        if (!text) return;

        this._key_idx += 1;

        this.setState((prev) => {
            prev.todos.push({
                text: text,
                isActive: true,
                id: this._key_idx
            });
            return prev;
        });
    }

    render() {
        return (
            <div id="content">
                <h1>ToDo</h1>
                <ul>
                    {this.state.todos.map((todo, index) =>
                        <Item handler={()=>this.toogleItem(index)} key={todo.id} todo={todo}/>
                    )}
                </ul>
                <form onSubmit={this.submit}>
                    <input onChange={this.change} placeholder='Something toremember?'/>
                    <button disabled={this.state.form.disabled}>Submit</button>
                    <button type='button' onClick={this.delete_items} disabled={!this.state.form.inactive_num}>X{this.state.form.inactive_num}</button>
                </form>
            </div>
            );
    }
}
