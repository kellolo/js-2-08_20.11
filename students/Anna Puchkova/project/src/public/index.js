import '@babel/polyfill';
import 'whatwg-fetch';

import appMain from './js/script.js';
import './css/bootstrap.css';
import './css/style.css';
import './css/normalize.css';

const app = new Vue(appMain);