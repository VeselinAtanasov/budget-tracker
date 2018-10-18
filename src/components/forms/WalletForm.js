import React, { Component } from 'react';
import withFormEdit from '../hoc/withFormEdit';
import walletModel from '../../core/models/WalletModel';
import trackerService from '../../core/services/TrackerService';


class WalletForm extends Component {

    render() {
        return (
            <div className="container">
                <form onSubmit={this.props.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleTrackerName">My Incomes:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="walletIncomes"
                            aria-describedby="emailHelp"
                            placeholder="Enter Expenses for Food"
                            name="walletIncomes"
                            onChange={this.props.handleChange}
                            value={this.props.walletIncomes}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTrackerName">Other Incomes:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="walletOthers"
                            aria-describedby="emailHelp"
                            placeholder="Enter Expenses for Bills"
                            name="walletOthers"
                            onChange={this.props.handleChange}
                            value={this.props.walletOthers}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>);
    }
}

WalletForm = withFormEdit(WalletForm,walletModel,trackerService.updateWallet);
export default WalletForm;