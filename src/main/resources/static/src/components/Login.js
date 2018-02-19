import React from "react";
import * as UserAction from "../actions/UserActions";
import UserStore from "../stores/UserStore";
import { withRouter, Redirect } from "react-router-dom";
//import browserHistory from 'history';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actions';
import * as actionCreators from '../store/actions/actions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            email: "",
            password: "",

            redirect: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.getSignupStatus = this.getSignupStatus.bind(this);
        console.log("props " + JSON.stringify(this.props));
        console.log("history " + this.props.history.toString());
        const { history } = this.props;
    }

    handleChange(event) {
        var newState = this.state;
        let target = event.target;
        if (event.target !== undefined) {
            newState[target.name] = target.value;
            this.setState(newState);
            /*
            this.setState( (prevState, props) => {
                newState[target.name] = target.value;
            }

            );
            */
        }
    }

    login(event) {
        event.preventDefault();

        const { email } = this.state;
        const { password } = this.state;
        this.props.onLogin(email, password);
        /*UserAction.login({
            email,
            password
        });*/
        console.log("after login action");

    }

    componentWillMount() {
        console.log("mount");
        //UserStore.on("change", this.getSignupStatus);
    }

    componentWillUnmount() {
        //UserStore.removeListener("change", this.getSignupStatus);
    }

    componentWillUpdate() {
        console.log("will update");
        //UserStore.on("change", this.getSignupStatus);
    }

    // shouldComponentUpdate() {
    //     console.debug('shouldComponentUpdate');
    //     //return true;
    // }

    getSignupStatus(event) {
        const status = UserStore.signupStatus();

        console.log("status ", status);
        if (status) {
            this.setState({ redirect: true })
        }

    }

    render() {
        if (this.props.access_token != undefined && this.props.access_token != '') {
            return <Redirect push to="/" />
        }
        const formControl = this.state.formControl;
        const danger = this.state.danger;
        const passwordMatch = this.state.passwordMatch;
        return (
            <div>
                <div class="row">
                    <p class="lead">Please Login</p>
                </div>

                <form onSubmit={this.login}>

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

                    <div class="form-group row">
                        <button class="btn btn-primary offset-md-8"
                            type="submit">
                            Login
            </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        redirect: state.user.redirect,
        user: state.user.user,
        access_token: state.user.access_token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => {
            dispatch(actionCreators.login(email, password))
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
