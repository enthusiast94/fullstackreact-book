import React from 'react';

const initialState = {
  messages: []
};

function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
    console.log(state);
  };

  const subscribe = (cb) => {
    listeners.push(cb);
  }

  return {
    getState,
    dispatch,
    subscribe
  };
}

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    return {
      messages: state.messages.concat([action.message])
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      messages: state.messages.filter((message, idx) => idx !== action.index)
    };
  } else {
    return state;
  }
}

const store = createStore(reducer, initialState);

class App extends React.Component {

  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const messages = store.getState().messages;
    return (
      <div>
        <MessageList messages={messages} />
        <br />
        <MessageInput />
      </div>
    );
  }
}

class MessageList extends React.Component {
  
  removeMessage(messageIndex) {
    store.dispatch({
      type: 'DELETE_MESSAGE',
      index: messageIndex
    });
  }

  render() {
    const messages = this.props.messages.map((message, idx) => {
      return (
        <li key={idx} onClick={(event) => this.removeMessage(idx)}>{message}</li>
      );
    });

    return (
      <div>
        <ul>
          {messages}
        </ul>
      </div>
    );
  }
}

class MessageInput extends React.Component {
  
  state = {
    message: ""
  };

  addMessage(event) {
    event.preventDefault();
    
    store.dispatch({
      type: 'ADD_MESSAGE',
      message: this.state.message
    });

    this.setState({
      message: ""
    });
  }

  onMessageChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addMessage.bind(this)}>
          <input value={this.state.message} onChange={this.onMessageChange.bind(this)} placeholder="Type in your message" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}


const AppWrapper = {createStore, reducer, initialState, App};
export default AppWrapper;

