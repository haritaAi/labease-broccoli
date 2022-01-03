import React,{useContext,useEffect, useState} from 'react';
import ClientContext from '../../context/ClientContext';
import InvoiceContext from '../../context/InvoiceContext'
import InvoiceTable from '../Accounts/Invoice/InvoiceTable';
import InvoiceDetail from '../Accounts/Invoice/InvoiceDetail'

const  ClientProfileInvoiceTable= (props) =>  {

 const {invoices,invoiceSelected,setInvoiceSelected} = useContext(InvoiceContext)
 const {clientSelected} = useContext(ClientContext)
 const [clientInvoices,setClientInvoices] = useState([])
 const [showDetail,setShowDetail] = useState(false)
 const [localInvoiceSelected,setLocalInvoiceSelected] = useState(null)
 let inv = {}

const filterClientInvoices = () => {
    
    if(clientSelected){
             if(invoices.length>0){
                  let clientInv = invoices.filter(invoice => invoice.clientId === clientSelected._id)
                     setClientInvoices(clientInv)
                     console.log("client Invoices :",clientInv)
             } 
    }

} 
const handleInvoiceSelect = invoice => {
    inv = {...invoice}
    setLocalInvoiceSelected(invoice)
    setInvoiceSelected(invoice)
    console.log("Invoice Selected in client profile :",inv)
    setShowDetail(true)
}

useEffect(()=>{
    console.log("In Client Invoice detail///////",clientSelected)
   if(clientSelected){
       filterClientInvoices()
   }
},[])
    return (
        <div>
           
           {!showDetail && clientInvoices.length >0 &&
               <InvoiceTable invoices = {clientInvoices} 
                         onInvoiceSelect = {handleInvoiceSelect}
                         path = '/client/clientprofile'
                                   />}
            {showDetail &&  localInvoiceSelected && 
                    <InvoiceDetail invoice = {inv}  path = '/client/clientprofile'/>}  


             
        </div>
    );
}

export default ClientProfileInvoiceTable;