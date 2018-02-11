import React from "react";
import { Link, Route, BrowserRouter as Router, browserHistory } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import * as UserAction from "../../actions/UserActions";
import Signup from "../Signup";


export default class WelcomeComp extends React.Component {
  constructor(props) {
    super(props);
    }
render() {
    const { fullName } = this.props.user;
      return (
        <div>
          <h3>Hello {fullName} </h3>
          </div>
      )
    }
}
