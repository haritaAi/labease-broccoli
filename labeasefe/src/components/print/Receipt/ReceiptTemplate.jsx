import React from 'react';
import img  from  '../../../images/logo-print.jpg'
import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';
import ReceiptHeader from './ReceiptHeader';
import ReceiptBody from './ReceiptBody';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      color : '#000',
       
    },
    section: {
      margin: 7,
      padding: 10,
      flexGrow: 1
    },
    heading1:{
        textAlign :'center',
        fontSize : '14px',
        fontWeight : 'heavy'
    },  
    fontStyle:{
        font:'Times New Roman',
        fontWeight:'bold',
    }, 
    image : {
        width : '10%',
    }
  });



const ReceiptTemplate = ({receipt}) =>{
    return (
        <Document>
            <Page size = 'A4' style = {styles.Page}>
                  <View style = {styles.section}>
                        <ReceiptHeader client = {receipt.client} />
                        <Text style = {styles.heading1}>Receipt</Text>
                        <ReceiptBody receipt = {receipt}  />   
                  </View>
            </Page>
        </Document>
    );
}

export default ReceiptTemplate;