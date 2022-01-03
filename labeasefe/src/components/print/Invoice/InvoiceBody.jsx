import React ,{useState,useEffect} from 'react';
import { Page, Text, View, Document, StyleSheet,Image} from '@react-pdf/renderer';
// import InvoiceItemTable from '../InvoicePrint/invoiceItemTable';
import InvoiceItemTable from './InvoiceItemTable';


const styles = StyleSheet.create({

   container : {
    // maxHeight:100,
    flex:1,
   }, 
  heading:{
      flexDirection:'row',
      justifyContent:'space-between',
      fontSize:14,
      padding:2,
  },
  tableContainer : {
    borderLeft:'1px solid #000',
    borderRight:'1px solid #000',
    borderTop:'1px solid #000',
    marginTop:2,

  }, 

})

const  InvoiceBody = ({invoice}) => {
 
    
    const [ordersList,setOrdersList] = useState([invoice.ordersList])
    const [client,setClient]  = useState({...invoice.clientDetail})
    // const [headers,setHeaders] = useState(["#", "order Date","Patient","List rate","Order #","Products","Teeth","Units","Rate/unit","Disc.","Total Amount"])
    
 
 const getInitialValues = async () => {
    if(invoice){
        setOrdersList(invoice.ordersList)
        setClient(invoice.clientDetail)

    }
 }

useEffect(()=>{
        getInitialValues()
 },[])   


    return (
        <View style={styles.container }>
  {invoice && <><View style = {styles.heading}>
                 <Text>{client.salutation}{invoice.client}</Text> 
                 <View style = {{ alignItems :'flex-end'}}>
                       <Text style = {{paddingBottom: 5,textAlign:'right'}}>Invoice#: {invoice.invoiceNo}</Text>
                       <Text style = {{paddingBottom: 5}}>Date : {new Date(invoice.invoiceDate).toDateString()}</Text>
                     </View>       
            </View>
           <View style = {styles.tableContainer} >
             <InvoiceItemTable  invoice = {invoice}  />
           </View>

            </>  
            }
            
        </View>
    );
}

export default InvoiceBody;