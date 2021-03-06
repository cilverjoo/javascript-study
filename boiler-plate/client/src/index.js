import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

import 'antd/dist/antd.css';

// promise와 function도 받을 수 있게 createStore와 함께 넣어준다.
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)


ReactDOM.render(
  //여기에 보여주고싶은 컴포넌트를 넣어주면 된다.

<Provider
  store = {createStoreWithMiddleware(Reducer, 
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()

    )}
>
  <App />
</Provider>


 , document.getElementById('root') //index.html에 정의된 id를 보여주는 것.
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
