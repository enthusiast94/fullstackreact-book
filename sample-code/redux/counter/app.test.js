const app = require("./app");

describe('reducer', () => {

    it('should increment state when action is INCREMNET', () => {
        let state = app.reducer(0, { type: 'INCREMENT', amount: 1 });
        expect(state).toBe(1);

        state = app.reducer(1, { type: 'INCREMENT', amount: 2 });
        expect(state).toBe(3);
    });


    it('should decrement state when action is DECREMENT', () => {
        let state = app.reducer(1, { type: 'DECREMENT', amount: 1 });
        expect(state).toBe(0);

        state = app.reducer(3, { type: 'DECREMENT', amount: 2 });
        expect(state).toBe(1);
    });


    it('should leave state unmodified for all unknown actions', () => {
        let state = app.reducer(1, { type: 'UNKNOWN', amount: 1 });
        expect(state).toBe(1);
    });

});


describe('createStore', () => {

    let store;
    const reducer = jest.fn();

    beforeEach(() => {
        store = app.createStore(reducer);
    });

    afterEach(() => {
        reducer.mockClear();
    });

    it('should create new store with initial state=0', () => {
        expect(store.getState()).toBe(0);
    });


    it('should invoke reducer when action is dispatched', () => {
        const action = { type: 'random' };
        store.dispatch(action);

        const invocations = reducer.mock.calls;
        expect(invocations.length).toBe(1);
        expect(invocations[0][0]).toEqual(0);
        expect(invocations[0][1]).toEqual(action);
    });
});
