import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../../resource/styles/Tracker.css';
export default class Tracker  extends Component{

    render(){
        return(
           
            <div className="col-sm-4" >
                <div className="card text-white bg-primary">
                    <div className="card-body">
                        <blockquote className="card-blockquote">
                            <p>
                                <font >Name: <strong>{this.props.trackerName}</strong></font>
                            </p>
                            <img className="center" src={this.props.trackerUrl} alt="" />
                            <p></p>
                            <footer>
                                <cite title="Source Title">Description: <strong>{this.props.trackerDescription}</strong> </cite>
                            </footer>
                            <div className="pull-right">
                                { <Link to={`/trackDetails/${this.props['_id']}`} className="btn btn-info" >Check</Link> }
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>

        );
    }
}