import React from 'react';

export default function MessageList(props) {
    const messages = props.messages.map(message => {
        return (
            <li key={message.id}>
                {`${message.body} @ ${message.timestamp}`}
            </li>
        );
    });
    return (
        <ul>
            {messages}
        </ul>
    );
}