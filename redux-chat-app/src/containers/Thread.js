import React from 'react';
import PropTypes from 'prop-types';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { addMessage, deleteMessage } from '../redux/modules/threads';

export default class Thread extends React.Component {

    static contextTypes = {
        store: PropTypes.object
    };

    store = this.context.store;

    componentDidMount() {
        this.store.subscribe(() => this.forceUpdate());
    }

    onMessageSubmit = (messageBody) => {
        this.store.dispatch(addMessage(this.store.getState().activeThreadId, messageBody));
    };

    onMessageClick = (messageId) => {
        this.store.dispatch(deleteMessage(messageId));
    };

    render() {
        const state = this.store.getState();
        const activeThread = state.threads.find(thread => thread.id === state.activeThreadId);
        return (
            <div>
                <MessageList onMessageClick={this.onMessageClick} messages={activeThread.messages} />
                <br />
                <MessageInput onSubmit={this.onMessageSubmit} />
            </div>
        )
    }
}   