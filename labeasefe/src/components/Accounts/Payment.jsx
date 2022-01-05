import React,{useState,useContext,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../menu';
import ClientContext from '../../context/ClientContext';

import UserContext from '../../context/UserContext';
import InvoiceContext from '../../context/InvoiceContext'

import '../../css/payment.css'
import {createReceipt,getClients, getInvoices,
       getNextReceiptSequence,
       getOrders, updateClient, updateInvoice} from '../../admin/clientApi'
import Modal from '../Modal'
import '../../css/orderDetail.css'
import PaymentInvoiceTable from './Receipt/PaymentInvoiceTable';
import ReceiptContext from '../../context/ReceiptContext';
import { getFormatDate } from '../DateAPI';
import {updateReceipt} from '../../admin/clientApi'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InvoiceListTable from './Receipt/InvoiceListTable';
import DeleteOutline from '@material-ui/icons/DeleteOutline';


const  Payment = (props) =>  {

    const history = useHistory()
    const {user,token} = useContext(UserContext)
    const {clientSelected,setClientSelected} = useContext(ClientContext)
    // const {orders} = useContext(OrderContext)
    const [clients,setClients] = useState([])
    const [orders,setOrders] = useState([])
    const [invoices,setInvoices] = useState([]) 
    const {setInvoiceSelected} = useContext(InvoiceContext)
    const {receiptSelected} = useContext(ReceiptContext)
    const [clientInvoices,setClientInvoices] = useState([])
    const [showModal,setShowModal] = useState(false)
    const [receiptNumber,setReceiptNumber] = useState(null)
    const [update,setUpdate] = useState(false)
    const [message,setMessage] = useState('')
    const [alert,setAlert] = useState(false)
    const [totalAppliedInvoices,setTotalAppliedInvoices] = useState([])
    // const [totalAppliedAmount,setTotalAppliedAmount] = useState(0)
    const [balanceAmount,setBalanceAmount] = useState(0)
    const [drcr,setdrcr] = useState(false)
    const [datafetching,setDatafetching] = useState({
        error : '',
        loading:false
    })
     let temp = []
const {error,loading} = datafetching

 const [values,setValues] = useState({
     amount:0,
     paymentDate : new Date(),
     receiptNo : 0,
     paymentMode : 'Cash',
     paidtoAc : '',
     chequeNo:'',
     notes : '',
     invoicesApplied : [],
     client:'',
     cancelled:false,
 })

const populateClientData = () => {
    if(clientSelected){

      let clientOrders =   orders.filter(order => order.clientId._id === clientSelected._id)
        
    }
}



const validateReceipt = () => {
    if(amount <=0 || totalAppliedInvoices.length<1) return false 
    if(paidtoAc === '') {
        window.alert("Please select the paid to account")
        return false
    }    
    if(paymentMode === 'Cheque'){
        if(chequeNo === '') {
            window.alert("Please Enter valid Cheque Number")
            return false  
        }
    }
    let amountApplied = calculateAmountApplied()
    if(amount < amountApplied){
        window.alert(`Total applied amount ${amountApplied} exceeding  paid amount ${amount}` )
        return false
    }
    if(amount > amountApplied){
        window.alert(`Toatl paid amount ${amount} is more than total applied amount ${amountApplied}`)
        return false
    }
    return true
}
const updateClientBalance = () => {
    let client = {...clientSelected}
    // if(client.balance >= totalAppliedAmount) client.balance -=totalAppliedAmount
    // else if(client.balance < totalAppliedAmount) {
    //     client.balance = totalAppliedAmount-client.balance
    //     client.drcr = true // balane credit 
    // }
    client.balance = balanceAmount
    updateClient(user._id,token,client)
      .then(data => {
          if(data.error){
              window.alert("Error while saving client data")
          }
      })
      .catch(err => window.alert("Error while saving client data"))
}

const updateInvoiceApplied = () => {

    let invoiceList = []
    totalAppliedInvoices.forEach((invoice,index) => {
        let tempInvoice = {...invoice}
            tempInvoice.paid = parseInt(tempInvoice.applied)
            tempInvoice.balance = parseInt(tempInvoice.amount)-tempInvoice.paid       
            delete tempInvoice.applied     

            invoiceList.push(totalAppliedInvoices[index]._id)    

        updateInvoice(user._id,token,{...tempInvoice})
           .then(data => {
               if(data.error){
                window.alert("Error while saving invoice update")
               }
           })
           .catch(err => window.alert("Error while saving invoice update"))
     })
     setValues({...values,invoicesApplied:invoiceList})
}
const createInvoiceList = ()=> {
    let invoiceList = []
    totalAppliedInvoices.forEach(invoice => invoiceList.push(invoice._id) )
    return invoiceList
}
const handleReceiptSave = () => {
  if(validateReceipt()){
      let newBalance =  calculateClientBalance()  
     

      //Update Invoices as per the applied amount for each
      let invoiceList = createInvoiceList()
    
      totalAppliedInvoices.forEach(invoice => {
          let tempInvoice = {...invoice}
              tempInvoice.paid = parseInt(tempInvoice.applied)
              tempInvoice.balance = parseInt(tempInvoice.amount)-tempInvoice.paid       
              delete tempInvoice.applied     
  
         
          updateInvoice(user._id,token,tempInvoice)
             .then(data => {
                 if(data.error){
                  window.alert("Error while saving invoice update")
                 }
                //  else fetchInvoices()
             })
             .catch(err => window.alert("Error while saving invoice update"))
       })
     

    // update the client s balance
     
         
        updateClient(user._id,token,{...clientSelected,balance : newBalance})
            .then(data => {
                if(data.error){   window.alert("Error while saving client data") }  
                // else fetchClients()              
            })
            .catch(err => window.alert("Error while saving client data"))

        
    
     //CREATE RECEIPT
    
     
     
            createReceipt(user._id,token,{...values,receiptNo : receiptNumber,amount,invoicesApplied:invoiceList })
            .then(data => {
                if(data.error){
                    window.alert("Error while creating receipt")
                }
                // else fetchReceipts()
                
            })                 
            .catch(err =>window.alert("Error while creating receipt") )
      
            setInvoiceSelected(null)
            setClientSelected(null)
            history.push('/accounts/receipt')
     
  }  
      
}  
  
//    const {name} = clientSelected
const {amount,paymentDate,paymentMode,paidtoAc,chequeNo,notes} = values
  
 
  
const handleChange = name => event => {

    setValues({...values,[name]:event.target.value})
  
  }
  
const getLastInvoice = (invoiceList) => {
    if(invoiceList.length>1){
       let toBeSorted = [...invoiceList]
        toBeSorted.sort((a,b) => (parseInt(a.invoiceNo) - parseInt(b.invoiceNo))) 
        //list in ascending order so that the  last invoice comes last in the list
       
        let lastInvoice = convertToSequnceString(toBeSorted[toBeSorted.length-1].invoiceNo)
     
        let invoice = invoiceList.filter(i => i.invoiceNo === lastInvoice)
      
        return `#${invoice[0].invoiceNo}   for   Rs.${invoice[0].amount} on ${new Date(invoice[0].invoiceDate).toDateString()}`
    }
    else if(invoiceList.length ===1){
                return `#${invoiceList[0].invoiceNo} for Rs.${invoiceList[0].amount} on ${new Date(invoiceList[0].invoiceDate).toDateString()}`
    }
    else return <div>No Invoices found</div>
    
}  
const onSelectClient = event =>{

   let selectedClientId = event.target.value   
   const selectedClient = clients.filter(client => client._id === selectedClientId)
   setValues({...values,client:selectedClient[0]._id})
   setClientSelected(selectedClient[0]) 
   setBalanceAmount(selectedClient[0].balance)
   setdrcr(selectedClient.drcr) 

   getInvoices()
           .then(data =>{
               if(data.err){
                    window.alert("Error while111 fetching invoices",data.err)
                   
               }
               else{
                   if(data.length > 0){
                       let newData =   data.filter(invoice => (invoice.clientId === selectedClientId )&& (invoice.balance >= 0))
                       
                     
                       setClientInvoices(newData)
                    }
               }
           })
           .catch(err=>{
               window.alert("Error while fetching invoices",err)
           })
           
 }

  
  
  

const applyPayment=() => {   
   //shows all the unpaid invoices 
    setShowModal(true)
}  
const handleModalClose = () => {
   setShowModal(false)
}  
const handleContinue =()=> {    
    if(temp.length >0){
          setShowModal(false)
          let totalApplied = []
          temp.forEach(i => totalApplied.push(clientInvoices[i]))           
          setTotalAppliedInvoices(totalApplied)       
    }
    else window.alert("Please select atleast one Invoice to apply")
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

const getReceiptCode = async () => {
    await getNextReceiptSequence()
        .then(data => {          
            
            setReceiptNumber(convertToSequnceString(data.sequence_val))  
                   })
        .catch(err => {
            setMessage("Error in sequence")
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
        })
}
  
useEffect(()=>{
    (async ()=> {
        setDatafetching({error:'',loading : true})
        const client = await getClients(user._id,token)
        const order = await getOrders(user._id,token)
        const invoice = getInvoices(user._id,token)
        setClients(client)
        setOrders(order)
        setInvoices(invoice)
        setDatafetching({error : '',loading:false})
    })()
    if(receiptSelected){
    //    setClientSelected(receiptSelected.client)
       setUpdate(true)
       setClientSelected(receiptSelected.client)
       setValues({...receiptSelected,client: receiptSelected.client._id ,_id : receiptSelected._id})
       setReceiptNumber(receiptSelected.receiptNo) 
    }
    else{

        getReceiptCode()
        populateClientData()
    }

},[])


const handleInvoiceApplyCancel = index => {
    
    let part1 = totalAppliedInvoices.slice(0,index)
    let part2 = totalAppliedInvoices.slice(index+1)
    let newList = [...part1,...part2]
    setTotalAppliedInvoices(newList)
}
const calculateAmountApplied = () => {
    let totalAmount = 0
    if(totalAppliedInvoices.length > 0)
            totalAppliedInvoices.forEach(invoice => invoice.applied? totalAmount += parseInt(invoice.applied): null )
    
    return totalAmount
}
const handleCashApplied = (paidAmount,index) => {
///Aplllying amount to every invoice selected 

//   let totalAmount = calculateAmountApplied()
//  setTotalAppliedAmount(totalAmount)//total amount applied
    let list =[...totalAppliedInvoices]
    if(paidAmount > 0){    

        list[index].applied = paidAmount
                  
           setTotalAppliedInvoices(list)
         }
         
}

const calculateClientBalance = () => {
    let newBalance = 0
 
    if(drcr){   //if client has credit balance 
     }
    else {
         let amountApplied = calculateAmountApplied()
        if(amountApplied >= balanceAmount){  //paying full or more than outstanding amount
            newBalance =  parseInt(amountApplied) - parseInt(balanceAmount)    
            if(newBalance > 0)setdrcr(true) // excess amount is credited
            setBalanceAmount(newBalance)
            
           
           return newBalance     
        }
        else { // if paying less than the outstanding amount
            newBalance = parseInt(balanceAmount) - parseInt(amountApplied)
            if(newBalance > 0 ) setdrcr(false) 
            setBalanceAmount(newBalance) 
              
           return newBalance     

        }
    }
    
     
}


const  invoiceListModal = () => {



    return (

                <div >
                    <div >
                       
                        <div className ='my-2 w-100 fs-4' >
                           {clientInvoices.length > 0 && <div className = 'w-100'>
                               <table className = 'table'>
                                 <tr>
                                     <th className = 'th'></th> 
                                     <th className = 'th'>Invoice#</th>
                                     <th className = 'th'>Invoice Date</th>
                                     <th className = 'th'>Invoice Amount</th>
                                     <th className = 'th'>Paid</th>
                                     </tr>  
                              { clientInvoices.map((invoice,index) => <tr>
                                         <td className = 'td'><input type = 'checkbox' 
                                                className = 'mx-2 '
                                                value = {invoice._id}                                                
                                                onChange = {()=>{
                                                    //this part saves invoice index  and saves in temp array                                                    
                                                    if(temp.includes(index)){
                                                        let newTemp = temp.filter(i => i !== index) 
                                                        temp = newTemp   
                                                    }
                                                    else  temp.push(index)                                                    
                                                    }}                                              
                                                /></td>
                                         <td className = 'td'>{invoice.invoiceNo}</td>
                                         <td className = 'td'>{new Date(invoice.invoiceDate).toDateString()}</td>
                                         <td className = 'td'>{invoice.amount}</td>
                                         <td className = 'td'>{invoice.paid}</td>
                                   </tr> )}
                                        
                               </table>
                               </div>}
                        </div>
                        <div className="modal-footer">
                            <button className = 'btn btn-info fs-4' 
                                    onClick = {handleContinue}
                                    >Continue</button>
                           <button  className = 'btn btn-info fs-4'
                                    onClick = {handleModalClose} 
                                    >Close</button>
                        </div>
                    </div>
                </div>
           
    )
}

const receiptForm = () => {

    return (
        <div className=" container-100-mdx60-xlx50 fs-4 d-flex flex-column">
        <div className = 'fs-4 my-3'><b>Payment</b></div>
       {clientSelected && <>
                            {/* <div className = 'my-5'><b>Payment</b></div> */}
                            <div>Client : <b>{clientSelected.name}</b> </div> 
                            </>
                 }
        {!clientSelected && <>
                             <div>Client</div>
                             <select name = 'client'
                                     className = 'my-2 payment-container '
                                   //   value = {}
                                     onChange = {onSelectClient}
                                     >
                                    <option> Select Client</option>     
                                 {
                                     clients.map(client => <option key = {client._id} value = {client._id}>{client.name}</option>)
                                 }
                                 </select> 
                            </>}        
        <div className="row ">
            <div className="col ">
                   <div>Amount</div>
                   <input type="number"
                          value = {amount} 
                          disabled = {update}
                          onChange = {handleChange('amount')}                                  
                          />
                </div>    
            <div className="col ">
                   <div>Payment Date</div>
                   {!update && <input type="date"
                          value = {paymentDate}                 //    defaultValue = {new Date().toDateString()} 
                          onChange = {handleChange('paymentDate')}                                  
                          />}
                     {update && <div className = 'border border-dark text-right'>{getFormatDate(paymentDate)}</div>}     
                </div>    
            <div className="col">
                   <div>Receipt#</div>
                   <input type="number"
                          value = {receiptNumber}
                          />
                </div>    
        </div>   

        <div className="row ">
            <div className="col">
                   <div>Payment Mode</div>
                   <select value = {paymentMode} 
                           disabled = {update}
                           onChange = {handleChange('paymentMode')}                                  
                           >
                      <option value = 'Cash'>Cash</option>          
                      <option value = 'Cheque'>Cheque</option>          
                      <option value = 'NetBanking'>NetBanking</option>          
                     </select>
                </div>    
            <div className="col ">
                   <div>Paid to a/c : </div>
                   <select value = {(paymentMode === 'NetBanking')? 'Bank account': paidtoAc} 
                           disabled = {update}
                           onChange = {handleChange('paidtoAc')}                                  
                           >
                      <option></option>
                      <option value = 'Bank account'>Bank account</option>          
                      <option value = 'Cash Account'>Cash Account</option>          
                     </select>
                </div>    
            <div className="col">
                   <div>Cheque/Ref#</div>
                   <input type="number"
                          value = {chequeNo}
                          disabled = {update}
                          onChange = {handleChange('chequeNo')}
                          />
                </div>    
        </div>   
        <div className="row">
             <div>Notes</div>
             <input type = 'text'
                    value = {notes}
                    onChange = {handleChange('notes')}   
                    />
            </div>   
        {!update && <> <div className="row border border-dark " style = {{color :'#000' , fontSize : '1.6rem'}}>
             
             <div><b>Balance : </b>
                    {clientSelected && <span style ={{fontSize : '1.8rem'}}> {clientSelected.balance}</span>}
                     </div>
              
             <div><b>Last Invoice : </b><span style ={{fontSize : '1.8rem'}}>{getLastInvoice(clientInvoices)}</span></div>
             
             <div><b>Last Payment : </b></div>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center border border-dark my-1">
            <div><b>Total Applied : </b>{calculateAmountApplied()}</div>
           {amount >0 &&  <div className = 'btn fs-4 text-primary' onClick = {() => {
                applyPayment()
            }}>Apply Payment</div>
             }
            </div>
            {totalAppliedInvoices.length > 0 && <div>
                <PaymentInvoiceTable     invoices = {totalAppliedInvoices} 
                                         onInvoiceApplyCancel = {handleInvoiceApplyCancel}
                                         onCashApplied = {(amountPaid,index)=>handleCashApplied(amountPaid,index)}
                                         />
                </div>}
           </>
             }
           {update && <div className=" border border-dark my-1">
                <div className = 'd-flex flex-row justify-content-between align-items-center'>
                      <div><b>Total Applied : </b>{amount}</div>
                       <div className = ' fs-4 px-2 '>Balance : {clientSelected.balance} <span>
                            <KeyboardArrowDownIcon sx = {{fontSize : 30}}   />
                        </span>
                        </div>
                  </div>                    
                  <InvoiceListTable  receiptData = {receiptSelected} />
            </div>}  
         <div className = 'd-flex justify-content-between my-2'>
             {update && <div className = 'btn btn-danger fs-4 ' 
                             onClick = {()=> {
                                 let reply = window.confirm(`Receipt # : ${receiptNumber} will be deleted permenantly.
                                               Are you Sure? `)
                                 if(reply){
                                     let newReceipt = {...receiptSelected}
                                     newReceipt.cancelled  = true

                                     updateReceipt(user._id,token,newReceipt)
                                      .then(data => {
                                          if(data.error){
                                            window.alert("Delete request failed")                                         
                                          }
                                          else {
                                              //log data
                                          }
                                      })
                                      .catch(error => {
                                          window.alert("Delete request failed")
                                      })
                                 }               
                             }}
                             >
                      <DeleteOutline  sx = {{fontSize : 40}}/>Cancel Payment</div>
                      }
             {(totalAppliedInvoices.length > 0 || update) && <div className="btn btn-info fs-4" 
                  onClick = {handleReceiptSave}
                  >Save Receipt</div>}

             <div className="btn btn-info fs-4" onClick = {()=> {
                 setClientSelected(null)
                 if(update){
                     history.push('/accounts/receipt')
                 } 
                 else  history.goBack()
                 }}>Cancel</div>
             </div>  
    </div>
    )
}

   return (
        <div className = ''>
            <Menu/>
            {loading && <div className='fs-3 text-center text-secondary'>Loading...</div>}
            {alert && <div className = 'fs-4 text-red'>{message}</div>}
            {showModal && <Modal title = 'Payment Settlemant' onClose = {handleModalClose}>
                            {invoiceListModal()}
                              </Modal>} 
            {receiptForm()} 
            
        </div>
    );
}

export default Payment;