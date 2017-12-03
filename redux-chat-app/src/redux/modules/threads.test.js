import { threadReducer, activeThreadIdReducer, addMessage, deleteMessage, threadsReducer, openThread } from './threads';
import shortid from "shortid";

describe('thread related reducers', () => {
    const now = Date.now();
    
    beforeAll(() => {
        Date.now = jest.fn(() => now);
    });

    describe('threads reducer', () => {

        const generatedShortid = 20;
        const initialState = [
            {
                id: 1,
                messages: [
                    {
                        id: 1,
                        timestamp: now,
                        body: "sample message"
                    }
                ]
            }
        ];

        beforeAll(() => {
            shortid.generate = jest.fn(() => generatedShortid);
        })

        it('should add message', () => {
            const state = threadsReducer(initialState, addMessage(1, "another sample"));
            expect(state).toEqual([
                {
                    id: 1,
                    messages: [
                        {
                            id: 1,
                            timestamp: now,
                            body: "sample message"
                        },
                        {
                            id: generatedShortid,
                            timestamp: now,
                            body: "another sample"
                        }
                    ]   
                }
            ]);
        });
        
        it('should delete message', () => {
            const state = threadsReducer(initialState, deleteMessage(1));
            expect(state).toEqual([
                {
                    id: 1,
                    messages: []
                }
            ]);
        });
        
        it('should return unchanged state for unknown actions', () => {
            const state = threadsReducer(initialState, {type: 'UNKNOWN'});
            expect(state).toEqual(initialState);            
        });
        
    });

    describe('active thread id reducer', () => {
        
        const initialState = 1;

        it('should update active thread id with OPEN_THREAD action', () => {
            const state = activeThreadIdReducer(initialState, openThread(2));
            expect(state).toBe(2);
        });

        
        it('should return unchanged state for unknown actions', () => {
            const state = activeThreadIdReducer(initialState, {type: "UNKNOWN"});
            expect(state).toBe(initialState);
        });
        
    });
    
});



