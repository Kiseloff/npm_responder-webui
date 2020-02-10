import React from 'react';
import ResultItem from './result-item';

const ResultView = ({ result }) => {
    const { ip, ...data } = result;

    let output = [];

    Object.entries(data).forEach(([key, value]) =>
        output.push(<ResultItem key={key} k={key} v={value} />)
    );

    return (
        <div className=' text-left'>
            <div className='row'>
                <div className='col h3'>Report</div>
            </div>
            <hr />
            <table className='table table-striped'>
                <tbody>{output}</tbody>
            </table>
        </div>
    );
};

export default ResultView;
