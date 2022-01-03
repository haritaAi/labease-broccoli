import React from 'react';
import '../../../css/orderDetail.css'



const  PaymentInvoiceTable = ({invoices,onInvoiceApplyCancel,onCashApplied}) => {



const handleChange = index  => event => {
    console.log("Value : ",event.target.value)
    console.log("Index Of selected invoice :",index)
    onCashApplied(event.target.value,index)
}


    return (
             <div>
                 <table>
                     <tr className = 'tr'>
                         <th className = 'th'>Invoice#</th>
                         <th className = 'th'>Invoice Date</th>
                         <th className = 'th'>Invoice Amount</th>
                         <th className = 'th'>Other Paid</th>
                         <th className = 'th'>Current Payment</th>
                         
                     </tr>
                     {invoices.map((invoice,index) => <tr>
                                      <td className = 'td'>{invoice.invoiceNo}</td>
                                      <td className = 'td'>{new Date(invoice.invoiceDate).toDateString()}</td>
                                      <td className = 'td'>{invoice.amount}</td>
                                      <td className = 'td'>{invoice.paid}</td>
                                      <td className = 'td'><input  type = 'number'
                                                                   style = {{maxWidth : '10rem', 
                                                                                outline:'none' , 
                                                                                border:'none'}}
                                                  onChange = {handleChange(index)} 
                                                   /></td>
                                      <td><div className = 'btn fs-4 text-primary border border-secondary  mx-2'
                                               onClick = {() => onInvoiceApplyCancel(index)}
                                                ><b>X</b></div></td>
                         </tr>)}
                     
                 </table>
             </div>
    );
}

export default PaymentInvoiceTable;