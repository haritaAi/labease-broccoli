import React,{useState,useEffect} from 'react';
import { Redirect,useHistory } from 'react-router-dom';
import {setNewPassword} from './index'

const ResetPassword = (props) => {
     const  history = useHistory() 
     const [values,setValues] = useState({
           npswd : '',
           cpswd : ''
     })
     const [alert,setAlert] = useState(false)
     const [message,setMessage] = useState('') 

 const {npswd,cpswd} = values
const handleChange = name => event => {
    let val = event.target.value
    setValues({...values,[name]:val.trim()})
    console.log(`${name} : ${val}`)
}
useEffect(()=> {

},[])

const validate = () => {
    if(npswd.length>0 || cpswd.length >0){
        let result = npswd.localeCompare(cpswd) 
        if(result === 0) return true
        else {
            window.alert("Both the password should match")
            return false
        }
    }
    else if(npswd.length === 0 ){
        window.alert("Please enter password")
        return false
    }
    else if(cpswd.length === 0){
        window.alert("Please confirm password")
        return false
    }

}

const resetPassword = (e) => {
    const {id,token} = props.match.params
    e.preventDefault()
    if(validate()){
        setNewPassword(id,token,values)
       .then(data => {
           if(data === 400)
           window.alert("Invalid Link")
           else if(data === 200)
           window.alert("Password Updated successfully please Login")
           let origin = window.parent.origin
           window.location.replace(origin)

        
        }
        
        )
       .catch(err => {
           console.log("Error in reser Password",err)
        })
    }
}
useEffect(()=>{
    
},[])

    return (
        <div>
            <form>
            
            <div className="container-signin">
            <div className='fs-4 fw-bold text-dark text-center'>Create New Password</div>
                
                <div className="fs-4 ">
                    <div className='text-dark'>New Password</div>
                    <input className='w-100' type = 'password' onChange={handleChange('npswd')}/>
                </div>
                <div className="fs-4 w-100">
                    <div className='text-dark'>Confirm Password</div>
                    <input  className='w-100' type = 'password' onChange={handleChange('cpswd')} />
                </div>
                <input type = 'submit' 
                       className="btn btn-info fs-4 w-100 my-2" 
                       onClick = {e => resetPassword(e)}/> 
            </div>
            </form>
        </div>
    );
}

export default ResetPassword;