import React from 'react';

export const  ColumnFilter =({column}) => {

    const {filterValue,setFilter} = column

    return (
        <span className ="form-grup">
            <input
                className = 'form-control'
                value = {filterValue || ''}
                onChange={e => setFilter(e.target.value)} 
            />
        </span>
    );
}

export default ColumnFilter;