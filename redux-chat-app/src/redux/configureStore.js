import { createStore } from 'redux';
import { threadsReducer, activeThreadIdReducer, addMessage, deleteMessage, openThread } from './modules/threads';
import shortid from 'shortid';

const initialState = {
    threads: [
        {
            id: shortid.generate(),
            messages: [
                {
                    id: 1,
                    timestamp: Date.now(),
                    body: "hey test message from thread 1"  
                }
            ]
        },
        {
            id: shortid.generate(),
            messages: [
                {
                    id: 1,
                    timestamp: Date.now(),
                    body: "hey test message from thread 2"  
                }
            ]
        }
    ],
    activeThreadId: null
};
initialState.activeThreadId = initialState.threads[0].id;

export default function configureStore() {
    return createStore((state = initialState, action) => {
        return {
            threads: threadsReducer(state.threads, action),
            activeThreadId: activeThreadIdReducer(state.activeThreadId, action)
        }
    });
}