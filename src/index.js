import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {ConfigInterceptor} from 'network/api/server';
import Loading from 'pages/Loading';
import App from './App';

import './index.css';

require('dotenv').config();
ConfigInterceptor();

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>,
  document.getElementById('root'),
);
