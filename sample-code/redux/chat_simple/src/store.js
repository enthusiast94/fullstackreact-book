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

const Store = {
    store,
    createStore,
    reducer,
    initialState
};

export default Store;