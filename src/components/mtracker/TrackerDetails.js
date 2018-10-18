import React, { Component } from 'react';
import TrackerInfo from './TrackerInfo';
import trackerService from '../../core/services/TrackerService';
import helperService from '../../core/services/HelperService';
import expenseService from '../../core/services/ExpenseService';
import BudgetStatusDanger from './BudgetStatusDanger';
import BudgetStatusSuccess from './BudgetStatusSuccess';
import Tip from './../reports/Tip';
import TableReport from '../reports/TableReport';

export default class TrackerDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            displayButton:true,
            leftMoney:'',
            tips:[]
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        trackerService
            .getTrackerById
            .send(id)
            .then(res => {
                let currentTracker = res;
                expenseService.getExpenseByTrackerId.send(id).then(data => {
                    let expenses = helperService.calculateRemainingAmount(currentTracker,data[0]) ;
                    let tips = helperService.getUsefulTips(currentTracker,data[0]) ;
                    currentTracker['statistic']=data[0];
                    this.setState({
                        leftMoney:expenses,
                        tips:tips,
                        statistic:data[0],
                        data:currentTracker
                    });
                }).catch(err => helperService.notify('error', 'Something got wrong with the server!'));
            }).catch(err => helperService.notify('error', 'Something got wrong with the server!'));
    }

    render() {
        let card;
        if (this.state.leftMoney === '') {
            return null;
        } else if (this.state.leftMoney < 0 && this.state.leftMoney !== '' ) {
            card = (
                <BudgetStatusDanger leftMoney={this.state.leftMoney} />
            );
        } else if (this.state.leftMoney >= 0 && this.state.leftMoney !== '') {
            card =(
                <BudgetStatusSuccess leftMoney={this.state.leftMoney} />
            ); 
        }
        return (
            <div className="container-fluid">
                <h1>Details about your current financial status:</h1>
                <p>All calculations are based on your overall incomes and expenses till now.</p>
                <p></p>
                <div className="col-sm-12" >
                    {<TableReport data={this.state.data} />}
                </div>
                <br/>
                <br/>
                <h3>Your Status:</h3>
                <div className="row">
               
                    <div className="col-sm-4" >
                        {<TrackerInfo data={this.state.data} displayButton={this.state.displayButton}/>}
                        
                    </div>
                    <div className="col-sm-8" >
                        {card}
                        {this.state.leftMoney !==0 && this.state.leftMoney<0 ? <h4>Here are some useful tips for you:</h4> : null }
                        {this.state.leftMoney !==0 && this.state.leftMoney<0 ? this.state.tips.map((e,i) => <Tip key={i}  value={e} index={i}  />) : null }  
                    
                    </div>
                   
                </div>
            </div>
        );
    }
}
