import React from 'react';
import ThreadTabs from './ThreadTabs';
import Thread from './Thread';

export default function App() {
  return (
    <div className="container">
      <ThreadTabs />
      <Thread />
    </div>
  );
}
