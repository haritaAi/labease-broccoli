import React, { useContext,useState,useEffect } from 'react';
import { useHistory,Link } from 'react-router-dom';
import OrderContext from '../../../context/OrderContext'
import ClientContext from '../../../context/ClientContext'
import UserContext from '../../../context/UserContext'
import InvoiceContext from '../../../context/InvoiceContext';
import AdjustmentContext from '../../../context/AdjustmentContext'
import { getFormatDate} from '../../DateAPI';
import {updateClient, updateInvoice,getAdjustmentByNumber} from '../../../admin/clientApi'
import OrderActionTable from './OrderActionTable'
import AdjustmentForInvoice from '../Adjustment/AdjustmentForInvoice';
import PrintButton from '../../PrintButton';
import {addToPrint} from '../../print/printAPI'
import {getTeethArchset} from '../../../components/Accounts/Invoice/productsApi'


const  InvoiceDetail = ({invoice,path}) => {
 
    const {clients,setClientSelected,clientSelected} = useContext(ClientContext)
    const {invoiceSelected,fetchInvoices} = useContext(InvoiceContext)
    const {orders} = useContext(OrderContext)
    const {adjustments} = useContext(AdjustmentContext)
    const history = useHistory()
    const {user,token} = useContext(UserContext)
    const [message,setMessage] = useState('')
    const [alert,setAlert] = useState(false)
    const [invoiceOrdersList,setInvoiceOrdersList] = useState([])
    const [showAdjustmentDetail,setShowAdjustmentDetail] = useState(false)
   



      const [values,setValues]= useState({
         _id : '', 
        invoiceNo:'',
        invoiceDate:'',
        dueDate:'',  
        taxOption:'',
        taxAmount:'',
        amount:'',
        paid:0,
        balance:0,
        ordersList:[],
        client:'',
        cancelled:'',
      }) 
   
 useEffect(()=> {
     if(invoiceSelected){
         console.log("OrdersList in orderAction form:",invoiceSelected.ordersList)
         let list = orders.filter(order => invoiceSelected.ordersList.includes(order._id))  
         setInvoiceOrdersList(list)            
         setValues({...invoiceSelected,ordersList: invoiceSelected.ordersList})
     }
 },[])
 const {
    _id, 
   invoiceNo,
   invoiceDate,
   dueDate,  
   taxOption,
   taxAmount,
   amount,
   paid,
   balance,
   ordersList,
   client,
   cancelled,
 } = values


const handleAdjustmentSave = adjustment => {
      
} 
const handleAdjustmentCancel = () => {
    setShowAdjustmentDetail(false)
}
const handlePrint = () => {
            //  onClick={()=>window.open('/print/invoice','_blank')}     

}
const generateOrdersTable = () => {
    

    
    return (
        <div>
            {!showAdjustmentDetail && 
              <div>
                <OrderActionTable rOrders = {invoiceOrdersList} onRowSelect = {()=> console.log('Row selected')}/>
                <div className = 'border border-dark d-flex flex-row justify-content-between'>
                    <div>Total Applied : {paid} </div>
                    <div>Balance : {balance}</div>
                    <div className = 'btn btn-info fs-4'
                        onClick = {()=>{
                        
                            setShowAdjustmentDetail(true)
                        }}
                        >Add Credit Adjustment</div>
                </div>
             </div>}
             <div>
                {showAdjustmentDetail &&   
                      <AdjustmentForInvoice invoice = {invoiceSelected}   onAdjustmentCancel = {handleAdjustmentCancel} />}             
             </div>
        </div>
    )
}
const onCancelInvoice = () => {

    let values = {...invoice,cancelled : true}
    //TODO : UPDATE CLIENT BALANCE (DEDUCT THE INVOICE AMOUNT FROM THE BALANCE )
    let updatedClient = {...clientSelected}
    updatedClient.balance -= values.balance
   
updateInvoice(user._id,token,values)
   .then(data => {
    if(data.err){
        window.alert("Error while cancelling invoice")
        }
    else{
           fetchInvoices()
        
        setMessage("Invoice cancelled")
        setAlert(true)
        setTimeout(()=>setAlert(false),2000)
        
       }
       })
        .catch(err => {
        window.alert("Error while canceling invoice")
        })    


updateClient(user._id,token,updatedClient)
        .then(data => {
            if(data.error){
                window.alert("Error Saving Client Detail")
            }
            else{
                setClientSelected(updatedClient)
            }
        })
        .catch(err => {
            window.alert("Error Saving Client Detail")
        }) 

}
const getAdjustmentDetail = (adjustmentNo) => {

   const ad = adjustments.filter(adj => adj.adjNo === adjustmentNo)
    return ad[0]

}

    return (

        <div className = 'container w-100 fs-4'>
        {alert && <div className = 'fs-4 text-red'>{message}</div>}
{ invoiceSelected && <>
           <div>Client</div>
           <div className = 'fs-4'><b>{client}</b></div>
           <div className='d-flex flex-row justify-content-between'>
                <div className = 'd-flex flex-row'>
                        <div>
                            <div className = ''>Invoice#</div>
                            <div style = {{fontSize : '1.6rem'}}>{invoiceNo}</div>
                        </div>
                        <div className = 'mx-5'>
                            <div >Invoice Date</div>
                            {/* <div>{new Date(invoiceDate).toDateString()}</div> */}
                            <div style = {{fontSize : '1.6rem'}}>{getFormatDate(invoiceDate)}</div>
                        </div>
                        <div className = 'mx-5'>
                            <div >Due Date</div>
                            <div style = {{fontSize : '1.6rem'}}>{getFormatDate(dueDate)}</div>
                        </div>
                </div>
                <div className="mx-5">
               
                <Link target={"_blank"}  to = {`/print/invoice/${invoiceSelected._id}`}
                                                   onClick={() => {
                                                       let newOrderList = [...invoiceOrdersList]                                                      
                                                       let totalunits = 0                                                      
                                                       let adjustment = {}
                                                       if(invoiceSelected.adjustmentNo)
                                                              adjustment =  getAdjustmentDetail(invoiceSelected.adjustmentNo)
                                                              console.log("Adjustment Found :" ,adjustment)
                                                       invoiceOrdersList.forEach((order,index) => {
                                                           let productsList = []    
                                                           let ts = []                                                           
                                                           let units = 0
                                                           let teethList = []
                                                                if(order.products.length > 0 ){
                                                                order.products.forEach(product =>{ 
                                                                                                      productsList.push(` ${product.product}`)
                                                                                                     
                                                                                                      if(product.teethSelected.length>0)
                                                                                                            ts = [...ts,...product.teethSelected] 
                                                                                                           units += product.teethSelected.length
                                                                                                        })
                                                              }

                                                            newOrderList[index].productsList = productsList.join()
                                                            newOrderList[index].teethSelected = [...ts]
                                                            newOrderList[index].units = units
                                                            totalunits += units                                                            
                                                            teethList = getTeethArchset(newOrderList[index].teethSelected)
                                                           
                                                            newOrderList[index].teethList = [...teethList] 
                                                            })
                                                        
                                                            console.log("Invoice Value sent for Print :",{...invoiceSelected,discount : adjustment.amount,totalunits:totalunits ,ordersList : newOrderList,clientDetail : clientSelected})
                                                            
                                                            addToPrint({...invoiceSelected,discount : adjustment.amount,totalunits:totalunits, ordersList : newOrderList,clientDetail : clientSelected})
                                                   }}
                                                   > <PrintButton /></Link>
                {/* //  onPrint = {()=>{ if(invoiceSelected){ */}

                    {/* //  window.open(`/print/invoice/${invoiceSelected._id}`,'_blank') */}
                {/* //  }  */}
                {/* // }} */}
                {/* //  /> */}
                </div>
           </div>
           <div className = 'd-flex flex-row'>
               <div>
                   <div>Order Total</div>
                   <div style = {{fontSize : '1.6rem'}}>{amount}</div>
               </div>
               <div className = 'mx-5'>
                   <div >Tax</div>
                   <div style = {{fontSize : '1.8rem'}}>GST @ 0%</div>
               </div>
               <div  className = 'mx-5'>
                   <div>Tax Amount</div>
                   <div style = {{fontSize : '1.8rem'}}>0</div>
               </div>
               <div className = 'mx-5'>
                   <div >Amount</div>
                   <div style = {{fontSize : '1.8rem'}}>{amount}</div>
               </div>
           </div>
          
           <div>
               {generateOrdersTable()}
           </div>
            
         {!showAdjustmentDetail &&  <div className = 'd-flex flex-row justify-content-between my-1'>
              <div className="btn btn-info fs-4"
                   onClick = {() =>{
                       let reply = window.confirm("This will cancel the Invoice, Are you Sure ?")
                       if(reply){

                           onCancelInvoice()
                       }
                       
                   }} 
                    >Cancel Invoice</div>
              <div className="btn btn-info fs-4"
                   onClick = {()=>history.go(path)}
                   >Close</div>
          </div>}
          </>}
        </div>
    );
}

export default InvoiceDetail;