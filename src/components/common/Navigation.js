import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import observer from '../../core/observer/observer';
import AuthService from '../../core/services/AuthService';

export default class Navigation extends Component{

    constructor(props) {
        super(props);
        this.state = { username: '' };

        this.userLogout = this.userLogout.bind(this);
        this.userLoggedIn = this.userLoggedIn.bind(this);

        observer.subscribe(observer.events.loginUser, this.userLoggedIn);
        observer.subscribe(observer.events.logoutUser, this.userLogout);
    }

    userLogout(){
        this.setState({ username: '' });
    }
    userLoggedIn(username){
        this.setState({ username:username });
    }

    render(){
        let admin = AuthService.isAdmin();
        let loggedInSection;
        //  let user = this.state.username!==''; //|| sessionStorage.getItem('username');
        if(this.state.username || sessionStorage.getItem('username') ){
            // if(sessionStorage.getItem('username')){
            loggedInSection =  (<ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink activeClassName="selected" className="nav-link" to="/mtracker">My Money Tracker </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="selected" className="nav-link" to="/logout">Logout </NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to='/' className="nav-link"><strong>Hello, {sessionStorage.getItem('username')}!</strong> | </NavLink>
                </li>
            </ul>);
        } else {
            loggedInSection =(  <ul className="navbar-nav ml-auto">        
                <li className="nav-item">
                    <NavLink activeClassName="selected" className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="selected" className="nav-link" to="/register">Register</NavLink>
                </li>
            </ul>);
        }

        let isAdmin;
        if( this.state.username!=='' && admin){
            isAdmin =(  <ul className="navbar-nav ml-auto">        
                <li className="nav-item">
                    <NavLink activeClassName="selected" className="nav-link" to="/admin">Admin Panel</NavLink>
                </li>
            </ul>);
        }

      

        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavLink activeClassName="selected" className="navbar-brand" to="/">BudgetTracker</NavLink>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink activeClassName="selected" className="nav-link" to="/">Home </NavLink>
                        </li>
                        {isAdmin}
                        {loggedInSection}
                    </ul>
                </div>
            </nav>
        );
    }
}