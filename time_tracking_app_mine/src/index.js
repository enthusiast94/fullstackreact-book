import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TimersDashboard } from './app';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TimersDashboard />, document.getElementById('root'));
registerServiceWorker();
