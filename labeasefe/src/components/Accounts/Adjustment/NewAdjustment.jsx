import React,{useEffect, useState,useContext} from 'react';
import {getNextAdjustmentSequence, updateClient,updateInvoice,createAdjustment} from '../../../admin/clientApi'
import ClientContext from '../../../context/ClientContext'
import InvoiceContext from '../../../context/InvoiceContext'
import UserContext from '../../../context/UserContext'
import Popover from '@mui/material/Popover';
import {getOrders,getClients,getInvoices} from '../../../admin/clientApi'


const  NewAdjustment = ({ onAdjustmentCancel}) =>  {

 
  const {setClientSelected,clientSelected} = useContext(ClientContext)
  const {user,token} = useContext(UserContext)
//   const {invoices} = useContext(InvoiceContext)
  const [currentInvoices,setCurrentInvoices] = useState([])
  const [invoiceSelected,setInvoiceSelected] = useState(null)
  const [clients,setClients] = useState([])
  const [invoices,setInvoices] = useState([])
  const [adjustmentNumber,setAdjustmentNumber] = useState()
  const [message,setMessage]  = useState('')
  const [alert,setAlert] = useState(false)
  const [anchorEl,setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined;

  const [values,setValues] = useState({
     amount:0,
     adjDate:new Date(),
     adjNo:'',
     adjType:'Discount',
     notes:'', 
     client:'',
     invoice : '',
          
  })
  const [datafetching,setDatafetching] = useState({
      error:'',
      loading:false
  })

const {error,loading} = datafetching

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

const handleClientSelect = event => {
    let val = event.target.value
    let selectedClient = clients.filter(client => client._id === val)
    console.log("Client Selected id : ",selectedClient[0])
    findInvoicesForThisClient(val)
    setClientSelected(selectedClient[0])
}
const findInvoicesForThisClient = (id) => {
   console.log("Invoices Rceived :",invoices)
   let clientInvoices =  invoices.filter(invoice => invoice.clientId === id && invoice.balance > 0 && invoice.cancelled === false)
   console.log("Invoices for  client:",clientInvoices)
   setCurrentInvoices(clientInvoices)
}
const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
}  
const showInvoices = () => {
  
    return (
      <>
        <div className ='w-100 fs-4 border border-dark rounded ' >
                <div className = 'bg-info d-flex justify-content-between align-items-center p-3'>
                   <div><b>Payment Applied</b></div>
                   <div className = 'btn fs-3' 
                        onClick = {() => handleClose()} 
                         ><b>X</b></div>
                </div>
               
               {currentInvoices.length > 0 && <div className = 'w-100'>
                   <table className = 'table'>
                     <tr>
                         <th className = 'th'></th> 
                         <th className = 'th'>Invoice#</th>
                         <th className = 'th'>Invoice Date</th>
                         <th className = 'th'>Invoice Amount</th>
                         <th className = 'th'>Paid</th>
                         </tr>  
                  { currentInvoices.map((invoice,index) => <tr  style = {{cursor:'pointer'}}
                                                                          onClick = {()=>{
                                                                          setInvoiceSelected(invoice)
                                                                          handleClose()
                                                                          }}>
                             <td className = 'td'>{index+1}</td>
                             <td className = 'td'>{invoice.invoiceNo}</td>
                             <td className = 'td'>{new Date(invoice.invoiceDate).toDateString()}</td>
                             <td className = 'td'>{invoice.amount}</td>
                             <td className = 'td'>{invoice.paid}</td>
                       </tr> )}
                            
                   </table>
                   </div>}
            </div>
            </>
    )
}

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
            // console.log("Adjustment Number :",data.sequence_val)
        })
        .catch(err => {
            setMessage("Error in sequence")
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
        })
}



useEffect(()=>{
    (async ()=> {
        
        setValues({loading:true})
        const client  = await getClients(user._id,token)         
        const invoice = await getInvoices(user._id,token)    
        setClients(client)         
        setInvoices(invoice)       
        setDatafetching({loading:false})      
        
        getAdjustmentCode()
        setValues({...values,adjNo:adjustmentNumber})
    })()
},[adjustmentNumber])


    return (
        <div >
              {loading && <div className='fs-3 text-center text-secondary'>Loading...</div>}
            
         {!clientSelected &&  <div className = 'my-5'>
            <select className = 'fs-4'
                    style = {{width : '60%'}}
                    onChange = {handleClientSelect}
                     >
            <option className = 'mx-3'>Selecte Client for Credit Adjustment</option>
        {clients.map(client => <option className = 'mx-3' value = {client._id}>{client.name}</option>)}
            </select>
            </div>}
            {clientSelected && <h3><b>Client : {clientSelected.name}</b></h3>}
         {currentInvoices.length > 0  && 
            <div className =  ' container  my-5 border border-dark'
                 style = {{maxWidth :'fit-content', marginLeft : 0}}
                 >
                
               <div>
            
            {invoiceSelected &&  
                    <div className="d-flex">
                        <div>
                            <div className="fs-4">Invoice#</div>
                            <div className="fs-4">{invoiceSelected.invoiceNo}</div>
                        </div>
                        <div>
                            <div className="fs-4">Total Amount</div>
                            <div className="fs-4">{invoiceSelected.amount}</div>
                        </div>
                        <div>
                            <div className="fs-4">Other Adjs</div>
                            <div className="fs-4">{invoiceSelected.paid}</div>
                        </div>
                        <div>
                            <div className="fs-4">Balance#</div>
                            <div className="fs-4">{invoiceSelected.balance}</div>
                        </div>
                        <div>
                            <div className="fs-4">Date</div>
                            <div className="fs-4">{invoiceSelected.invoiceDate}</div>
                        </div>
                    </div>}
            { clientSelected &&  currentInvoices.length > 0 && <> <div className="btn btn-info fs-4 mx-2"
                                        onClick = {handleClick} 
                                    >{invoiceSelected?'Change Invoice':'+Select'}</div>
                                    <Popover open = {open}
                                    id = {id}
                                    anchorEl = {anchorEl}
                                    onClose = {handleClose}
                                    anchorOrigin = {{
                                        verticle :'top',
                                        horizontal :'left'
                                    }}
                                    >{showInvoices()}
                                </Popover>
           </> }
                </div>
               

                <div className = 'container my-5 border border-dark'
                    style = {{width : 'fit-content',marginLeft : 0}}  
                        >
                <h2><b>Apply Credit Adjustment to Invoice</b></h2>
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
           </div>
            }
            {currentInvoices.length === 0 && clientSelected && <div className = 'fs-4'>No Invoices for this client 
                                               <span className="btn btn-info fs-4 mx-5"
                                                    onClick = {onAdjustmentCancel} 
                                                     >Back</span></div>
                                              }
       </div>
    );
}

export default NewAdjustment;