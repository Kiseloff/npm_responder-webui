import React from 'react';

const ErrorIndicator = ({ errMsg }) => {
    return (
        <div className='alert alert-danger' role='alert'>
            {errMsg}
        </div>
    );
};

export default ErrorIndicator;
