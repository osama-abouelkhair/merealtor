import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, IndexRoute } from 'react-router-dom';
import Reboot from 'material-ui/Reboot';
import axios from 'axios';
import Layout from './containers/Layout';
import './App.css';

const app = document.getElementById('app');

//axios.defaults.headers.headers.common['Authorization'] = 'auth token';

ReactDOM.render(
  <div>
    {/*<Reboot />*/}
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </div>
  ,
  app);