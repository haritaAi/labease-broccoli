import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import Menu from '../components/menu';
import { signin, signup ,isAuthenticated,authenticate} from '../auth';
import '../icons/FontawesomeIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import TextError from '../components/TextError';

const initialValues = {
    name : "",
    email : "",
    password : "",
}


const validationSchema = Yup.object({
    name : Yup.string().required('Name is required').min(3),
    email : Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('password is required').min(5)
})
const Signup = () => {
    
       const [errorAlert,setErrorAlert] = useState(false)
         
        const [values, setValues] = useState({         
         
          error: "",
          success : false,
         didredirect : false
        }
        );
        const {error,success,didRedirect} = values;
        
        const onSubmit = formValues => {
           
            setValues({...values,error : false});
              console.log(" local submit button called : values are ::",formValues)
           const {name,email,password} = formValues;
            signup({name,email,password})
                  .then( data => { console.log("Data recieved : ",data)
                      if(data.error){
                        
                        setValues({...values,error : data.error,success : false})
                        setErrorAlert(true)
                        setTimeout(()=>setErrorAlert(false),2000);
                      } 
                       else{   console.log("sign up successfu;;y")
                                setValues({...values,                                          
                                          error: "",
                                          success : true,didRedirect : true})  ;             
                          
                       }
                     })
                  .catch(err => {

                    console.log("error in signup")
                    setErrorAlert(true)
                    setTimeout(()=>setErrorAlert(false),2000);
                  }
                    );
      };
      const performRedirect = () => {
        if(didRedirect){
           
           return <Redirect to = "/signin"/>;
        }
        if(isAuthenticated()) return <Redirect to = "/signin"/>;
   };
 
       

    const signupForm = () => {

     return ( 
                
                <div className = "container-signin ">
                     Sign up
                    <Formik initialValues = {initialValues}
                            validationSchema = {validationSchema}
                            onSubmit = {onSubmit}>          
                    {formik => {
                        
                    return (
                       
                        <Form >
                          <div className = "form-group ">
                          
                               {/* <div className="icon-sign">
                               <FontAwesomeIcon icon = "user"
                                                 color = '#5c5c5c'/>
                               </div> */}
                          
                            <Field className = "form-control" 
                                    name = 'name'
                                    type="text"
                                    placeholder = "Name"
                                   />
                            </div>
                              <ErrorMessage  name = 'name' component = {TextError}/>
                            <div className="form-group">
                            {/* <div className="icon-sign">
                               <FontAwesomeIcon icon = "envelope"
                                                 color = '#5c5c5c'/>
                               </div> */}
                                <Field className = "form-control" 
                                       name = 'email' 
                                       type="email"
                                       placeholder = "email"
                                     />
                                        
                            </div>
                            <ErrorMessage name = 'email' component = {TextError}/>
                            <div className="form-group">
                            {/* <div className="icon-sign">
                               <FontAwesomeIcon icon = "lock"
                                                 color = '#5c5c5c'/>
                               </div> */}
                            <Field className = "form-control"  
                                    name = 'password' 
                                    type="password"
                                    placeholder = "password"
                                    />
                                   
                            </div>
                            <ErrorMessage name = 'password' component = {TextError}/>    
                            {errorAlert && <TextError >Error in sign up</TextError>}                        
                            <button className="my-btn btn-rounded" 
                                    onClick = {() =>onSubmit(formik.values)}
                                    disabled = {!formik.isValid}
                                    >Submit</button>

                        </Form>)
                      }    
                    }           
                     </Formik>
                    </div>
                    );



         };

       
  
   

    return ( 
        <>
        <Menu/>
         
           {signupForm()}
           {performRedirect()} 
       </> 
     );
}
 
export default Signup;
