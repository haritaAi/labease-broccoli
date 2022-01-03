import React,{useEffect, useState,useContext} from 'react';

import {getNextAdjustmentSequence, updateClient,updateInvoice,createAdjustment} from '../../../admin/clientApi'
import ClientContext from '../../../context/ClientContext'
import InvoiceContext from '../../../context/InvoiceContext'
import UserContext from '../../../context/UserContext'



const AdjustmentForInvoice = ({invoice, onAdjustmentCancel}) =>{

  const {setClientSelected,clientSelected} = useContext(ClientContext)
  const {user,token} = useContext(UserContext)
  

  const [invoiceSelected,setInvoiceSelected] = useState(invoice)
  
  const [adjustmentNumber,setAdjustmentNumber] = useState()
  const [message,setMessage]  = useState('')
  const [alert,setAlert] = useState(false)
  
  
  const [values,setValues] = useState({
     amount:0,
     adjDate:new Date(),
     adjNo:'',
     adjType:'Discount',
     notes:'', 
     client:'',
     invoice : '',
     
  })


  const handleChange = name =>event =>{
       
    setValues({...values,[name]:event.target.value})
    console.log(`${name} : ${event.target.value}`)
}

const updateSelectedInvoice = ()=>{
      
    let invBalance = parseInt(invoiceSelected.balance)-parseInt(amount)

    let newInvoice = {...invoiceSelected,adjustmentNo:adjustmentNumber, balance : invBalance,discount : amount}
    console.log("Invoice values after update :",newInvoice)
     
    updateInvoice(user._id,token,newInvoice)
         .then(data => {
             if(data.error){
                window.alert("Error while saving Invoice Data")

             }
         })
         .catch(err => {
             window.alert("Error while saving Invoice Data")
         })

}

const updateClientBalance = () => {
    
    let newClient = {...clientSelected}
    newClient.balance -= amount 

    console.log("Client Values after update : ",newClient)
    updateClient(user._id,token,newClient)
       .then(data => {
           if(data.error){

            window.alert("error while saving Client data")

           }
       })
       .catch(err => {
           window.alert("error while saving Client data")
       })
}
const handleSave = () => {
    
    let newValues = {...values,adjNo:adjustmentNumber,invoice:invoiceSelected._id,client : clientSelected._id}   
    console.log("New Values Adjustment to save ",newValues)
    createAdjustment(user._id,token,newValues)
          .then(data => {
              if(data.error){
                window.alert("Error Saving new Adjustment")
              }
          })
          .catch(err => {
              window.alert("Error Saving new Adjustment")
          })
//     ///save changes adjustment and blance changed in perticular invoice
//     // save adjustment documnet with current clientSelected && invoiceNo
    updateSelectedInvoice()
    updateClientBalance()
    setClientSelected(null)
   onAdjustmentCancel()
    
}

const {amount,adjDate,adjNo,adjType,notes} = values




const convertToSequnceString = (num) => {

    let newString = num.toString()
  
    let numlength = newString.length
    if(numlength < 6 ){
         for(let i=0; i< 6-numlength ;i++){
             newString = "0"+newString;           
         }
    }
    return newString
 
 } 
const getAdjustmentCode = async () => {
    await getNextAdjustmentSequence()
        .then(data => {           
            setAdjustmentNumber(convertToSequnceString(data.sequence_val))  
            console.log("Adjustment Number :",data.sequence_val)
        })
        .catch(err => {
            setMessage("Error in sequence")
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
        })
}



useEffect(()=>{
    
    getAdjustmentCode()
    setValues({...values,adjNo:adjustmentNumber})
},[])


    return (
        <div >         
         
            
            {invoiceSelected  && 
            <div className =  ' container  my-5 border border-dark'
                 style = {{maxWidth :'fit-content', marginLeft : 0}}
                 >               
               
               

               
                <h2><b>Apply Credit Adjustment to Invoice# : {invoiceSelected.invoiceNo}</b></h2>
                {alert && <div className = 'fs-4 text-red'>{message}</div>}

                    <div className = 'd-flex flex-column flex-md-row   fs-4 '>
                        <div>
                                <div>Amount</div>
                                <input type = 'number'
                                    value = {amount}
                                    onChange = {handleChange('amount')}
                                    />                       
                        </div>  
                        <div className = 'mx-4'>
                                <div>Adjustment Date</div>
                                <input  type = 'date'
                                        value = {adjDate}
                                        onChange = {handleChange('adjDate')}   
                                        />
                        </div>
                        <div>
                            <div>Reference#</div>
                            <input   type ='text'
                                    value = {adjNo}
                                    /> 
                            </div> 
                        </div> 
                    
                            <div className = 'fs-4'>
                                <div>Adjustment Type</div>
                            <select type = 'text'
                                    value = {adjType} 
                                    onChange = {handleChange('adjType')}  
                                    >
                                <option value = 'Discount' >Discount</option>
                                <option value = 'Early Payment Discount' >Early Payment Discount</option>
                                <option value = 'Sales Return' >Sales Return</option>
                                <option value = 'Write Off' >Write Off</option>
                                
                                </select>                      
                            </div>
                            <div className = 'fs-4'>
                                <div>Notes</div>
                                <input  type = 'text'
                                        value = {notes}
                                        onChange = {handleChange('notes')}
                                        />
                            </div>
                            <hr/>
                            <div className = 'd-flex flex-row justify-content-end my-2' >
                               {amount > 0 && invoiceSelected &&   <div className = 'btn btn-info  fs-4 mx-5'
                                    onClick ={handleSave}
                                    >Save Adjustment</div>}
                                <div className="btn btn-info fs-4 "
                                      onClick = {onAdjustmentCancel}   
                                         >Cancel</div>
                            </div>
                </div>
           
            }
       </div>
    );
}

export default AdjustmentForInvoice;
