import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { mount } from './containers/Main';
import '../styles/index.scss';

window.addEventListener('DOMContentLoaded', mount);

console.log(React.version);
console.log(ReactDOM.version);
console.log(`"""${new Date()}"""`);
