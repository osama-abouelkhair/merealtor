import React from "react";
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
import Header from "../components/layout/Header";


import RealestateList from "./RealestateList";
import Settings from "./Settings";
import Signup from "../components/Signup";
import Login from "../components/Login";


export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };

    console.log("layout");
    console.log(this.props.children);
    return (
        
<div>
      <Nav style={containerStyle}/>
          
      <div class="container" style={{paddingTop: 3 + 'em'}}>
      
        {console.log("children " + this.props.children)}

        <Switch>
            <Route path="/categories" name="categories" component={RealestateList}></Route> 
            <Route path="/settings" name="settings" component={Settings}></Route>
            <Route path="/signup" name="signup" component={Signup}></Route>
            <Route path="/login" name="login" component={Login}></Route>            
          </Switch>
        <Footer/>
        
        </div>
      
</div>
    );
  }
}
