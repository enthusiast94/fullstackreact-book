import React from 'react';

export default class MessageInput extends React.Component {

    state = {
        message: ""
    };

    onMessageChange = (event) => {
        this.setState({
            message: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.message.length === 0) {
            return;
        }

        this.props.onSubmit(this.state.message);
        this.setState({
            message: ""
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input className="form-control" style={{ padding: '10px', width: '100%' }} placeholder="Type your message here" value={this.state.message} onChange={this.onMessageChange} />
            </form>
        );
    }
}