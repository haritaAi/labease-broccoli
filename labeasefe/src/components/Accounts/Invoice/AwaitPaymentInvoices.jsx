import React,{useEffect,useState} from 'react';
import InvoiceTable from './InvoiceTable';
import {getUnpaidInvoices} from '../../../admin/clientApi'
import InvoiceDetail from './InvoiceDetail';


function AwaitPaymentInvoices(props) {
  
    const [invoices,setInvoices] = useState([])
    const [message,setMessage] = useState('')
    const [alert,setAlert] = useState(false)
    const [currentInvoice,setCurrentInvoice] = useState(null)
    const [showDetail,setShowDetail] = useState(false)

    const fetchUnpaidInvoices = async () => {
        await  getUnpaidInvoices()
               .then(data => {
                   if(data.error){
                      setMessage("Error fetching data")
                      setAlert(true)
                      setTimeout(()=>setAlert(false),2000)
                   }
                   else {
                       setInvoices(data)
                       console.log("invoices recieved from DB:",invoices)
                   }
               })
               .catch(error =>{
                     setMessage("Error fetching data")
                     setAlert(true)
                     setTimeout(()=>setAlert(false),2000)
               } 
                  )
     }

const handleInvoiceSelect = invoice => {
    setCurrentInvoice(invoice)
    setShowDetail(true)
}


useEffect(()=>{
    fetchUnpaidInvoices() 
},[])


    return (
        <div>
           {alert &&  <div className = 'text-red'><b>{message}</b></div>}                      

            {!showDetail && <InvoiceTable invoices = {invoices} 
                                          onInvoiceSelect = {handleInvoiceSelect}
                                          path = '/accounts/invoices'
                                          />}
            {showDetail && <InvoiceDetail invoice = {currentInvoice} path = '/accounts/invoices'/>}

        </div>
    );
}

export default AwaitPaymentInvoices;