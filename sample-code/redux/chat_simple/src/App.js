import React from 'react';
import Store from './store';

const store = Store.store

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


const Components = {App, MessageList, MessageInput};
export default Components;

