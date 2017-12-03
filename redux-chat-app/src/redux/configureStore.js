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
                    body: "oh boy"  
                }
            ]
        },
        {
            id: shortid.generate(),
            messages: [
                {
                    id: 1,
                    timestamp: Date.now(),
                    body: "sup mate?"  
                }
            ]
        }
    ],
    activeThreadId: null
};
initialState.activeThreadId = initialState.threads[0].id;

export default function configureStore(state = initialState) {
    return createStore((state, action) => {
        return {
            threads: threadsReducer(state.threads, action),
            activeThreadId: activeThreadIdReducer(state.activeThreadId, action)
        }
    }, state);
}