import React, { Component } from 'react';

import trackerService from '../../core/services/TrackerService';
import helperService from '../../core/services/HelperService';
import expenseService from '../../core/services/ExpenseService';

import TrackerInfo from './TrackerInfo';
import Report from './../reports/Report';
import BudgetStatusDanger from './BudgetStatusDanger';
import BudgetStatusSuccess from './BudgetStatusSuccess';

export default class TrackerReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            displayButton: true,
            leftMoney: '',
            charts: '',
            element: '',
            dataByCategory: '',
            dataByCategoryPer: ''
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        trackerService
            .getTrackerById
            .send(id)
            .then(res => {
                this.setState({
                    data: res
                });
                expenseService.getExpenseByTrackerId.send(id).then(data => {
                    let expenses = helperService.calculateRemainingAmount(this.state.data, data[0]);
                    let dataReportByCategory = helperService.reportByCategory(this.state.data, data[0]);
                    let dataReportByCategoryPercentage = helperService.reportByCategoryPercentage(this.state.data, data[0]);
                    this.setState({
                        leftMoney: expenses,
                        dataByCategory: dataReportByCategory,
                        dataByCategoryPer: dataReportByCategoryPercentage
                    });
                }).catch(err => helperService.notify('error', 'Something got wrong'));
            }).catch(err => helperService.notify('error', 'Something got wrong with the server!'));
    }

    render() {
        let element;
        if (this.state.leftMoney === '') {
            return null;
        } else if (this.state.leftMoney < 0 && this.state.leftMoney !== '' ) {
            element = <BudgetStatusDanger leftMoney={this.state.leftMoney} />;
        } else if (this.state.leftMoney >= 0 && this.state.leftMoney !== '') {
            element = <BudgetStatusSuccess leftMoney={this.state.leftMoney} />;
        }
        return (
            <div className="container-fluid">
                <h1>Overall Statistics:</h1>
                 
                <p>This is your detailed statistics.</p>
                <div className="row">
                    <div className="col-sm-8" >
                        <strong>BudgetTracker expense separation for {this.state.data.trackerName}:</strong>
                        {this.state.leftMoney!==0 ? (<div className="row">
                            <div className="col-sm-6" >
                                <Report name="Overall distribution by category in leva, lv" data={this.state.dataByCategory} />
                            </div>
                            <div className="col-sm-6" >
                                <Report name="Overall distribution by category in percentage, %" data={this.state.dataByCategoryPer} />
                            </div>
                        </div> ) : <h3>You balance is 0, so we cannot generate statistic for you!</h3> }
                    </div>
                    <div className="col-sm-4" >
                        {<TrackerInfo data={this.state.data} element={element} displayButton={this.state.displayButton} />}

                    </div>
                </div>
                
            </div>
        );
    }

}