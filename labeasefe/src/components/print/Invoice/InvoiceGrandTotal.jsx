import React from 'react';
import {View,Text,StyleSheet} from '@react-pdf/renderer'
import styles from './stylesheet';
import { ToWords } from 'to-words'


const styler = StyleSheet.create({
    
});

const  InvoiceGrandTotal = ({grandTotal,amount}) => {

    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
          currency: true,
          ignoreDecimal: false,
          ignoreZeroCurrency: false,
          doNotAddOnly: false,
        }
      });
    let words = toWords.convert(grandTotal,{currency : true})     
 
    return (
        <View style = {[styles.tableRow,{fontWeight : 900}]}>
              <View style = {{flexBasis:0, flexGrow :4 ,alignContent : 'stretch'}}>
                  <Text >Grand Total : Rs. {words}</Text>
              </View>
              <View style = {{flexBasis:0, flexGrow :1}}>
                  <Text>Rs.{amount}</Text>
              </View>
        </View>
    );
}

export default InvoiceGrandTotal;