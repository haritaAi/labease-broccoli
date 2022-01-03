import React from 'react';
import {Field,ErrorMessage} from 'formik'
import TextError from './TextError';

function Input(props) {
const {label,name,...rest} = props

    return (
        <div className = ''>
            {/* <label htmlFor = {name} className = ''>{label}</label> */}
            {/* <ErrorMessage name = {name} component = {TextError}/> */}
            <input className = 'form-control fs-5 ' id = {name} name = {name} {...rest}/>
        </div>
    );
}

export default Input;