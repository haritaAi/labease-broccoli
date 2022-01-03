import React,{useState,useEffect} from 'react';
import { useContext } from 'react';
import {createPaymentMode,updatePaymentMode,deletePaymentMode,getAllPaymentModes} from '../../../admin/clientApi'
import {getAllUPI,createUPI,updateUPI} from  '../../../admin/clientApi'
import UserContext from '../../../context/UserContext'
import Popover from '@mui/material/Popover';

import CloseIcon from '@mui/icons-material/Close';

const  PaymentModes = (props) =>  {
   
    const {user,token} = useContext(UserContext)
    const [update,setUpdate] = useState(false)
    const [paymentmodes,setPaymentmodes] = useState([])
    const [upi,setUpi] = useState({
        vpa :'',
        name :''
    })
    
    const [currentPaymentMode,setCurrentPaymentMode] = useState(null)
    const [showFrom,setShowForm] = useState(false)
    const [anchorEl,setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined;

 const [values,setValues] = useState({
     description :'',
     type : '',
     relAc : '',
     relAcAccess:''
 })



const handleChange = name => event => {

    let val = event.target.value
    console.log(`${name} : ${val}`)
    setValues({...values,[name] : val})

}
const handleSave = () => {
     //save Payment Mode values
     let newValues = {...values}
    //  if(validate(newValues)){     
           
        createPaymentMode(user._id,token,newValues)
        .then(data => {
            if(data.error){
                window.alert("Error Fetching data")
            }
            else{
              getallPaymentmodes()
              setShowForm(false)
                setValues({
                    description :'',
                    type : '',
                    relAc : '',
                    relAcAccess:''
                })
            }
        })
        .catch(err => {
                window.alert("Error Fetching data")
        })
    //  }
}
const getallPaymentmodes = async () => {
   await getAllPaymentModes(user._id,token)
   .then(data => {
    if(data.error){
        window.alert("Error while fetching data")
    }
    else{
         setPaymentmodes(data)
                 }
})
.catch(err => {
    window.alert("Error while fetching data")

})   
}
const handleDelete = (enc) => {
    deletePaymentMode(user._id,token,enc)
    .then(data => {
        if(data.error){
            window.alert("Error while fetching data")
        }
        else{
             getallPaymentmodes(data)
                     }
    })
    .catch(err => {
        window.alert("Error while fetching data")
    
    })   

}
const validate = enc => {
    if(enc.description.length <3){
        window.alert("Please enter valid Payment Mode Name")
        return false
    }   
    else return true
}
 const paymentModeForm = () => {
   return (
       <div>
           <div>
               <div className="fs-4">Description</div>
               <input type = 'text'
                     className='fs-4'
                      value = {values.description}
                      onChange = {handleChange('description')}
                      />
           </div>
           <div>
               <div className="fs-4">Type</div>
               <select className='fs-4'
                       value = {values.type}
                       onChange={handleChange('type')}>
                   <option></option>
                   <option value = 'Cash'>Cash</option>
                   <option value = 'Cheque'>Cheque</option>
                   <option value = 'CreditCard'>CreditCard</option>
                   <option value = 'NetBanking'>NetBanking</option>
                  
               </select>
           </div>
           <div className='fs-4'>
              <div>Related Account</div>
              <select className='fs-4'
                       value = {values.relAc}  
                       onChange={handleChange('relAc')}
                       >
                  <option></option>
                  <option value = 'Bank a/c'>Bank a/c</option>
                  <option value = 'Cash Account'>Cash Account</option>
              </select>
           </div>
           <div>
               <div className="fs-4">Related Account Access</div>
               <select className='fs-4'
                       value = {values.relAcAccess}
                       onChange={handleChange('relAcAccess')}                     
                     >
                   <option></option>
                   <option value = 'Edit'>Edit</option>
                   <option value = 'ReadOnly'>ReadOnly</option>
                   <option value = 'Hide'>Hide</option>
               </select>
           </div>
           <div className="d-flex  my-3">
               <div className="fs-4 btn btn-info px-4" 
                    onClick = {()=>{
                    if(update)handleUpdatePaymentmode()
                     else    handleSave()
                    }}
                    >Save</div>
               <div className="fs-4 btn btn-info mx-5"
                     onClick={() => {
                        setShowForm(false) 
                        setUpdate(false)
                        setValues({
                            description :'',
                            type : '',
                            relAc : '',
                            relAcAccess:''
                           })
                    }}
                     >Cancel</div>
           </div>
       </div>
   )
 }
const handleUpdatePaymentmode = () => {
   
    let newValues = {...values,_id : currentPaymentMode._id}
    console.log("Values to be updated")
    if(validate(newValues)){  
      updatePaymentMode(user._id,token,newValues)
                              .then(data => {
                                  if(data.error){
                                      window.alert("Error while fetching data")
                                  }
                                  else{
                                       getallPaymentmodes()
                                       setUpdate(false)
                                       setValues({
                                        description :'',
                                        type : '',
                                        relAc : '',
                                        relAcAccess:''
                                       })
                                  }
                              })
                              .catch(err => {
                                  window.alert("Error while fetching data")
  
                              })
                          }
}
const handleUpiChange = name => event => {
    let val = event.target.value
    setUpi({...upi,[name]:val})
   
}
const handleUpiSave = ()=>{
    
    if(upi.vpa.length>0 && upi.name.length>0){
          if(upi._id){
             updateUPI(user._id,token,upi)
             .then(data => {
                if(data.error){
                    window.alert("Error Fetching data")
                }
                else{   
                    getUPIsettings() 
                    handleClose()              
                    setUpi({
                        vpa:'',
                        name :''
                    })
                }
            })
            .catch(err => {
                    window.alert("Error Fetching data")
            })
          } 
          else{
            createUPI(user._id,token,upi)
            .then(data => {
                if(data.error){
                    window.alert("Error Fetching data")
                }
                else{    
                    getUPIsettings() 
                    handleClose()             
                    setUpi({
                        vpa:'',
                        name :''
                    })
                }
            })
            .catch(err => {
                    window.alert("Error Fetching data")
            })
          }
         
    }
    else {
        if(upi.vpa.length === 0 ){
                window.alert("Please enter valid VPA")          
        }
        else if(upi.name.length === 0){
               window.alert("Please enter valid Payee Name") 
        }
    }
}
const getUPIsettings = async () => {
     await getAllUPI(user._id,token)
     .then(data => {
      
         setUpi(data[0])
      
     })
     .catch(err => {

     })
}

useEffect(() =>{
    getallPaymentmodes()
    getUPIsettings()
   
},[update])

const paymentModeTable = () => {
   
   return(
    <div>
     {!update &&  <div>
    <div className='fs-3'><b>Available entries:</b></div>
{paymentmodes.length>0 && 
        <div style = {{listStyleType:'none'}} 
            className=''                      >
        { paymentmodes.map((enc,index) => 
                <div className='d-flex flex-row align-items-center justify-content-evenly border border-dark '>
                    <div className='fs-4 '>{index+1}</div> 
                   
                 <div  key = {enc._id} 
                        className='fs-4  d-block px-2 col-7' 
                        >{enc.description}</div>
                      
                        <div className='btn btn-info fs-5 col-2' 
                            onClick={()=>{    
                                setValues(enc)                                  
                            setCurrentPaymentMode(enc)
                            setUpdate(true)

                            }}>Edit</div>                            

                       
                         
                         <div className="btn btn-outline-danger my-1 fs-5 col-2"
                              onClick = {()=>handleDelete(enc)}     
                                   >Delete</div>

                           </div>
                           )}
        </div >}
</div>}
</div>
   ) 
}
const handleClick = event => {
    // getUPIsettings()
    setAnchorEl(event.currentTarget)
}
const handleClose = () => {
    setAnchorEl(null)
  }
const  upiSettings = () => {
    return (
        <div className='fs-4 border border-secondary rounded'>
            <div className=" bg-info p-3 fs-3 fw-bold d-flex  flex-row justify-content-between">
               <div> UPI Pay Settings</div>
               <div className='btn btn-secondary' onClick={handleClose} ><CloseIcon sx ={{fontSize : 25}}/></div>
            </div>
            <div className="row  p-3">
                <div className="col">
                    <div>Payee VPA</div>
                    <input type = 'text'
                           value = {upi.vpa}                          
                           onChange={handleUpiChange('vpa')}
                          />
                </div>
                <div className="col">
                    <div>Payee Name</div>
                    <input type = 'text'
                           value = {upi.name}
                           onChange={handleUpiChange('name')}
                          />
                </div>
            </div>
            <div className='d-flex p-3'>
                <div className="btn btn-info fs-4 px-3"
                      onClick={()=>handleUpiSave()}                      
                      >OK</div>
                <div className="btn btn-info fs-4 mx-5" 
                     onClick = {handleClose}  
                       >Cancel</div>
            </div>
        </div>
    )
} 

    return (
        <div>
           <div className="fs-2 fw-bold">
                Payment Modes  
               </div>
               <div className='d-flex flex-row '>
               <div className="btn btn-info fs-4 px-3"
                     onClick={()=>{
                         setShowForm(true)
                     }}
                     >+Add New</div>
                     <div>
                     <div className="btn btn-info fs-4 mx-5"
                          onClick={handleClick} 
                             >UPI Pay Settings</div>
                         <Popover open = {open}
                                    id = {id}
                                    anchorEl = {anchorEl}
                                    onClose = {handleClose}
                                anchorOrigin = {{
                                    verticle :'top',
                                    horizontal :'left'
                                }}
                            >{upiSettings()}
                        </Popover>
                     </div>
                     </div>
               {(update || showFrom)  && <div>{paymentModeForm()}</div>} 
               <div className='w-50 my-5'>
                {paymentModeTable()}
            </div>
        </div>
    );
}

export default PaymentModes;