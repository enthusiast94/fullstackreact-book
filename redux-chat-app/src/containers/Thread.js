import React from 'react';
import PropTypes from 'prop-types';
import MessageList from '../components/MessageList';

export default class Thread extends React.Component {

    static contextTypes = {
        store: PropTypes.object
    };

    componentDidMount() {
        this.context.store.subscribe(() => this.forceUpdate());
    }

    render() {
        const state = this.context.store.getState();
        const activeThread = state.threads.find(thread => thread.id === state.activeThreadId);
        return (
            <div>
                <MessageList messages={activeThread.messages} />
            </div>
        )
    }
}   