import React,{ Component } from 'react';
import {Pie} from 'react-chartjs-2';
import helperService from '../../core/services/HelperService';

export default class Report extends Component{

    render() {
        const displayName = this.props.name;
        let labels = Object.keys(this.props.data);
        let values = Object.values(this.props.data);
        const data = {
            labels:labels,
            datasets: [{
                data: values,
                backgroundColor: helperService.getColors(labels)
            }]
        };
        return (
            <div>
                <h2>{displayName}</h2>
                <Pie 
                    data={data}
                />
            </div>
        );
    }

}