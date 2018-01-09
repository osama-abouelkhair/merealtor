import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, IndexRoute } from "react-router-dom";
import Layout from "./pages/Layout";

const app = document.getElementById('app'); 
const p = "ff";

ReactDOM.render(
  <BrowserRouter>
    
    <Layout />
  </ BrowserRouter>,
app);
