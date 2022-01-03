import React from 'react'
import {Field,ErrorMessage} from 'formik'
import TextError from './TextError'

const RadioGroup = (props) => {
    const {label,name,options,...rest} = props
   

    return ( 

        <div className = 'form-control'>
            <label>{label}</label>
            <div  className = ' form-check' name = {name} {...rest}>
                {
                    options.map(option => 
                         <React.Fragment key = {option.key}>
                              <input
                                 className = 'form-check-input mx-2'
                                 type = 'radio'
                                 id = {option.value}                              
                                 value = {option.value}
                                //  checked = {field.value  === (option.value)}
                                 />
                                 <label className ='form-check-label' htmlFor = {option.value}>{option.key}</label>
                                 </React.Fragment>
                      )
                    }
                  
                
                </div>
        </div>
    )
 
}

export default RadioGroup;