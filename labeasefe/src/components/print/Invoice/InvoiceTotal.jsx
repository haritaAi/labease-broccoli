import React from 'react';
import {View,Text,StyleSheet} from '@react-pdf/renderer'
import styles from './stylesheet';

const stylesTotal = StyleSheet.create({
    total : {
        flexBasis:0,
        flexGrow:9,
        borderRight:'1px solid #000',
        textAlign:'right',
        paddingRight:30,
    },
    cellUnits : {
        flexBasis : 0,
        flexGrow:0.8,
        borderRight:'1px solid #000'
    },
    cellRateUnits:{
        flexBasis : 0,
        flexGrow:0.8,
        borderRight:'1px solid #000'
    },
    cellDiscount:{
        flexBasis : 0,
        flexGrow:0.8,
        borderRight:'1px solid #000',
        textAlign:'right'    
    },
    cellTotalAmount:{
        flexBasis : 0,
        flexGrow:1.25,
        textAlign:'right'
        
    }

});



const  InvoiceTotal = ({invoiceTotal,units,disc}) => {

  


    return (
        <View style = {{fontWeight:800}}>
            <View style = {styles.tableRow}>
                 <Text style = {stylesTotal.total} >Total : </Text>
                 <Text style = {stylesTotal.cellUnits}>{units}</Text>
                 <Text style = {stylesTotal.cellRateUnits}></Text>
                 <Text style = {stylesTotal.cellDiscount}>{disc}</Text>
                 <Text style = {stylesTotal.cellTotalAmount} >{invoiceTotal}</Text>                 
            </View>
        </View>
    );
}

export default InvoiceTotal;