
function reducer(state, action) {
    if (action.type === 'INCREMENT') {
         return state + action.amount;
    } else if (action.type === 'DECREMENT') {
        return state - action.amount;
    }

    return state;
}

function createStore(reducer) {
    let state = 0;
    
    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
    }

    return {
        getState,
        dispatch
    };
}

export {
    reducer,
    createStore
};