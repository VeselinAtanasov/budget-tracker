import React, { Component } from 'react';
import authService from '../../core/services/AuthService';
import trackerService from '../../core/services/TrackerService';
import { Link } from 'react-router-dom';
import Tracker from './../mtracker/Tracker';
import '../../resource/styles/MyTracker.css';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trackers: [],
            dataArrived: false
        };
    }

    componentDidMount() {
        if (authService.isLoggedIn()) {
            trackerService.getAllTrackers.send().then(res => {

                this.setState({
                    trackers: res,
                    dataArrived: true
                });
            })
                .catch(err => {

                });
        }
    }

    render() {
        let dataForRendering;
        if (!sessionStorage.getItem('authtoken')) {
            dataForRendering = (<div className="container" >
                <h2>Budget Tracker</h2>
                <p>
                    Do you know how much money you spend every day, every week, even every month? Are you good in savings money at all? You don't know how to track your budget? If the answer of
                    all of these question is NO, then you are on the right place.
                </p>
                <p>
                    <br />
                    <strong>If you want to check our application,
                        <em>
                            <Link to="/login" > please login.</Link>
                        </em>
                    </strong>
                    <br />
                    <br />
                    <strong>If you don't have an account,
                        <em>
                            <Link to="/register" > please register.</Link>
                        </em>
                    </strong>
                </p>
            </div>);
        }
        if (this.state.dataArrived) {
            dataForRendering = (
                <div className="row space-top" >
                    {this.state.trackers.map((p, i) => <Tracker key={p._id}  {...p} />)}
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12" >
                        <h1>Home Page</h1>
                        <p>                        </p>
                    </div>
                </div>
                {dataForRendering}
            </div>
        );
    }
};
