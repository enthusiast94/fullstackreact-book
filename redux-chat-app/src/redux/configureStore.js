import { createStore } from 'redux';
import { threadsReducer, activeThreadIdReducer, addMessage, deleteMessage, openThread } from './modules/threads';

const initialState = {
    threads: [
        {
            id: 1,
            messages: [
                {
                    id: 1,
                    timestamp: Date.now(),
                    body: "hey test message"  
                }
            ]
        }
    ],
    activeThreadId: 1
}

export default function configureStore() {
    return createStore((state = initialState, action) => {
        return {
            threads: threadsReducer(state.threads, action),
            activeThreadId: activeThreadIdReducer(state.activeThreadId, action)
        }
    });
}