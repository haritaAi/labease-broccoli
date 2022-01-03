import React from 'react';
import Select from './Select'
import Input from './Input'
import CheckboxGroup from '../components/CkeckboxGroup'
import RadioGroup from '../components/RadioGroup'
const FormikControl = (props) => {

  const {control,...rest} = props

  switch(control){
      case 'input':
          return <Input {...rest}/>
      case 'textarea':
      case 'radio':
          return <RadioGroup {...rest} />
      case 'checkbox':
        return <CheckboxGroup {...rest}/>
      case 'date':
      case 'select':
          return <Select {...rest}/>
      default : 
        return null    
  }

   
}

export default FormikControl;