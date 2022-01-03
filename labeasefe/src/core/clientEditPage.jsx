import React ,{useState, useContext, useEffect} from 'react';
import ClientContext from '../context/ClientContext';
import UserContext from '../context/UserContext';
import * as Yup from 'yup'
import {updateClient} from '../admin/clientApi'
import TextError from '../components/TextError';
import Menu from '../components/menu'
import SubMenu from '../core/SubMenu'


const  ClientEditPage = ({onUpdateSuccess}) => {



  const {user,token } = useContext(UserContext)
  const [success,setSuccess] = useState(false)
  const [initialValues,setInitialValues] = useState({})
  const [errorAlert,setErrorAlert] = useState(false)
  const {clients,clientSelected,fetchClients,setPathRedirect} = useContext(ClientContext)



  const blankValues = {
       
    name : '',
    email :'',
    address1 : '',
    address2:'',
    location:'',
    state:'',
    phoneO:'',
    phoneR:'',
    phoneM:'',
}


useEffect(()=>{

     setInitialValues({...clientSelected})
},[clientSelected])
 


const handleChange = name => event => {
    event.preventDefault()
    const value = event.target.value;
   
    setInitialValues({...initialValues,[name]:value})
} 
    


const handleSubmit =  (e) => {

       e.preventDefault()
        
        updateClient(user._id,token,initialValues)                     
                    .then(data  => {   
                                         
                        if(data.status !== 200){
                            
                            setInitialValues({...initialValues,error:data.error})
                            setErrorAlert(true)
                            setTimeout(()=>setErrorAlert(false),2000)
                        }
                        else{                         

                           setSuccess(true);    
                           setInitialValues({...blankValues})                       
                           setTimeout(() =>setSuccess(false),2000)
                           onUpdateSuccess()  
                        }
                    })
                    .catch(err => {
                        console.log("error: ",err)
                        setErrorAlert(true)
                        setTimeout(()=>setErrorAlert(false),2000)
                    }
                            )

          
                }


   const clientForm = () => {

    const {name,email,phoneO,phoneM,phoneR,address1,address2,location,state} = initialValues

       return (
           <form className = "m-5 " onSubmit = {handleSubmit}>
                   <div className="form-group fs-4 ">
                            <label className="text-dark">Name</label>
                            <input  value ={name} 
                                    onChange = {handleChange("name")} 
                                    placeholder="Name"
                                    className = "form-control" 
                                    type="text"/>
                        </div>   
                    <div className="form-group mt-2 fs-4">
                        <label className="text-dark">email</label>
                        <input  value ={email} 
                                onChange = {handleChange("email")} 
                                placeholder="email"
                                className = "form-control" 
                                type="email"/>
                    </div>   

                    <div className="form-group mt-3 fs-4">
                        <label className="text-dark">Office contact</label>
                        <input  value ={phoneO} 
                                onChange = {handleChange("phoneO")} 
                                placeholder="office phone number"
                                className = "form-control" 
                                type="number"/>
                    </div>    
                    <div className="form-group mt-3 fs-4">
                        <label className="text-dark">Mobile </label>
                        <input  value ={phoneM} 
                                onChange = {handleChange("phoneM")} 
                                placeholder="Mobile number"
                                className = "form-control" 
                                type="number"/>
                    </div>    
                    <div className="form-group mt-3 fs-4">
                        <label className="text-dark">Residence </label>
                        <input  value ={phoneR} 
                                onChange = {handleChange("phoneR")} 
                                placeholder="Residence contact number"
                                className = "form-control" 
                                type="number"/>
                    </div>   
                    <div className="form-group mt-3 fs-4">
                        <label className="text-dark">Address </label>
                        <input  value ={address1} 
                                onChange = {handleChange("address1")} 
                                placeholder="Room / Building number"
                                className = "form-control" 
                                type="text"/>
                    </div> 
                    <div className="form-group mt-3 fs-4">
                        <label className="text-dark">Street  </label>
                        <input  value ={address2} 
                                onChange = {handleChange("address2")} 
                                placeholder="Street address/Landmark"
                                className = "form-control" 
                                type="text"/>
                    </div>   
                    <div className="form-group mt-3 fs-4">
                        <label className="text-dark">Location </label>
                        <input  value ={location} 
                                onChange = {handleChange("location")} 
                                placeholder="area/city"
                                className = "form-control" 
                                type="text"/>
                    </div>  
                    <div className="form-group mt-3 fs-4">
                        <label className="text-dark">State </label>
                        <input  value ={state} 
                               onChange = {handleChange("state")} 
                                placeholder="state"
                                className = "form-control" 
                                type="text"/>
                    </div>  
                    <button className = 'btn btn-info fs-3 mt-5'
                            type = 'submit'>Update</button>
           </form>
       )
   } 
    return (
        <>
        <Menu/>
        <div className = "container">
            <SubMenu />
    
         Client id : {clientSelected._id}
        {/*  {success && <div  className = "alert alert-warning alert-dismissible  fade  show" >
                        Client Updated successfully</div> }
        {errorAlert && <TextError ><h2>Error while updating Client data!</h2></TextError> }
        {clientForm()} */}
        </div>
        </>
    );
}

export default ClientEditPage;