import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import Loading from 'pages/Loading';
import App from './App';

import './index.css';

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>,
  document.getElementById('root'),
);
