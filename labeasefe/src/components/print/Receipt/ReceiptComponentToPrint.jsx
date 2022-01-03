import React,{useEffect,useState}  from 'react';
import {PDFViewer ,StyleSheet } from '@react-pdf/renderer'
import {getToPrintReceipt} from '../printAPI'
import ReceiptTemplate from './ReceiptTemplate';


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

const ReceiptComponentToPrint = (props) =>{

    const [receipt,setReceipt] = useState(null)


    useEffect(()=>{
          let newReceipt = getToPrintReceipt()
          if(newReceipt){
            setReceipt(newReceipt)
          }
    },[]) 
       


    return (
        <PDFViewer style = {styles.page} >             
        {receipt &&  <ReceiptTemplate receipt = {receipt} />}
     </PDFViewer>
    );
}

export default ReceiptComponentToPrint;