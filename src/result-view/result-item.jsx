import React from 'react';

const isFloat = n => !!(n % 1);

const ResultItem = ({ k, v }) => {
    return (
        <tr>
            <th scope='row'>{k.toUpperCase()}</th>
            <td>
                <span
                    className={'badge'.concat(
                        v ? ' badge-success' : ' badge-danger'
                    )}
                >
                    {v
                        ? isFloat(v)
                            ? `${v.toFixed(2)} ms`
                            : 'Success'
                        : 'Failed'}
                </span>
            </td>
        </tr>
    );
};

export default ResultItem;
