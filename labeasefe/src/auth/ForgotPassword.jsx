import React,{useState} from 'react';
import { useEffect } from 'react';
import '../css/home.css'
import {resetpswd} from './index'


const ForgotPassword = (props) =>  {


    const [values,setValues] = useState({
       email :'',
        
    })
   

  const handleChange = (e) => {
      e.preventDefault()
      setValues({email :e.target.value })
  }
const checkEmail = () => {
    resetpswd(values)
      .then(data => {
          window.alert("Please check email")
        })
        .catch(err => console.log(err))
    }  


useEffect(()=>{
    
},[])
    return (
        <div className='container-reset'  >
        <div className = "container-signin">
              <h3 className = 'text-dark fs-2 text-center'>Password Reset</h3>             
                        <div>Send Reset Link on : </div>          
                              <div className='text-dark'>Email</div> 
                              <input type = 'email'
                                     className='w-75'
                                     onChange={handleChange}
                                    />  
                        
                        <button className='btn btn-primary my-2  w-50 fs-4'
                                onClick={()=>checkEmail()}
                                >Send</button>
                
                         
                         
        
        </div>
        </div>
    );
}

export default ForgotPassword;