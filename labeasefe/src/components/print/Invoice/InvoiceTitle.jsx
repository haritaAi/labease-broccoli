import React from 'react';
import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  
 
    heading1:{
        fontSize : '14px',    
        alignItems:'center',
    },  
   
  });



const  InvoiceTitle = (props)  => {
    return (
        <View style={styles.heading1}>
            <Text ><b>BILL OF SUPPLY</b></Text>
            <Text>COMPOSITION TAXABLE PERSON</Text>
            <Text>NOT ELIGIBLE TO COLLECT TAX ON SUPPLIES</Text>
        </View>
    );
}

export default InvoiceTitle;