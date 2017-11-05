import React from 'react';
import PropTypes from 'prop-types';

export default class Container extends React.Component {

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
    }

    render() {
        return (
            <div style={{ backgroundColor: "lightgreen", padding: "10px" }}>
                {this.props.children}
            </div>
        );
    }
}
