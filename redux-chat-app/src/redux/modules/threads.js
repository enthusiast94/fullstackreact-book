import * as shortid from "shortid";

const ADD_MESSAGE = "redux-chat-app/threads/ADD_MESSAGE";
const DELETE_MESSAGE = "redux-chat-app/threads/DELETE_MESSAGE";
const OPEN_THREAD = "redux-chat-app/threads/OPEN_THREAD";

export function threadsReducer(state, action) {
    switch (action.type) {
        case ADD_MESSAGE:
        case DELETE_MESSAGE:
            const threadIndex = action.type === ADD_MESSAGE ?
                state.findIndex(thread => thread.id === action.threadId) :
                findThreadIndexForMessage(state, action.messageId);
            const thread = state[threadIndex];
            const updatedThread = {
                ...thread,
                messages: messagesReducer(thread.messages, action)
            };
            return [
                ...state.slice(0, threadIndex),
                updatedThread,
                ...state.slice(threadIndex + 1, state.length),
            ];

        default:
            return state;
    }
}

export function activeThreadIdReducer(state, action) {
    switch (action.type) {
        case OPEN_THREAD:
            return action.threadId;
        default:
            return state;
    }
}

export function addMessage(threadId, messageText) {
    return {
        type: ADD_MESSAGE,
        threadId: threadId,
        messageText: messageText
    };
}

export function deleteMessage(messageId) {
    return {
        type: DELETE_MESSAGE,
        messageId: messageId
    };
}

export function openThread(threadId) {
    return {
        type: OPEN_THREAD,
        threadId: threadId
    };
}

function findThreadIndexForMessage(threads, messageId) {
    return threads.findIndex(thread =>
        thread.messages.some(message => message.id === messageId)
    );
}

function messagesReducer(state, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage = {
                id: shortid.generate(),
                timestamp: Date.now(),
                body: action.messageText
            };
            return [...state, newMessage];

        case DELETE_MESSAGE:
            return state.filter(message => message.id !== action.messageId)
    }
}
