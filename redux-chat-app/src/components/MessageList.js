import React from 'react';

export default function MessageList(props) {
    const messages = props.messages.map(message => {
        return (
            <li key={message.id}>
                <strong>{message.body}</strong> @ {humanizeTimeStamp(message.timestamp)}
            </li>
        );
    });
    return (
        <ul>
            {messages}
        </ul>
    );
}

function humanizeTimeStamp(timestamp) {
    return new Date(timestamp).toString();
}