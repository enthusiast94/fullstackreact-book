import React from 'react';
import Provider from './Provider';
import { mount } from 'enzyme';
import App from './App';
import configureStore from '../redux/configureStore';

describe('App e2e', () => {

    let initialState;
    let store;
    let wrapper;

    beforeEach(() => {
        initialState = {
            threads: [
                {
                    id: 1,
                    messages: [
                        {
                            id: 1,
                            timestamp: Date.now(),
                            body: "oh boy"
                        }
                    ]
                },
                {
                    id: 2,
                    messages: [
                        {
                            id: 1,
                            timestamp: Date.now(),
                            body: "sup mate?"
                        }
                    ]
                }
            ],
            activeThreadId: 1
        };
        store = configureStore(initialState);
        wrapper = mount(<Provider store={store}><App /></Provider>);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should contain app h1 title', () => {
        const h1s = wrapper.find("h1");
        expect(h1s).toHaveLength(1);
        expect(h1s.get(0).props['children']).toBe("Redux Chat");
    });

    it('should contain tabs with titles and message counts', () => {
        const tabs = wrapper.find('Tabs a .nav-link');
        expect(tabs).toHaveLength(2);
        expect(tabs.at(0).text()).toEqual(initialState.threads[0].id + " (" + initialState.threads[0].messages.length + ")");
        expect(tabs.at(1).text()).toEqual(initialState.threads[1].id + " (" + initialState.threads[1].messages.length + ")");
    });

    it('should have first tab selected', () => {
        expect(wrapper.find('a .nav-link').get(0).props.className).toContain("active");
    });

    it('should show messages of selected tab', () => {
        const messages = wrapper.find("MessageList li .clickable");
        expect(messages).toHaveLength(1);
        expect(messages.at(0).text()).toContain(initialState.threads[0].messages[0].body);
    });

    it('should delete message when clicked', () => {
        wrapper.find("MessageList li .clickable").at(0).simulate('click');
        expect(wrapper.find("MessageList li .clickable")).toHaveLength(0);
    });

    it('should add new message using input field', () => {
        const newMessage = 'just another message';
        wrapper.find("input").simulate("change", { target: { value: newMessage } });
        wrapper.find("form").simulate('submit');
        const messages = wrapper.find("MessageList li .clickable");
        expect(messages).toHaveLength(2);
        expect(messages.at(1).text()).toContain(newMessage);
    });

    it('should be able to switch tabs and update state.activeThreadId', () => {
        let tabs = wrapper.find('Tabs .nav-item .clickable');
        let tabLinks = tabs.find('a .nav-link');
        expect(tabLinks.get(0).props.className).toContain("active");
        expect(tabLinks.get(1).props.className).not.toContain("active");
        expect(store.getState().activeThreadId).toBe(1);

        tabs.at(1).simulate('click');

        tabs = wrapper.find('Tabs .nav-item .clickable');
        tabLinks = tabs.find('a .nav-link');
        expect(tabLinks.get(0).props.className).not.toContain("active");
        expect(tabLinks.get(1).props.className).toContain("active");
        expect(store.getState().activeThreadId).toBe(2);
    });

});
