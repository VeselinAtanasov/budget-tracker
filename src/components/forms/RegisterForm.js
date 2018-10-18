import React, { Component } from 'react';
import withFormHandlerAndValidator from '../hoc/withFormHandlerAndValidator';
import registerModel from '../../core/models/RegisterModel';
import authService from '../../core/services/AuthService';


class RegisterForm extends Component {

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
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="exampleInputRepPassword1">Repeat Password</label>
                            <input
                                type="password" 
                                className="form-control"
                                id="exampleInputRepPassword1" 
                                placeholder="Password" 
                                name="repeatPassword"
                                onChange={this.props.handleChange}
                                value={this.props.repeatPassword}
                            />
                        </div>
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email" 
                            className="form-control"
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                            name="email"
                            onChange={this.props.handleChange}
                            value={this.props.email}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>);
    }
}

RegisterForm = withFormHandlerAndValidator(RegisterForm,registerModel,authService.register);
export default RegisterForm;