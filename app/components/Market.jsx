import React from 'react';

import { Link } from 'react-router';

const PriceList = {
    "Figure": "25",
    "Black Tea": "1",
    "Tea pot": "10"
};

const Menu = ({isNum}) => (
    <div className="menu">
        <Link to='/market'>Home</Link>
        <Link to='/market/checkout'>{`Checkout (x${isNum})`}</Link>
    </div>
);
Menu.propTypes = {
    isNum: React.PropTypes.number.isRequired
};

export class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            inCheck: []
        };
    }

    render() {
        return (
            <div id="content">
                <Menu isNum={this.state.inCheck.length}/>
                {this.props.children}
            </div>
        );
    }
}
Main.propTypes = {
    children: React.PropTypes.element.isRequired
};

const Item = ({item}) => (
    <div className="market_item">
        <p className="name">{item.name}</p>
        <p className="price">{item.price}</p>
    </div>
);
Item.propTypes = {
    item: React.PropTypes.object.isRequired
};

export class Home extends React.Component {
    render() {
        return (
            <div className="market">
                <h1>Welcome to dummy online store!</h1>
                <div className="shop">
                    <div className="market_header">
                        <p>Name</p>
                        <p>Price ($)</p>
                    </div>
                    {Object.keys(PriceList).map((key) =>
                        <Item key={key} item={{name: key, price: PriceList[key]}}/>
                    )}
                </div>
            </div>
        );
    }
}

export class Checkout extends React.Component {
    render() {
        return (
            <div className="market">
                <h1>Nothing here :(</h1>
            </div>
        );
    }
}
