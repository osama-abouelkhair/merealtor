import React from "react";
import { Link, Route, BrowserRouter, browserHistory, withRouter } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import * as UserAction from "../../actions/UserActions";
import Signup from "../Signup";
import LoginComp from "./LoginComp";
import WelcomeComp from "./WelcomeComp";
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';


class Nav extends React.Component {
  constructor(props) {
    super(props)
    console.log(props);
    this.state = {
      collapsed: true,
      user: {
        fullName: "",
        email: "",
        access_token: ""
      },
      email: "",
      password: ""
    };
    this.getUser = this.getUser.bind(this);
    const user = UserStore.getUser();
    if (user.access_token != "") {
      this.state = {
        collapsed: true,
        user: user
      };
    } else {
      this.state = {
        collapsed: true,
        user: {
          fullName: "",
          email: "",
          access_token: ""
        }
      };
    }
  }

  handleChange(event, attribute) {
    var newState = this.state;
    newState[attribute] = event.target.value;
    this.setState(newState);
  }


  getUser() {

    const user = UserStore.getUser();
    this.setState({ user: user });
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  componentWillMount() {
    UserStore.on("change", this.getUser);
  }

  componentWillUnmount() {
    UserStore.removeListener("change", this.getUser);
  }

  componentWillUpdate() {
    UserStore.on("change", this.getUser);
  }

  shouldComponentUpdate() {
    console.debug('shouldComponentUpdate');
    if (this.state.user.fullName != undefined && this.state.user.fullName != "") {
      return false;
    }
    return true;
  }


  render() {

    const { location } = this.props;
    const { collapsed } = this.state;
    const featuredClass = location.pathname === "/" ? "active" : "";
    const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    var navComp = null;
    const { access_token } = this.state.user;
    const { email } = this.state.user;

    if (access_token == "") {
      //navComp = <LoginComp />;
      navComp = (

        <div>
          <Button raised color="primary" component={Link} to={{pathname: "/login"} }>Login
            {/* <Link class="btn btn-link my-2 my-sm-0 btn-sm" to="/login">Login</Link> */}
          </Button>
          <Link class="btn btn-link my-2 my-sm-0 btn-sm" to={{pathname: "/signup"}}>Sign Up</Link>
        </div>

      )
    } else {
      //navComp = <WelcomeComp user={this.state.user} />;
      if (this.state.user.fullName === undefined || this.state.user.fullName === "") {
        UserAction.getUserDetails(email, access_token);
      }
      const { fullName } = this.state.user;
      navComp = (
        <div>
          <h3>Hello {fullName} </h3>
        </div>
      )
    }

    return (

      <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">MeRealtor</a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class={"nav-item" + featuredClass}>
              <Link class={"nav-link"} to="/categories" onClick={this.toggleCollapse.bind(this)}>Categories</Link>
              
            </li>

            <li class={"nav-item" + settingsClass}>
              <Link class={"nav-link"} to="/settings" onClick={this.toggleCollapse.bind(this)}>Settings</Link>
            </li>
          </ul>
          {navComp}
        </div>

      </nav>

    );
  }

}

export default withRouter(Nav);