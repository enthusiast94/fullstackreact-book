import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Provider from './containers/Provider';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/configureStore';

const store = configureStore();
const elementToRender = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(elementToRender, document.getElementById('root'));
registerServiceWorker();