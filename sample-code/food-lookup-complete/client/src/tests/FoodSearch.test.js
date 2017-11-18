// We populate this file in the chapter "Unit Testing"
/* eslint-disable no-unused-vars */
import { shallow } from 'enzyme';
import React from 'react';
import FoodSearch from '../FoodSearch';
import Client from '../Client';

jest.mock('../Client');

describe('FoodSearch', () => {
  // ... initial state specs
  let wrapper;
  const onFoodClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<FoodSearch onFoodClick={onFoodClick} />);
  });

  afterEach(() => {
    Client.search.mockClear();
    onFoodClick.mockClear();
  });

  it('should not display remove icon', () => {
    expect(wrapper.state().showRemoveIcon).toBe(false);
    expect(wrapper.find(".remove.icon").length).toBe(0);
  });

  it('should not have any table entries', () => {
    expect(wrapper.find("tbody tr").length).toBe(0);
  });

  describe('user populates search field', () => {

    const seacrchTerm = "brocc";

    beforeEach(() => {
      // ... simulate user typing "brocc" in input
      const inputField = wrapper.find("input").first();
      inputField.simulate("change", {
        target: {
          value: seacrchTerm
        }
      });
    });

    // ... specs

    it('should show remove icon', () => {
      expect(wrapper.state().showRemoveIcon).toBe(true);
      expect(wrapper.find(".remove.icon").length).toBe(1);
    });

    it('should call Client.search() with the search term', () => {
      const invocationArgs = Client.search.mock.calls[0];
      expect(invocationArgs[0]).toBe(seacrchTerm);
    });

    it('should update state.seachValue', () => {
      expect(wrapper.state().searchValue).toBe(seacrchTerm);
    });

    describe('and API returns results', () => {

      const foods = [
        { description: "Broccoli" },
        { description: "Broccolini" }
      ];

      beforeEach(() => {
        // ... simulate API returning results
        const callback = Client.search.mock.calls[0][1];
        callback(foods);
        wrapper.update();
      });

      // ... specs

      it('should update state.foods', () => {
        expect(wrapper.state().foods).toEqual(foods);
      });

      it('should display two table rows with the right data', () => {
        const rows = wrapper.find("tbody tr");
        expect(rows.length).toBe(2);
        expect(rows.at(0).html()).toContain(foods[0].description);
        expect(rows.at(1).html()).toContain(foods[0].description);
      });

      describe('then user clicks food item', () => {
        beforeEach(() => {
          // ... simulate user clicking food item
          wrapper.find("tbody tr").first().simulate("click");
        });

        // ... specs

        it('should call onFoodClick with the clicked food', () => {
          const invocations = onFoodClick.mock.calls;
          expect(invocations.length).toBe(1);
          expect(invocations[0]).toEqual([foods[0]]);
        });

      });

      describe('then user types more', () => {
        
        const searchTerm = "broccx";

        beforeEach(() => {
          // ... simulate user typing "x"
          const inputField = wrapper.find("input").first();
          inputField.simulate("change", {
            target: {
              value: seacrchTerm
            }
          });
        });

        describe('and API returns no results', () => {
          beforeEach(() => {
            // ... simulate API returning no results
            const secondInvocationArgs = Client.search.mock.calls[1];
            const callback = secondInvocationArgs[1];
            callback([]);
            wrapper.update();
          });

          // ... specs
          
          it('should update state.foods', () => {
            expect(wrapper.state().foods.length).toBe(0);
          });

          it('should display no rows', () => {
            expect(wrapper.find("tbody tr").length).toBe(0);
          });
          
        });
      });
    });
  });
});
