import React from 'react';
import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';
import {getFormatDate} from '../../../components/DateAPI'
import { ToWords } from 'to-words'


const styles = StyleSheet.create({
    body:{
        fontSize:12,
        fontWeight:'medium',
        
    },
    date:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical : 10
    },
    bold:{
        fontSize:14,
        fontWeight :900,
    },
    amnt : {
        fontSize :15,
        fontWeight : 1000,
        padding:5,
              
    }
});


const ReceiptBody = ({receipt}) => {


   const client = `${receipt.client.salutation} ${receipt.client.name}`
   const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: false,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
    }
  });
  let words = toWords.convert(receipt.amount) 
  
  
   let rDate = getFormatDate(new Date())
    return (
        <View style = {styles.body}>
              <Text style = {[styles.bold,{marginVertical:10}]}>{client}</Text>
          <View style = {styles.date}>
                <View style = {{flexDirection :'row'}} >
                        <Text style = {styles.bold}>Date </Text>
                        <Text>{rDate}</Text>
                        
                </View>
                        <Text style = {styles.bold}>Doc #.{receipt.receiptNo}</Text>
            </View>  
            <View>
                <Text>Received with thanks from  {client} a sum of {words} by {receipt.paymentMode}{' '}
                      towards professional charges.   </Text>
            </View>
            <View style = {{border:'1px solid #000', maxWidth:150,marginVertical : 10 }}>
                <Text style = {styles.amnt} >Rs.{receipt.amount}</Text>
            </View>
        </View>
    );
}

export default ReceiptBody;