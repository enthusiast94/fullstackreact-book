import Components from './App';
import React from 'react';
import { shallow } from 'enzyme';
import Store from './store';

jest.mock('./store');

describe('MessageList', () => {
    
    const messages = ["message1", "message2"]; 
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<Components.MessageList messages={messages} />);
    });
    
    it('shoudld display messages in props', () => {
        const listItems = wrapper.find("li"); 
        expect(listItems.length).toBe(2);
        expect(listItems.at(0).props().children).toBe(messages[0]);
        expect(listItems.at(1).props().children).toBe(messages[1]);
    });
    
    it('should dispatch delete event when message is clicked', () => {
        wrapper.find("li").first().simulate("click");
        
        const dispatchInvocations = Store.store.dispatch.mock.calls;
        expect(dispatchInvocations.length).toBe(1);
        expect(dispatchInvocations[0][0].type).toBe('DELETE_MESSAGE');
        expect(dispatchInvocations[0][0].index).toBe(0);
    });
    
});
