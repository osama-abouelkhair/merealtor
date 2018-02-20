import React from "react";
import * as UserAction from "../actions/UserActions";
import UserStore from "../stores/UserStore";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actions';
import * as actionCreators from '../store/actions/actions';


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
        console.log("props " + JSON.stringify(this.props));
    }

    handleChange(event) {
        var newState = this.state;
        let target = event.target;
        if (event.target !== undefined) {
            if (target.name === "confirmPassword") {
                if (this.state.password !== target.value) {
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

    signup(event) {
        event.preventDefault();
        const { fullName } = this.state;
        const { email } = this.state;
        const { password } = this.state;
        this.props.onSignup({
            fullName,
            email,
            password
        });
    }


    render() {
        if (this.props.access_token != undefined && this.props.access_token != '') {
            return <Redirect push to="/" />
        }
        if (this.props.user.fullName !== undefined && this.props.user.fullName !== '') {
            //return <Redirect push to="/" />
            this.props.onLogin(this.props.user.email, this.state.password);        
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
const mapStateToProps = state => {
    return {
        user: state.user.user,
        access_token: state.user.access_token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (user) => {
            dispatch(actionCreators.signup(user))
        },
        onLogin: (email, password) => {
            dispatch(actionCreators.login(email, password))
        }
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup))
