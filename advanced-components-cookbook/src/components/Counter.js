import React, { Component } from 'react';
import Proptypes from 'prop-types';

export default class Counter extends Component {

    static propTyps = {
        initialValue: Proptypes.number
    }

    constructor(props) {
        super(props);

        this.state = {
            counter: props.initialValue ? props.initialValue : 0
        };
    }

    incrementCounter = () => {
        this.setState(prevState => {
            return { counter: prevState.counter + 1 }
        });
    }

    decrementCounter = () => {
        this.setState(prevState => {
            if (prevState.counter > 0) {
                return { counter: prevState.counter - 1 };
            } else {
                return { counter: prevState.counter };
            }
        });
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <button onClick={this.decrementCounter}>DECREMENT</button>
                <h2 style={{ marginLeft: "10px", marginRight: "10px" }}>{this.state.counter}</h2>
                <button onClick={this.incrementCounter}>INCREMENT</button>
            </div>
        );
    }
}