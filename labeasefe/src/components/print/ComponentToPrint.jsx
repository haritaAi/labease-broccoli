import React,{useEffect,useState}  from 'react';
import InvoiceTemplate from './InvoiceTemplate';
import {PDFViewer ,StyleSheet } from '@react-pdf/renderer'
import {getToPrint} from './printAPI'


const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
      width : '100%',
      height: '100vh',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });




const   ComponentToPrint = (props)=>  {
 
    const [invoice,setInvoice] = useState(null)


 useEffect(()=>{
       let newInvoice = getToPrint()
       if(newInvoice){
         setInvoice(newInvoice)
       }
 },[]) 
    
   


  return (
    
           <PDFViewer style = {styles.page} >             
              {invoice &&  <InvoiceTemplate invoice = {invoice} />}
           </PDFViewer>          
       
    );

  
    
  


}


export default ComponentToPrint