import React,{useContext,useState,useEffect} from 'react';
import ClientContext from '../../../context/ClientContext';
import OrderContext from '../../../context/OrderContext';
import UserContext from '../../../context/UserContext';
import InvoiceContext from '../../../context/InvoiceContext';


import ClientOrderTable from '../../ClientOrderTable';
import { createInvoice, getNextInvoiceSequence, updateClient, updateOrder } from '../../../admin/clientApi';
import OrderInInvoiceForm from './OrderInInvoiceForm';
import OrderActionTable from './OrderActionTable'




const NewInvoice = (props) =>  {
  
const {clients,clientSelected,setClientSelected,onClientSelect} = useContext(ClientContext)  
const {invoices,setInvoiceSelected,invoiceSelected} = useContext(InvoiceContext)
const {user,token} = useContext(UserContext)
const {orders,fetchOrders} = useContext(OrderContext)  
const [update,setUpdate] = useState(false)
const [invoiceNumber,setInvoiceNumber] = useState('')
const [message,setMessage] = useState('')
const [alert,setAlert] = useState(false)
const [showOrderTable,setShowOrderTable] = useState(false)
const [showOrdersSelectedTable,setShowOrdersSelectedTable] = useState(false)
const [ordersSelected,setOrdersSelected]  = useState([])//orders to be invoiced
const [clientOrders,setClientOrders] = useState([])//all uninvoiced orders
// ordersList    //orders List invoiced with client and amount detail to be saved along with invoice document


let newClientOrders = []

const [values,setValues] = useState({

    invoiceNo:0,
    invoiceDate : new Date(),
    dueDate : new Date(),  
    taxOption : '',
    taxAmount : 0,
    amount :0,
    paid : 0,
    balance:0,
    cancelled :false,
    adjustment:{},
    discount:0,  
})



const handleChange = name => event => {
    setValues({...values,[name]: event.target.value})
}



const onAddExistingOrders = () => {
    if(clientSelected && clientOrders.length ===0 && ordersSelected.length === 0){
           console.log("Orders received in neInvoice table:",orders)  
           console.log("Client Selected :",clientSelected)
        let clientOrdersArray =   orders.filter(order => order.clientId === clientSelected._id && order.isInvoiced === false )
           console.log("Orders belongnf to  this client are:",clientOrdersArray)
           setClientOrders(clientOrdersArray)
           setShowOrderTable(true)
           setShowOrdersSelectedTable(false)
           
      }
      else if(clientSelected && clientOrders.length > 0){
          
        console.log("Orders belongnf to  this client are**************:",clientOrders,clientOrders.length)
        
        setShowOrderTable(true)
        setShowOrdersSelectedTable(false)
      }
}

     const {invoiceNo,invoiceDate,paymentDueDate,taxOption,taxAmount,amount} = values

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


const getInvoiceCode = async () => {
 
    await  getNextInvoiceSequence()
        .then(data => {          
        
            setInvoiceNumber(convertToSequnceString(data.sequence_val))  
            
        })
        .catch(err => {
            setMessage("Error in sequence")
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
        })
}
const findClientSelected = (id) => {
   let selClient =  clients.filter(client => client._id === id)
   console.log("Client Selected : ",selClient[0])
   return selClient[0]
}

useEffect(()=> {
    if(invoiceSelected){
        setUpdate(true)
        setClientSelected(findClientSelected(invoiceSelected.clientId)) 
        setValues(invoiceSelected)
          console.log("Invoice se;lected",invoiceSelected)
    }
    else{   
    getInvoiceCode()
    setShowOrderTable(false)
    setShowOrdersSelectedTable(false)
    setValues({...values,invoiceNo : invoiceNumber})
   }
},[clientSelected])

const handleRemoveFromInvoiceRowSelect =(rowsSelected) => {
   let newAmount = values.amount
      newAmount = newAmount-rowsSelected.orderAmount
    
    setClientOrders([...clientOrders,rowsSelected])
    
    if(ordersSelected.length > 0){
        let ordersArray  = ordersSelected.filter(order => order._id !== rowsSelected._id)
          setOrdersSelected(ordersArray)
        
          
    }
    
          setValues({...values, amount : newAmount  })
   
    setShowOrderTable(true)
    setShowOrdersSelectedTable(false)
}


const handleAddToInvoiceRowSelect = rowsSelected => {
   console.log("RowSElected IN  aDD to Invoice",rowsSelected)
   let newAmount = values.amount

    setOrdersSelected(() => [...ordersSelected,...rowsSelected])
    if(rowsSelected.length >0){
        rowsSelected.forEach(order => {       
            
            ///remove order from the client order list 
            newClientOrders =clientOrders.filter(o => o._id !== order._id)
            setClientOrders(newClientOrders)                        
            newAmount = newAmount+ order.orderAmount
        })
    }
            
            setValues({...values,
            amount : newAmount,
            balance : clientSelected.balance,
            clientId : clientSelected._id,
            client : clientSelected.name})   
            

           
    // }
    // setClientSelected(null)
    setShowOrderTable(false)
    setShowOrdersSelectedTable(true)
     
   
}
const createOrdersList = () => {
    
    let list = []
    if(ordersSelected.length >0){
        ordersSelected.forEach(order => list.push(order._id))
    }
   return list

}
const updateClientBalance = () => {
    if(clientSelected){
        let cBalance = parseInt(clientSelected.balance)
        let drcr = clientSelected.drcr
       if(drcr){  //drcr = true => client has credit amount 
         
         if(amount >= cBalance){ 
             cBalance = amount-cBalance
             drcr = false 
            }
         else if(amount < cBalance){
              cBalance = cBalance-amount              
              drcr = true
         }
    }
    else{
        cBalance = cBalance+amount
    }
     
    updateClient(user._id,token,{...clientSelected,balance:cBalance,drcr})
       .then(data => {
          if(data.error){
             window.alert("could not update client data")
          }
          
       })
       .catch(err => {
           window.alert('could not update client data')
       })
  }
}

const onSaveInvoice = ()=> {   
  
    let oList =  createOrdersList()
    

    updateClientBalance()
    ordersSelected.forEach(order => {   

        
        let newValues = {...order, isInvoiced : true,invoiceId : invoiceNumber ,invoiceDate : new Date()   }
         
        updateOrder(user._id,token,newValues)
            .then(data => {
                if(data.err){
                    setMessage("Error during invoicing order")
                    setAlert(true)
                    setTimeout(()=>setAlert(false),2000)
                }
                else{
                       fetchOrders()
                       
                }
            })
            .catch(err => {
                setMessage("Error during invoicing order ")
                setAlert(true)
                setTimeout(()=>setAlert(false),2000)
            })
            
            })  
         
         console.log("NEW VALUES :",{...values,ordersList:[...oList]})

           createInvoice(user._id,token,{...values,ordersList:[...oList]})
                .then(data => {
                        if(data.err){
                            window.alert("Error while generating invoice")

                            }
                        else{
                            //    fetchInvoices()
                            setClientSelected(null)
                            setMessage("Invoice generated")
                            setAlert(true)
                            setTimeout(()=>setAlert(false),2000)
                            setValues({

                                invoiceNo:0,
                                invoiceDate : new Date(),
                                dueDate : new Date(),  
                                taxOption : '',
                                taxAmount : 0,
                                amount :0,
                                paid : 0,
                                balance:0,

                            })
                        }
                })
                .catch(err => {
                    window.alert("Error while generating invoice")
                }              

                )     
            

}


const invoiceForm = () => {
    return (
        <div>
            {alert && <div className = 'fs-4 text-red'>{message}</div>}
        {clientSelected &&  
                <div className = 'container-fluid fs-4'>
             <div className = 'border border-dark my-3  '>
               <h2>Create Invoice</h2>
               <hr/>
               <div className = 'd-flex flex-column p-2'>
                           <div>Client : <b>{clientSelected.name}</b></div>
                            <div className="row  my-2 ">
                                <div className="col-4 ">
                                    <div>Invoice#</div>
                                   
                                    <input type = 'text'
                                            value = {invoiceNumber}
                                            // onChange = {handleChange('invoiceNo')}
                                            />
                                </div>
                                <div className="col-4 ">
                                    <div>Invoice Date</div> 
                                        <input type = 'date' 
                                                value = {invoiceDate}
                                                onChange = {handleChange('invoiceDate')}
                                                />
                                </div>
                                <div className="col-4 ">
                                    <div>Due Date</div>
                                    <input type = 'date'
                                           value = {paymentDueDate}
                                           onChange = {handleChange('dueDate')}  
                                                />
                                </div>
                            </div>
                                <div className="row px-3">
                                    <div className = 'col-3'>
                                        <label>Order Total</label>
                                        <div>{amount}</div>
                                    </div>
                                    <div className = 'col-3'>
                                        <div>Tax</div>
                                        <select name="tax" 
                                        style = {{minWidth : '100%'}}
                                                value = {taxOption} 
                                                disabled
                                                onChange = {handleChange('taxOption')}   
                                                    >
                                            <option>1</option>
                                            <option>2</option>
                                        </select>
                                    </div>
                                    <div className = 'col-3'>
                                        <div>Tax Amount</div>
                                        <div>0</div>
                                    </div>
                                    <div className = 'col-3'>
                                        <div>Invoice Amount</div>
                                        <div>{amount}</div>
                                    </div>
                                </div>
                  </div>
                  </div>
                  </div>   }
        {!showOrderTable && clientSelected &&  <div className="container  d-inline-flex flex-row">
            <div className = 'container'>
            <div className="btn btn-info mx-2 fs-4" onClick = {()=> setClientSelected(null)}>Cancel</div>
            {ordersSelected.length > 0 && <div className = 'btn btn-info mx-2 fs-4' 
                                               disabled = {ordersSelected.length>0}
                                               onClick = {onSaveInvoice}>Save Invoice</div> }
            <div className="btn btn-info mx-2 fs-4" onClick = {onAddExistingOrders}>Add Existing Orders</div>
            <div className="btn btn-info mx-2 fs-4">Add New Order</div>
            </div>
        </div>}
        {showOrderTable && clientSelected &&   clientOrders.length>0 &&                           
                    <OrderInInvoiceForm rOrders = {clientOrders} onRowSelect = {handleAddToInvoiceRowSelect}/> }
         {showOrderTable && clientSelected &&   clientOrders.length=== 0 &&
                       <>
                       <div className = 'fs-3 text-center'>No Orders from this client</div> 
                       <div className = 'btn btn-info fs-4 text-center' onClick = {()=>setClientSelected(null)} >Back</div>             
                                      </>}

        {showOrdersSelectedTable && ordersSelected.length>0 &&  <OrderActionTable  rOrders = {ordersSelected}                                                     
                                                        onRowSelect = {handleRemoveFromInvoiceRowSelect} showAction = {true}/>}

        {!clientSelected && <div className = ' text-center  '> 
                <span className = 'text-danger fs-4'><strong>Select Client to create New Order</strong></span>
                            <ClientOrderTable  onClientSelection = {onClientSelect} />
                        </div>}
        </div>
    )
}

useEffect(()=>{
    setClientSelected(null)

},[])
  
    return (
        <div className = 'container-fluid'>          
                      
            { invoiceForm()}           
  
        </div>
    );
}

export default NewInvoice;