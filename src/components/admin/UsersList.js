
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../../resource/styles/ListUsers.css';
import adminService from '../../core/services/AdminService';
import expenseService from '../../core/services/ExpenseService';
import trackerService from '../../core/services/TrackerService';
import helperService from '../../core/services/HelperService';
import User from './User';

export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.removeElement = this.removeElement.bind(this);
        this.makeUserAdmin = this.makeUserAdmin.bind(this);
        this.removeFromAdmin = this.removeFromAdmin.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    componentDidMount() {

        adminService
            .getAllUsers
            .send()
            .then(users => {
                let filteredUsers = users.filter(e => !e['_kmd']['status']);
                this.setState({
                    users: filteredUsers
                });
            }).catch(err => helperService.notify('error', "Error during retrieval of all users !"));
    }

    changeState(){
        adminService
            .getAllUsers
            .send()
            .then(users => {
                let filteredUsers = users.filter(e => !e['_kmd']['status']);
                this.setState({
                    users: filteredUsers
                });
            }).catch(err => helperService.notify('error', "Error during retrieval of all users !"));
    }

    removeElement(userId) {
        expenseService.getExpenseByCreatorId.send(userId).then(expense => {

            if (expense.length === 0) {

                adminService.deleteUser.send(userId).then().catch(err => helperService.notify('error', "Error during deleting a user"));
                helperService.notify('success', "You just removed a user from the app!");
                let reducedUsers = this.state.users.filter(u => u['_id'] !== userId);
                this.setState({
                    users: reducedUsers
                });
                return;
            }
            let tracker_id = expense[0]['trackerId'];
            let expenseId = expense[0]['_id'];

            expenseService.deleteExpenseById.send(expenseId).then(deletedExpense => {
                trackerService.deleteTrackerById.send(tracker_id).then(deletedTrackerId => {
                    adminService.deleteUser.send(userId).then().catch(err => helperService.notify('error', "Error during deleting a user"));
                    helperService.notify('success', "You just removed a user from the app!");
                    let reducedUsers = this.state.users.filter(u => u['_id'] !== userId);
                    this.setState({
                        users: reducedUsers
                    });
                }).catch(err => helperService.notify('error', "Error during deleting tracker"));
            }).catch(err => helperService.notify('error', "Error during deleting expense"));
        }).catch(err => helperService.notify('error', "Error during retrieval of user expenses"));
    }

    makeUserAdmin(userId) {
        adminService.getRoleByUserId.send(userId).then(roles => {
            if (roles.length !== 0) {
                helperService.notify("error", "This user is already an Admin");
                return;
            }
            adminService.assignRoleToUser.send(userId, adminService.adminId).then(res => {
                this.changeState();
                helperService.notify('success', "User role was changed to Admin!");

            }).catch(err => helperService.notify('error', "Error during assignment of Admin role!"));
        }).catch(err => helperService.notify('error', "Error during retrieval user roles!"));
    }

    removeFromAdmin(userId) {
        adminService.getRoleByUserId.send(userId).then(roles => {
            if (roles.length === 0) {
                helperService.notify("error", "This user is not an Admin");
                return;
            }
            adminService.deleteRoleFromUser.send(userId, adminService.adminId).then(res => {
                this.changeState();
                helperService.notify('success', "Admin role was removed from this user!!");
            }).catch(err => helperService.notify('error', "Error during deleting of Admin role!"));
        }).catch(err => helperService.notify('error', "Error during retrieval user roles!"));
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>List of registered users:</h1>
                <Link to="/admin/register" type="button" className="btn btn-success">Create New User</Link>
                {this.state.users.map(e => <User
                    key={e._id}
                    {...e}
                    removeElement={this.removeElement}
                    makeUserAdmin={this.makeUserAdmin}
                    removeFromAdmin={this.removeFromAdmin}
                />)}
            </div>
        );
    }
}