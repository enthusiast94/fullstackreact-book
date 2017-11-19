import Components from './App';
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Store from './store';

jest.mock('./store');

describe('MessageInput', () => {

    let wrapper;
    const input = "sample input";

    beforeEach(() => {
        wrapper = shallow(<Components.MessageInput />);
    });


    it('should show empty input at start', () => {
        expect(wrapper.find('input').props().value).toBe("");
    });


    it('should update state.message when input changes', () => {
        wrapper.find("input").simulate("change", {
            target: { value: input }
        });

        expect(wrapper.state().message).toBe(input);
    });


    it('should dispatch add event when form submitted', () => {
        wrapper.find("input").simulate("change", {
            target: { value: input }
        });
        wrapper.find("form").simulate("submit", {
            preventDefault: () => { }
        });

        const dispatchInvocations = Store.store.dispatch.mock.calls;
        expect(dispatchInvocations.length).toBe(1);
        expect(dispatchInvocations[0][0].type).toBe('ADD_MESSAGE');
        expect(dispatchInvocations[0][0].message).toBe(input);
    });
});
