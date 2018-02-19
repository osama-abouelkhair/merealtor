import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, IndexRoute } from 'react-router-dom';
import Reboot from 'material-ui/Reboot';
import axios from 'axios';
import Layout from './containers/Layout';
import './App.css';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './store/reducers/user';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  user: userReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

const app = document.getElementById('app');

//axios.defaults.headers.headers.common['Authorization'] = 'auth token';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Reboot />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  </Provider>
  ,
  app);