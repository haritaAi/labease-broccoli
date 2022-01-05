import React,{useState,useEffect,useContext} from 'react';
import InvoiceContext from '../context/InvoiceContext';
import Menu from '../components/menu'

import InvoiceTable from '../components/Accounts/Invoice/InvoiceTable';
// import Invoice from '../components/Accounts/Invoice/Invoice' 
import SubMenuAccounts from '../components/Accounts/SubMenuAccounts'
import {getInvoices} from '../admin/clientApi'

import InvoiceDetail from '../components/Accounts/Invoice/InvoiceDetail'


const  Accounts = (props) => {    
  
    const {invoiceSelected,setInvoiceSelected} = useContext(InvoiceContext)
     const [invoices,setInvoices] = useState([])
    
    
     const [showDetail,setShowDetail] = useState(false)
     const [values,setValues] = useState({
         error:'',
         loading:false
     })


const handleInvoiceSelect = invoice => {

    //    setCurrentInvoice(invoice)
       setInvoiceSelected(invoice)
       setShowDetail(true)
   
}
const fetchInvoices = async () => {
    setValues({error : '',loading:true})
    await  getInvoices()
           .then(data => {
               if(data.error){
                  setValues({error : data.error,loading:false})
               }
               else {
                //    console.log("Invoices generated in Route :",data)
                   setInvoices(data)
                  setValues({error : '',loading:false})

               }
           })
           .catch(error =>{
            setValues({error : error,loading:false})

           } 
              )
 }

  useEffect(()=>{

   fetchInvoices()
   setInvoiceSelected(null)
  },[])   
  
const {error,loading} = values

    return (
        <div >
            <Menu />
           
            <SubMenuAccounts  />
                  {loading && <div className='fs-3 text-center text-secondary'>Loading....</div>}
                   {error && <div className='fs-3 text-center text-secondary'>Error fetching Data</div>}
                   <div className="container">
                                            
                        {!showDetail && invoices.length > 0 &&  <InvoiceTable invoices = {invoices} 
                                                       onInvoiceSelect = {handleInvoiceSelect}                                                     
                                                       path = '/accounts' />}
                        {showDetail && invoiceSelected &&  
                                      <InvoiceDetail invoice = {invoiceSelected} path = '/accounts'/>
                        }
                       </div> 

        </div>
    );
}

export default Accounts;