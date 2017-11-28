import React from 'react';

export default function Tabs(props) {
    const tabs = props.threads.map(thread => {
        return (
            <li key={thread} className="nav-item clickable" onClick={(event) => props.onTabClick(thread)}>
                <a className={thread === props.activeThread ? "nav-link active" : "nav-link"}>{thread}</a>
            </li>
        );
    });

    return (
        <ul className="nav nav-tabs">
            {tabs}
        </ul>
    );
}