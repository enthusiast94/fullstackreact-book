import React, { Component } from 'react';
import './Switch.css';
import PropTypes from  'prop-types';


export default class Switch extends Component {

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    onSelected: PropTypes.func
  }

  state = {}

  select = (option) => {
    return (event) => {
      this.setState({ selected: option });
      this.props.onSelected(option);
    };
  }

  renderOption = (option, idx) => {
    const classClasses = this.state.selected === option ? "clickable selected" : "clickable";
    return (
      <li key={idx} className={classClasses} onClick={this.select(option)}>{option}</li>
    );
  }

  render() {
    const options = this.props.options.map((option, idx) => this.renderOption(option, idx));
    return (
      <ul>{options}</ul>
    );
  }
}