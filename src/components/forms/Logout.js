import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../core/services/AuthService';


export default class Logout extends Component {
    logout() {

        authService.logout.send().then(authService.logout.success).catch(authService.logout.fail)

    }

    render() {
        this.logout();
        return <Redirect to='/login' />;
    }
}