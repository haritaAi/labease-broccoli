import React from 'react';
import { Page, Text, View, Document, StyleSheet,Image} from '@react-pdf/renderer';
import InvoiceOrdeTableHeader from './InvoiceOrdeTableHeader';
import InvoiceItemRow from './InvoiceItemRow'
import InvoiceTotal from './InvoiceTotal';
import InvoiceTaxTotal from './InvoiceTaxTotal';
import InvoiceGrandTotal from './InvoiceGrandTotal'

const styles = StyleSheet.create({

   
  
   
 
 })


function InvoiceItemTable({invoice}) {
    return (
       <View  >
             <InvoiceOrdeTableHeader  />
             <InvoiceItemRow ordersList = {invoice.ordersList}/>
             <InvoiceTotal invoiceTotal = {invoice.amount} 
                           units  = {invoice.totalunits}
                           disc = {invoice.discount}   
                              /> 
             <InvoiceTaxTotal state = 'Gujarat'  taxrate = '0.0'
                              taxAmount='0'  amount = {invoice.amount}
                               />   
             <InvoiceGrandTotal grandTotal ={invoice.amount} amount = {invoice.amount} />                                
       </View>
    );
}

export default InvoiceItemTable;