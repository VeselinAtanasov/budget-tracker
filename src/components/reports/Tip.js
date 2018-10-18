import React from 'react';

const Tip = (props) => (
    <div className="alert alert-dismissible alert-warning">

        <h4 className="alert-heading">Tip: #{props.index+1}</h4>
        <p className="mb-0">{props.value}</p>
    </div>
);

export default Tip;