import React, { Component } from 'react';
import withFormHandlerAndValidator from '../hoc/withFormHandlerAndValidator';
import loginModel from '../../core/models/LoginModel';
import authService from '../../core/services/AuthService';


class LoginForm extends Component {

    render() {
        return (
            <div className="container">
                <form onSubmit={this.props.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputusername">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputusername"
                            aria-describedby="emailHelp"
                            placeholder="Enter username"
                            name="username"
                            onChange={this.props.handleChange}
                            value={this.props.username}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password" 
                            className="form-control"
                            id="exampleInputPassword1" 
                            placeholder="Password"
                            name="password"
                            onChange={this.props.handleChange}
                            value={this.props.password}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>);
    }
}

LoginForm = withFormHandlerAndValidator(LoginForm,loginModel,authService.login);
export default LoginForm;