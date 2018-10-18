import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MoneyTrackerNavigator extends Component{

    render(){
        return (                           
            <div className="btn-group-vertical" data-toggle="buttons">
                <br/>
                <h3 className="card-header">Navigation menu :</h3>
                <Link to={`/addExpense/${this.props.data.trackerId}`} type="button" className="btn btn-primary"> Add Expense to BudgetTracker</Link>
                <Link to={`/fillWallet/${this.props.data.trackerId}`} type="button" className="btn btn-primary"> Add Money to Your Wallet</Link>
                <Link to={`/report/${this.props.data.trackerId}`} type="button" className="btn btn-primary" >Generate Report</Link>
            </div>);
    }
}

