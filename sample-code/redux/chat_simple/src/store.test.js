import App from './App';

describe('store', () => {

    let store;

    beforeEach(() => {
        store = App.createStore(App.reducer, App.initialState);
    });

    it('should set initial state', () => {
        expect(store.getState()).toEqual(App.initialState);
    });

    it('should add message', () => {
        const message = 'just a message';
        store.dispatch({
            type: 'ADD_MESSAGE',
            message: message
        });

        expect(store.getState().messages.length).toBe(1);
        expect(store.getState().messages[0]).toBe(message);
    });

    it('should delete message', () => {
        store.dispatch({
            type: 'ADD_MESSAGE',
            message: 'just a message'
        });
        store.dispatch({
            type: 'DELETE_MESSAGE',
            index: 0
        });

        expect(store.getState().messages.length).toBe(0);
    });

    it('should notify listener when state changes', () => {
        const cb = jest.fn();
        store.subscribe(cb);
        store.dispatch({
            type: 'ADD_MESSAGE',
            message: 'just a message'
        });

        expect(cb.mock.calls.length).toBe(1);
    });

});
