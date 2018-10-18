import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class CreateMoneyTracker extends Component{

    render(){
        return (<div className="jumbotron">
            <h1 className="display-3">Hello, To Budget Tracker App!</h1>
            <p className="lead">You can create an account add add all of your expenses to it, and track them via tables and reports </p>
            <hr className="my-4"/>
            <p>Press the button below to start procedure of creating account.</p>
            <p className="lead">
                <Link  to="/createTracker" className="btn btn-primary btn-lg"  role="button">Create Your Own Tracker</Link>
            </p>
        </div>);
    }
}


