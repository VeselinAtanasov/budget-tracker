import React, { Component } from 'react';
import expenseService from '../../core/services/ExpenseService';
import trackerService from '../../core/services/TrackerService';
import helperService from '../../core/services/HelperService';
import SingleTracker from './SingleTracker';



export default class TrackersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trackers: []
        };
        this.removeElement = this.removeElement.bind(this);
        this.elementReRender = this.elementReRender.bind(this);
        this.populateData = this.populateData.bind(this);
    }

    componentDidMount() {
        trackerService.getAllTrackers.send().then(trackers => {
            expenseService.getAllExpenses.send().then(expenses =>{
                this.populateData(trackers,expenses);
                this.setState({
                    trackers
                });
            }).catch(err => helperService.notify('error', "Error during retrieval all Expenses!"));

        }).catch(err => helperService.notify('error', "Error during retrieval all Budget Trackers!"));
    }

    populateData(trackers,expenses){
        for(let tracker of trackers){
            for(let expense of expenses){
                if(tracker['_id']===expense['trackerId']){
                    tracker['expenses'] =expense;
                }
            }
        }
    }

    elementReRender() {
        trackerService.getAllTrackers.send().then(trackers => {
            expenseService.getAllExpenses.send().then(expenses =>{
                this.populateData(trackers,expenses);
                this.setState({
                    trackers
                });
            }).catch(err => helperService.notify('error', "Error during retrieval all Expenses!"));

        }).catch(err => helperService.notify('error', "Error during retrieval all Budget Trackers!"));
    }

    removeElement(trackerId) {
        expenseService.deleteExpenseByTrackerId.send(trackerId).then(deletedExpense => {
            trackerService.deleteTrackerById.send(trackerId).then(deletedTracker => {
                this.elementReRender();
                helperService.notify('success', "You successfully deleted a tracker!");
            }).catch(err => helperService.notify('error', "Error during deleting tracker"));
        }).catch(err => helperService.notify('error', "Error during deleting expenses"));
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>List of all Budget Tracker accounts and their status:</h1>
                <div className="row">
                    {this.state.trackers.map(e => <SingleTracker
                        key={e._id}
                        {...e}
                        removeElement={this.removeElement}
                    />)}
                </div>
            </div>

        );
    }
}