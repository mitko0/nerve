import React from 'react';
import ReactDOM from 'react-dom';

import 'bulma/css/bulma.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import '@fortawesome/fontawesome-free/less/fontawesome.less'
import '@fortawesome/fontawesome-free/scss/fontawesome.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

import './styles/all.css';
import './styles/App.css';
import './styles/index.css';

import App from './components/App/App';

ReactDOM.render(<App />, document.getElementById('root'));

