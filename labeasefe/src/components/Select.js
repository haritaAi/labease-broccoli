import React from 'react';
// import {Field,ErrorMessage} from 'formik'
// import TextError from './TextError';


const Select = (props) => {
   const {label,name,options,...rest} = props;

    
    return (
        <div className = 'mx-2 '>
            <label htmlFor = {name} className = ' mx-2'>{label} </label>
            <select id = {name} 
                   as = 'select'
                   name = {name}
                   className = 'form-select '
                   {...rest} 
                   >{
                   options.map(option => {
                       return(
                           <option key = {option.value}
                                   value = {option.value}>
                                       {option.value}</option>
                       )
                   })
                   }</select>
                   {/* <ErrorMessage name = {name} component = {TextError}/> */}
        </div>
    );
}

export default Select;