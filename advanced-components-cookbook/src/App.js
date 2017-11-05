import React, { Component } from 'react';
import './App.css';
import Switch from './components/Switch';
import Counter from './components/Counter';
import Container from './components/PropsChildrenContainer';

export default class App extends Component {

  state = {}

  onSelected = (option) => {
    this.setState({ selected: option });
  }

  render() {
    return (
      <div className="container">
        <h1>Switch</h1>
        <Switch options={["Option 1", "Option 2", "Option 3"]} onSelected={this.onSelected} />
        {this.state.selected && <p>You selected: <strong>{this.state.selected}</strong></p>}

        <h1>Counter</h1>
        <Counter />

        <h1>Props Children Container</h1>
        <Container>
          <div>This is a child</div>
          <div>This is another child</div>
        </Container>
      </div>
    )
  }
}

