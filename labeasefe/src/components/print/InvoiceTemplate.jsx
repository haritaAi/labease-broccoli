import React,{useContext} from 'react';
import img  from  '../../images/logo-print.jpg'
import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';

import InvoiceHeader from './Invoice/InvoiceHeader';
import InvoiceTitle from './Invoice/InvoiceTitle';
import InvoiceBody from './Invoice/InvoiceBody';
import InvoiceFooter from './Invoice/InvoiceFooter';



const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      color : '#000',
       
    },
    section: {
      margin: 10,
      padding: 15,
      flexGrow: 1
    },
    heading1:{
        textAlign :'center',
        fontSize : '14px',
    },  
    fontStyle:{
        font:'Times New Roman',
        fontWeight:'bold',
    }, 
    image : {
        width : '10%',
    }
  });


const InvoiceTemplate = ({invoice}) =>  {
   



    return (
        <Document>       
            <Page size = "A4" style = {styles.page}>                        
                       <View style={styles.section}>
                           <InvoiceTitle />            
                           <InvoiceHeader client = {invoice.clientDetail} />
                           <InvoiceBody  invoice = {invoice} />
                           <InvoiceFooter client = {invoice.clientDetail}/>
                       </View>       
                    
                </Page>
            </Document>    
    );
}

export default InvoiceTemplate;