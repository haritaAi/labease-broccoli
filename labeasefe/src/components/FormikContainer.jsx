import React from 'react';
import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl';

const FormikContainer = ({initialValues,validationSchema,onSubmit,children}) =>  {

    return (
        <Formik initialValues = {initialValues}
                validationSchema = {validationSchema}
                onSubmit = {onSubmit}>
          { 
               formik => 
                         <Form>
                             {children}
                         
                         </Form> 
               }
        </Formik>
    );
}

export default FormikContainer;