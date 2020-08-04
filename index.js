import React from 'react';
import {render} from 'react-dom';
import App from './App';

const renderApp = Component => {
    const rootElement = document.getElementById('root');
    render(<Component />, rootElement)
};

renderApp(App);