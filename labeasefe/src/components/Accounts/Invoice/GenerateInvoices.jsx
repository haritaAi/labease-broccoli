import React,{useContext,useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import OrderContext from '../../../context/OrderContext';
import OrderInInvoiceForm from './OrderInInvoiceForm';
import ClientContext from '../../../context/ClientContext';
import ClientOrderListTable from './ClientOrderListTable';
import { createInvoice, getNextInvoiceSequence, updateOrder } from '../../../admin/clientApi';
import UserContext from '../../../context/UserContext';


const  GenerateInvoices = (props) =>  {

    const history = useHistory()

  const {user,token} = useContext(UserContext)   
  const {orders,fetchOrders} = useContext(OrderContext)
  const [newOrders,setNewOrders] = useState([])
  const {clients,clientSelected,setClientSelected,onClientSelect} = useContext(ClientContext)  
 
   const [clientOrderList,setClientOrderList] = useState(false)
   const [finalList,setFinalList] = useState([])
   const [message,setMessage] = useState('')
   const [alert,setAlert] = useState(false)
   const [invoiceNumber,setInvoiceNumber] = useState(null)
   let currentInvoiceNumber =''
   
  const getUnivoicedOrders = ()=>{
     if(orders.length>0){
        
        let newOrderSet =  orders.filter(order => order.isInvoiced === false)
        
         setNewOrders(newOrderSet)
     }
  }

  const handleRowSelect = rowsSelected => {
      console.log("Rows Selected in Generate Invoices :",rowsSelected)
      let clientList = []      
      rowsSelected.forEach(order =>clientList.includes(order.clientId)?console.log("skip") :clientList.push(order.clientId))
       console.log("Unique Clients list :",clientList)
       let  orderList =[]
       let temp = []
       clientList.forEach(clientId => {

           orderList =  rowsSelected.filter(order => order.clientId === clientId)
        //    console.log(`Filtered Orders for clientId ${clientId}:`,orderList)
        let tempClient = clients.filter(client => client._id === clientId)
        let total =0;
        let date = new Date()
         orderList.forEach(order => total = total + order.orderAmount)
        temp.push({client : tempClient[0],orderList : orderList,amount:total,due:date})
     })
     setFinalList(temp)
      setClientOrderList(true)
  }

 const generateInvoices = () =>{
      if(finalList.length > 0){
        finalList.forEach(client => {
             
            
            // let oList = client.orderList
            
            // oList.forEach(order => {
                // let newValues = {...order,isInvoiced:true, invoiceNumber : currentInvoiceNumber}
                   
        // updateOrder(user._id,token,newValues)
        //         .then(data => {
        //             if(data.err){
        //                 setMessage("Error during invoicing order")
        //                 setAlert(true)
        //                 setTimeout(()=>setAlert(false),2000)
        //             }
        //             else{
        //                    fetchOrders()
                           
        //             }
        //         })
        //         .catch(err => {
        //             setMessage("Error during invoicing order ")
        //             setAlert(true)
        //             setTimeout(()=>setAlert(false),2000)
        //         })


        //     })

           let values = {
               
                        invoiceNo:invoiceNumber,
                        invoiceDate : new Date(),
                        dueDate : new Date(),  
                        taxOption : 'GST',
                        taxAmount : 0,
                        amount :client.amount,
                        paid : 0,
                        client:client.client.name,
                        clientId : client.client._id,
                        balance:client.amount,
                        ordersList:client.orderList
                 }
           console.log(`Values For Invoice Id ${invoiceNumber} & values are:`,values)      
        //  createInvoice(user._id,token,values)
        //          .then(data => {
        //                  if(data.err){
        //                      window.alert("Error while generating invoice")
 
        //                      }
        //                  else{
        //                      //    fetchInvoices()
        //                      setClientSelected(null)
        //                      setMessage("Invoice generated")
        //                      setAlert(true)
        //                      setTimeout(()=>setAlert(false),2000)
                            
        //                  }
        //          })
        //          .catch(err => {
        //              window.alert("Error while generating invoice")
        //          }              
 
        //          )     

        } )
         
      }
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
const getInvoiceCode = async () => {
    await getNextInvoiceSequence()
    .then(data => {          
        
     setInvoiceNumber(convertToSequnceString(data.sequence_val))  
     currentInvoiceNumber = convertToSequnceString(data.sequence_val)  
     console.log("Invoice Number Recieved is : ",currentInvoiceNumber)  
    })
    .catch(err => {
        setMessage("Error in sequence")
        setAlert(true)
        setTimeout(()=>setAlert(false),2000)
    })
}

  useEffect(()=> {
      getInvoiceCode()
      getUnivoicedOrders()
      setClientSelected(null)
       setClientOrderList(false)
  },[])

    return (
        <div>
            {alert && <div className = 'fs-4 text-red'>{message}</div>}
             {!clientOrderList && <OrderInInvoiceForm rOrders = {newOrders}  onRowSelect = {handleRowSelect} />}
            {clientOrderList && <>
                                  <ClientOrderListTable clientOrderList = {finalList}  />
                                 <div className="d-flex flex-row my-2">

                                  <div className="btn btn-info fs-4 "
                                        onClick = {()=> generateInvoices()}         
                                                 >Save Invoice</div>
                                  <div className="btn btn-info mx-5 fs-4 "
                                       onClick = {()=>history.goBack()  }
                                       >Cancel</div>

                                 </div>
                                 </>}

        </div>
    );
}

export default GenerateInvoices;