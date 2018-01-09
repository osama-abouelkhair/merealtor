
import React from "react";
import { Link, Route, BrowserRouter as Router, browserHistory } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import * as UserAction from "../../actions/UserActions";
import Signup from "../Signup";

export default class LoginComp extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            email: "",
            password: ""
          };    
      }

      handleChange(event, attribute) {
        var newState = this.state;
        newState[attribute] = event.target.value;
        this.setState(newState);
        }
        
      login() {
        console.log("email " + this.state['email']);
        
        UserAction.login({
          
            email: this.state['email'],
            password: this.state['password']
        })
    }
    

render() {
      return (
          <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2 col-form-label-sm"
                 type="text"
                 id="email"
                 name="email"
                 placeholder="Email"
                 value={this.state.email}
                 onChange={(event) => this.handleChange(event, 'email')}/>
          <input class="form-control mr-sm-2 col-form-label-sm"
                 type="password"
                 id="password"
                 name="password"
                 placeholder="Password"
                 value={this.state.password}
                 onChange={(event) => this.handleChange(event, 'password')}/>
          <button class="btn btn-outline-primary my-2 my-sm-0 btn-sm" 
                  type="submit"
                  onClick={this.login.bind(this)}>
                  Login
          </button>
          <Link class="btn btn-link my-2 my-sm-0 btn-sm" to="/signup">Sign Up</Link>
          
        </form>
        )
      }
    }