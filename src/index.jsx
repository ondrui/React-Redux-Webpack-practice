import './index.less';
import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import {store} from './reducers';

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

// //Create heading node
// const heading = document.createElement('h2');
// heading.textContent = 'Interesting!';
// const heading2 = document.createElement('h2');
// heading2.textContent = 'Interesting!';
//
// //Append heading node to the DOM
// const app = document.querySelector('#root');
// document.body.append(heading);
// document.body.append(heading2);