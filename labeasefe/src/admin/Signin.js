import React, { useState } from 'react';
import {Link,Redirect} from 'react-router-dom';
import {signin,authenticate,isAuthenticated} from '../auth';
import Menu from '../components/menu';
import '../icons/FontawesomeIcons';

import TextError from '../components/TextError';



const Signin = () => {

    const [values,setValues] = useState({
       
        email : "",
        password : "",
        error : "",
        loading : false,
        didRedirect : false
    });
         const [errorAlert,setErrorAlert] = useState(false)

    const {email,password,error,loading,didRedirect} = values;
    
    
    const handleChange = name => event =>  {
        setValues({...values, error : false, [name] : event.target.value});
    };
    const onSubmit = event => {
       
        event.preventDefault();
        setValues({ ...values,
                error : false,
            loading : true  });
        signin({email,password})
              .then( data => {
                  if(data.error){
                      setValues({ ...values,error : data.error, loading : false  });
                      
                      setErrorAlert(true)
                      setTimeout(()=>setErrorAlert(false),2000);
                  } 
                  else authenticate(data,() => {
                      
                      setValues({...values,didRedirect : true,loading:false});
                      
                  });
              })
              .catch(err => {
                           if(err){
                              
                               setErrorAlert(true)
                               setTimeout(()=>setErrorAlert(false),2000);
                           }          
                           setValues({error: err, loading : false})
                           window.alert("Error singin in ..")
                        });
    };
    const performRedirect = () => {
         if(didRedirect){
            
            return <Redirect to = "/"/>;
         }
         if(isAuthenticated()) return <Redirect to = "/"/>;
    };
const signInForm = () => {
      return (     
        <div className = "container-signin fs-3">
          Login
           <form action="">
              
                <div className="form-group">
                         
                   <input onChange = {handleChange("email")} 
                          value = {email} 
                          className = "form-control" 
                          type="text"
                          placeholder = "Username"/>
                </div>
                <div className="form-group">
                           
                   <input onChange = {handleChange("password")}
                          value = {password} 
                          className = "form-control" 
                          type="password"
                          placeholder = "password"/>
                </div>
                {errorAlert && <TextError className = 'text-danger'>email or password does not match</TextError>}
                <div className = 'd-flex flex-row justify-content-between align-items-end'>
                
                 <button  onClick = {onSubmit} 
                         className ="my-btn btn-rounded ">Login</button>
                 <Link  to = "/reset-pswd" className = '  text-primary fs-4 paswd-link'>Forgot password </Link>        
               </div> 
             </form>            
          
        </div> 
    );
    };
   
    return ( 
        <div>
           <Menu/>
            {loading &&  <div className='fs-3 text-center'>Loading...</div>}
            {error && <div className = 'fs-3 text-center text-danger'>User name or password does not match</div>}
            {signInForm()}   
            {performRedirect()}  
            {/* <p className = "text-center ">Not registered yet! <Link to = "/signup">Sign Up</Link> now!! </p> */}
          
            {/* <p className = "text-white text-center">{JSON.stringify(values)}</p> */}
         </div>
     );
}
 
export default Signin;
