import React,{useState,useEffect,useContext} from 'react';
import InvoiceContext from '../../../context/InvoiceContext';

function InvoiceListTable({receiptData,onClose}) {
   
   const {invoices} = useContext(InvoiceContext)
   
    const [invoiceList,setInvoiceList] =useState([]) 
   
const findInvoices =()=>{

    let list = invoices.filter(invoice => receiptData.invoicesApplied.includes(invoice._id))
    console.log("Invoice List in table :",list)
    return list
}

useEffect(()=>{
     setInvoiceList(findInvoices(receiptData.invoicesApplied))
},[])

    return (
        
        <div >
           
            <div className ='w-100 fs-4 border border-dark rounded ' >
                <div className = 'bg-info d-flex justify-content-between align-items-center p-3'>
                   <div><b>Payment Applied</b></div>
                  {onClose &&  <div className = 'btn fs-3' 
                        onClick = {()=>onClose()} 
                         ><b>X</b></div>}
                </div>
                <div className = 'd-flex justify-content-between'>
                    <div>Receipt# : {receiptData.receiptNo}</div>
                    <div>payment for <span>{invoiceList.length}</span>{invoiceList.length === 1? 'invoice' : 'invoices'}</div>
                </div>
               {invoiceList.length > 0 && <div className = 'w-100'>
                   <table className = 'table'>
                     <tr>
                         <th className = 'th'></th> 
                         <th className = 'th'>Invoice#</th>
                         <th className = 'th'>Invoice Date</th>
                         <th className = 'th'>Invoice Amount</th>
                         <th className = 'th'>Adjusted</th>
                         </tr>  
                  { invoiceList.map((invoice,index) => <tr>
                             <td className = 'td'>{index+1}</td>
                             <td className = 'td'>{invoice.invoiceNo}</td>
                             <td className = 'td'>{new Date(invoice.invoiceDate).toDateString()}</td>
                             <td className = 'td'>{invoice.amount}</td>
                             <td className = 'td'>{invoice.paid}</td>
                       </tr> )}
                            
                   </table>
                   </div>}
            </div>
           
        </div>
    
    );
}

export default InvoiceListTable;