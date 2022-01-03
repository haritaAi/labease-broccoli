import React from 'react';
import {View,Text,StyleSheet} from '@react-pdf/renderer'
import styles from './stylesheet';

const stylesTax = StyleSheet.create({
    cellLeft :{
        flexBasis : 0,
        flexGrow:1,
        borderRight:'1px solid #000',
        alignContent:'center',
    },
    cellRight:{
        flexBasis : 0,
        flexGrow:1,
        // borderRight:'1px solid #000',
        flexDirection: 'column',
    },
    celllower:{
        flexBasis : 0,
        flexGrow:1 ,
         flexDirection : 'row',
        
    }
});


const InvoiceTaxTotal = ({state,taxrate,taxAmount,amount}) =>{
    return (
        <View style = {[styles.tableRow,{minHeight : 35}]}>
            <View style = {stylesTax.cellLeft}>
                <Text >State : {state.toUpperCase()}</Text>
            </View>
            <View style = {stylesTax.cellRight}>
              <View style = {[stylesTax.celllower,{borderBottom : '1px solid #000'}]}>
                   <Text style = {{flexBasis : 0,flexGrow:1 ,textAlign:'right'}}>GST @ {taxrate}</Text>
                   <Text style = {{flexBasis : 0,flexGrow:1 ,textAlign :'right'}}>{taxAmount} </Text>
              </View>
              <View style = {{flexBasis : 0,flexGrow:1 , flexDirection : 'row',}}>
                   <Text style = {{flexBasis : 0,flexGrow:1 ,textAlign:'right'}}>Invoice Total</Text>
                   <Text style = {{flexBasis : 0,flexGrow:1 ,textAlign :'right'}}>{amount}</Text>
              </View>
            </View>
           
        </View>
    )
}

export default InvoiceTaxTotal