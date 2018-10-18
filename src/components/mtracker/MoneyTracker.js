import React, { Component } from 'react';
import MoneyTrackerNavigator from './MoneyTrackerNavigator';
import CreateMoneyTracker from './CreateMoneyTracker';
import trackerService from '../../core/services/TrackerService';
import helperService from '../../core/services/HelperService';
import TrackerInfo from './TrackerInfo';


export default class MoneyTracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: null
        };
    }

    componentDidMount() {
        let userId = sessionStorage.getItem('userId');
        if (userId) {
            trackerService
                .getTrackerByCreatorId
                .send(userId)
                .then(res => {
                    if (res.length !== 0) {
                        // helperService.notify('success', "Please check your Budget Tracker!");
                        this.setState({
                            menu: {
                                trackerDescription: res[0]['trackerDescription'],
                                trackerName: res[0]['trackerName'],
                                trackerUrl: res[0]['trackerUrl'],
                                trackerId: res[0]['_id']
                            }
                        });
                    } else {
                        this.setState({
                            menu: ''
                        });
                    }
                })
                .catch(err => helperService.notify('error', "Database request failed.Please try again later!!"));
        }
    }
    render() {
        if (this.state.menu === null) {
            return null;
        } else if (this.state.menu === '') {
            return (<CreateMoneyTracker />);
        } else {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <MoneyTrackerNavigator data={this.state.menu} />
                        </div>
                        <div className="container">
                            <TrackerInfo data={this.state.menu} />
                        </div>
                    </div>
                </div>

            );
        }

    }


} 