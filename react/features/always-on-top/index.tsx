import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import AlwaysOnTop from './AlwaysOnTop';

// Render the main/root Component.

// ReactDOM.render(<AlwaysOnTop />, document.getElementById('react'));
createRoot(<AlwaysOnTop /> as any, document.getElementById('react') as any);

window.addEventListener(
    'beforeunload',
    () => ReactDOM.unmountComponentAtNode(document.getElementById('react') ?? document.body));
