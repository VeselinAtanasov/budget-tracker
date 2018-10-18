import React from 'react';

const BudgetStatusDanger = (props) =>(
    <div className="col-sm-8"  >
        <div className="card text-white bg-danger mb-3" >
            <div className="card-header"><strong>Statistics:</strong></div>
            <div className="card-body">
                <h4 className="card-title">You have {(props.leftMoney.toFixed(2))} money left in the wallet</h4>
                <p className="card-text">Your balance is negative - be careful.</p>
            </div>
        </div>
    </div>
);

export default BudgetStatusDanger;