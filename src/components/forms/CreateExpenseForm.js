import React, { Component } from 'react';
import withFormEdit from '../hoc/withFormEdit';
import expenseModel from '../../core/models/ExpenseModel';
import expenseService from '../../core/services/ExpenseService';


class CreateExpenseForm extends Component {

    render() {
        return (
            <div className="container">
                <form onSubmit={this.props.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleTrackerName">Food Category:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="foodExpense"
                            aria-describedby="emailHelp"
                            placeholder="Enter Expenses for Food"
                            name="foodExpense"
                            onChange={this.props.handleChange}
                            value={this.props.foodExpense}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTrackerName">Bills Category:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="billsExpense"
                            aria-describedby="emailHelp"
                            placeholder="Enter Expenses for Bills"
                            name="billsExpense"
                            onChange={this.props.handleChange}
                            value={this.props.billsExpense}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTrackerName">Medicine Category:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="medicineExpense"
                            aria-describedby="emailHelp"
                            placeholder="Enter Expenses for Medicine"
                            name="medicineExpense"
                            onChange={this.props.handleChange}
                            value={this.props.medicineExpense}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTrackerName">Transport Category:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="transportExpense"
                            aria-describedby="emailHelp"
                            placeholder="Enter Expenses for Transport"
                            name="transportExpense"
                            onChange={this.props.handleChange}
                            value={this.props.transportExpense}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTrackerName">Clothing Category:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="clothingExpense"
                            aria-describedby="emailHelp"
                            placeholder="Enter Expenses for Clothing"
                            name="clothingExpense"
                            onChange={this.props.handleChange}
                            value={this.props.clothingExpense}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTrackerName">Fun Category:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="funExpense"
                            aria-describedby="emailHelp"
                            placeholder="Enter Expenses for Fun"
                            name="funExpense"
                            onChange={this.props.handleChange}
                            value={this.props.funExpense}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTrackerName">Others Category:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="otherExpense"
                            aria-describedby="emailHelp"
                            placeholder="Enter Expenses for Other Things"
                            name="otherExpense"
                            onChange={this.props.handleChange}
                            value={this.props.otherExpense}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>);
    }
}

CreateExpenseForm = withFormEdit(CreateExpenseForm,expenseModel,expenseService.update);
export default CreateExpenseForm;