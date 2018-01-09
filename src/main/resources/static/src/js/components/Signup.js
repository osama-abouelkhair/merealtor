import React from "react";
import * as UserAction from "../actions/UserActions";
import UserStore from "../stores/UserStore";
import { withRouter, Redirect } from "react-router-dom";
//import browserHistory from 'history';


class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          fullName: "",
          email: "",
            password: "",
            confirmPassword: "",
            danger: "",
            formControl: "",
            passwordMatch: "",
            redirect: false,
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.getSignupStatus = this.getSignupStatus.bind(this);
        console.log("props " + JSON.stringify(this.props));
        console.log("history " + this.props.history.toString());
        const { history } = this.props;
      }

      handleChange(event) {
        var newState = this.state;
        let target = event.target;
        if(event.target!==undefined){
            if(target.name === "confirmPassword"){
                if(this.state.password !== target.value){
                 this.state.formControl = "form-control-danger";
                 this.state.danger = "has-danger";
                 this.state.passwordMatch = "Password did not match";                 
                } else {
                    this.state.formControl = "form-control-success";
                    this.state.danger = "has-success";
                    this.state.passwordMatch = "Password Match";
                }
            }
            newState[target.name] = target.value;
            this.setState(newState);
            }
        }

        signup(event){
            event.preventDefault();
            
            const { fullName } = this.state;
            const { email } = this.state;
            const { password } = this.state;
            UserAction.signup({
                fullName,
                email,
                password
            })
        }

        componentWillMount() {
            console.log("mount");
            UserStore.on("change", this.getSignupStatus);
        }
    
        componentWillUnmount(){
            UserStore.removeListener("change", this.getSignupStatus);
        }

        componentWillUpdate(){
            console.log("will update");
            UserStore.on("change", this.getSignupStatus);
        }
    
        shouldComponentUpdate() {
            console.debug('shouldComponentUpdate');
            return true;
          }

        getSignupStatus(event){ 
            const status = UserStore.signupStatus();
            
            console.log("status ", status);
            if(status){
                this.setState({redirect: true})
            }
        
    }

render() {
    if (this.state.redirect) {
       return <Redirect push to="/"/>
    }
        const formControl = this.state.formControl;
        const danger = this.state.danger;
        const passwordMatch = this.state.passwordMatch;
    return (
    <div>
        <div class="row">
            <p class="lead">Create a free account to manage your items and search results</p>
        </div>

        <form onSubmit={this.signup}>
        <div class="form-group row">

        <label class="col-md-6 col-lg-6 offset-lg-3 offset-md-3 col-form-label">
          Full Name:
          <input class="form-control"
            name="fullName"
            type="text"
            value={this.state.fullName}
            onChange={this.handleChange} />
        </label>
        </div>
        <div class="form-group row">

        <label class="col-md-6 col-lg-6 offset-lg-3 offset-md-3 col-form-label">
          Email:
          <input class="form-control"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange} />
        </label>
        </div>
        <div class="form-group row">
        <label class="col-md-6 col-lg-6 offset-lg-3 offset-md-3 col-form-label">
          Password:
          <input className="form-control" 
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange} />
        </label>
        </div>
        <div class={"form-group row " + danger}>
        <label class="form-control-label col-md-6 col-lg-6 offset-lg-3 offset-md-3 col-form-label">
          Confirm Password:
          <input class={"form-control " + formControl} 
            name="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange} />
            <div class="form-control-feedback">{passwordMatch}</div>

        </label>
        
        </div>
        <div class="form-group row">
        <button class="btn btn-primary offset-md-8" 
                    type="submit">
                    Signup
            </button>
        </div>
      </form>
    </div>
    );
}
}

export default withRouter(Signup)
