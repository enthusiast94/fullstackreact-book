import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../components/Tabs';
import { openThread } from '../redux/modules/threads';

export default class ThreadTabs extends React.Component {

    static contextTypes = {
        store: PropTypes.object
    };

    componentDidMount() {
        this.context.store.subscribe(() => this.forceUpdate());
    }

    onTabClick = (threadId) => {
        this.context.store.dispatch(openThread(threadId));
    };

    render() {
        const state = this.context.store.getState();
        const threadIds = state.threads.map(thread => thread.id);
        const messageCountsByThreadId = {}; 
        state.threads.forEach(thread => messageCountsByThreadId[thread.id] = thread.messages.length);
        
        return (
            <Tabs threads={threadIds} activeThread={state.activeThreadId} messageCounts={messageCountsByThreadId} onTabClick={this.onTabClick} />
        );
    }
}