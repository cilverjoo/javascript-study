import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
//store는 원래 객체밖에 못 받기 때문에 프로미스, Function도 받을 수 있도록 같이 만들어준다.

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer)}>
    <App />
  </Provider>
  ,document.getElementById('root')
);

