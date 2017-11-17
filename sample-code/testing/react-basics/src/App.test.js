import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

describe("App", () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it("should have the th items", () => {
    expect(wrapper.contains(<th>Items</th>)).toBe(true);
  });

  it("should have 'add item' button", () => {
    expect(wrapper.containsMatchingElement(<button>Add item</button>)).toBe(true);
  });

  it("'add item' button should be disabled at start", () => {
    const addItemButton = wrapper.find('button').first();
    expect(addItemButton.props().disabled).toBe(true);
  });

  describe("user types in something in the input field", () => {

    const item = "London";

    beforeEach(() => {
      const itemInputField = wrapper.find("input").first();
      itemInputField.simulate("change", {
        target: { value: item}
      });
    });

    it("'add item' button should be enabled", () => {
      const addItemButton = wrapper.find("button").first();
      expect(addItemButton.props().disabled).toBe(false);
    });

    
    it('state.item should update', () => {
      expect(wrapper.state().item).toBe(item);
    });
    
    describe('user submits form', () => {
      
      beforeEach(() => {
        const form = wrapper.find("form").first();
        form.simulate("submit", {
          preventDefault: () => {}
        })
      });
      
      it('should update state.items', () => {
        expect(wrapper.state().items.length).toBe(1);
        expect(wrapper.state().items[0]).toBe("London");
      });
      
      it('should add td element for new item', () => {
        expect(wrapper.find("td").length).toBe(1);
        expect(wrapper.contains(<td>{item}</td>)).toBe(true);
      });
      
      it('should clear input field', () => {
        expect(wrapper.find("input").first().props().value).toBe("");
      });
      
      it('should disable "add item" button', () => {
        expect(wrapper.find("button").first().props().disabled).toBe(true);
      });
    });
  });
});



