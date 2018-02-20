import React from "react";
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";
import {connect} from  'react-redux';

import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';



import RealestateList from "../RealestateList";
import Projects from "../Project/Projects";
import Settings from "../Settings";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";

import Reboot from 'material-ui/Reboot';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});


class Layout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };

    return (
      
      <MuiThemeProvider theme={theme}>

        <Nav style={containerStyle} />

        <div class="container" style={{ paddingTop: 3 + 'em' }}>

          <Switch>
            <Route path="/settings" name="settings" component={Settings}></Route>
            <Route path="/signup" name="signup" component={Signup}></Route>
            <Route path="/login" name="login" component={Login}></Route>
            <Route path="/" name="" component={Projects}></Route>
          </Switch>
          <Footer />

        </div>

      </MuiThemeProvider>
    );
  }
}


export default Layout;