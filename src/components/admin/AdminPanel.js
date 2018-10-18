import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AdminPanel extends Component {
    render() {
        return (
            <div className="container">
                <h3>Admin Panel - Administration menu</h3>
                <ul className="list-group">
                    <Link to="/admin/allUsers" className="list-group-item d-flex justify-content-between align-items-center">
    List All Users:
                        <span className="badge badge-primary badge-pill">Access User Menu</span>
                    </Link>
                    <Link  to="/admin/allTrackers"  className="list-group-item d-flex justify-content-between align-items-center">
    List All Budget Tracker Accounts
                        <span className="badge badge-primary badge-pill">Access BudgetTracker Menu</span>
                    </Link>
                    <Link to="/mtracker" className="list-group-item d-flex justify-content-between align-items-center">
    Access Your Account
                        <span className="badge badge-primary badge-pill">Access Your Own Account </span>
                    </Link>
                </ul>
            </div>
        );
    }
}