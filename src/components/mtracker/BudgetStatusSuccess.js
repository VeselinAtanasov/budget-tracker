import React from 'react';

const BudgetStatusSuccess = (props) =>(
    <div className="col-sm-12"  >
        <div className="card text-white bg-success mb-3" >
            <div className="card-header"><strong>Statistics:</strong></div>
            <div className="card-body">
                <h4 className="card-title">You have {(props.leftMoney).toFixed(2)} money left in the wallet</h4>
                <p className="card-text">Your balance is positive - keep going! </p> 
            </div>
        </div>
    </div>
);

export default BudgetStatusSuccess;