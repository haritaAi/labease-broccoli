import React from 'react'
import {Field,ErrorMessage} from 'formik'
import TextError from './TextError'

const CheckboxGroup = (props) => {
    const {label,name,options,...rest} = props
   

    return ( 

        <div className = 'form-control  fs-4'>
            <label>{label}</label>
            <Field name = {name} {...rest}>
              {({field}) => {
                  return options.map(option => {
                      return (
                          <React.Fragment key = {option.key}>
                              <Field
                                 className = 'mx-2'
                                 type = 'checkbox'
                                 id = {option.value}
                                 {...field}
                                 value = {option.value}
                                 checked = {field.value.includes(option.value)}
                                 />
                                 <label htmlFor = {option.value}>{option.key}</label>
                                 </React.Fragment>
                      )
                  })
              }}   
                
                </Field>
        </div>
    )
 
}

export default CheckboxGroup;