import * as React from 'react';
import { render } from 'react-dom';
import Home from './water/views/Home';
import { water } from './di';

render(<Home waterFactory={water}/>, document.getElementById('main'));
