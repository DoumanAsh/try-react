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
            inCheck: {}
        };

        this.add_item = this.add_item.bind(this);
        this.remove_item = this.remove_item.bind(this);
    }

    /**
     * Adds item to @ref inCheck.
     *
     * If already added, increase quantity.
     */
    add_item(item) {
        this.setState((prev) => {
            if (item in prev.inCheck) {
                prev.inCheck[item].quantity += 1;
            }
            else {
                prev.inCheck[item] = {
                    quantity: 1
                };
            }

            return prev;
        });
    }

    remove_item(item) {
        if (!(item in this.state.inCheck)) return;

        this.setState((prev) => {
            if (prev.inCheck[item].quantity == 1) {
                delete prev.inCheck[item];
            }
            else {
                prev.inCheck[item].quantity -= 1;
            }

            return prev;
        });
    }

    render() {
        return (
            <div id="content">
                <Menu isNum={Object.keys(this.state.inCheck).length}/>
                {React.cloneElement(this.props.children, {
                    inCheck: this.state.inCheck,
                    add_item: (item) => this.add_item(item),
                    remove_item: (item) => this.remove_item(item)
                })}
            </div>
        );
    }
}
Main.propTypes = {
    children: React.PropTypes.element.isRequired
};

const Item = ({item}) => (
    <div onClick={item.add} className="market_item">
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
                        <Item key={key} item={{name: key, price: PriceList[key], add: () => this.props.add_item(key)}}/>
                    )}
                </div>
            </div>
        );
    }
}
Home.propTypes = {
    add_item: React.PropTypes.func.isRequired
};

const CheckoutItem = ({item}) => (
    <div className="checkout_item">
        <p className="name">{item.name}</p>
        <p className="price">{item.price}</p>
        <div className="quantity">
            <p className="quantity">x{item.quantity}</p>
            <div className="change">
                <p onClick={item.add}>UP</p>
                <p onClick={item.remove}>DOWN</p>
            </div>
        </div>
    </div>
);
CheckoutItem.propTypes = {
    item: React.PropTypes.object.isRequired
};

export class Checkout extends React.Component {
    render() {
        const inCheck = this.props.inCheck;
        const checkin_items = Object.keys(inCheck);
        const checkin_len = checkin_items.length;
        return (
            <div className="market">
                {checkin_len === 0 ? (
                    <h1>Nothing here :(</h1>
                ) : (
                    <div className="checkout">
                        <h1>You got some stuff!</h1>
                        {checkin_items.map((key) =>
                            <CheckoutItem key={key} item={{name: key,
                                                           price: PriceList[key],
                                                           quantity: inCheck[key].quantity,
                                                           add: () => this.props.add_item(key),
                                                           remove: () => this.props.remove_item(key)}} />
                        )}
                        <div className="total">
                            <p className="total">Total</p>
                            <p className="sum">{checkin_items.reduce((acc, elem) => acc += PriceList[elem] * inCheck[elem].quantity, 0)}$</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
Checkout.propTypes = {
    inCheck: React.PropTypes.object.isRequired,
    add_item: React.PropTypes.func.isRequired,
    remove_item: React.PropTypes.func.isRequired
};
