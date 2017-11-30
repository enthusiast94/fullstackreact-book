import React from 'react';

export default function MessageList(props) {

    const onMessageClick = (event, messageId) => {
        event.preventDefault();
        props.onMessageClick(messageId);
    }

    const humanizeTimestamp = (timestamp) => {
        return new Date(timestamp).toString();
    };

    const messages = props.messages.map(message => {
        return (
            <li className="clickable" key={message.id} onClick={(event) => onMessageClick(event, message.id)}>
                <strong>{message.body}</strong> @ {humanizeTimestamp(message.timestamp)}
            </li>
        );
    });
    return (
        <ul>
            {messages}
        </ul>
    );
}