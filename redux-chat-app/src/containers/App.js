import React from 'react';
import ThreadTabs from './ThreadTabs';
import Thread from './Thread';

export default function App() {
  return (
    <div className="container">
      <h1>Redux Chat</h1>
      <br/>
      <ThreadTabs />
      <br />
      <Thread />
    </div>
  );
}
