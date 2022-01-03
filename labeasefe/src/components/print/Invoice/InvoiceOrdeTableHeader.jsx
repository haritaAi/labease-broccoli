import React from 'react';
import { Page, Text, View, Document, StyleSheet,Image} from '@react-pdf/renderer';
import styles from './stylesheet'



const  InvoiceOrdeTableHeader = (props) => {
    return (
        <View style = {styles.tableHeaders}>        
      
            <View style = {styles.cell}>
               <Text style = {styles.cell1}>#</Text>
               <Text style = {[styles.cellOrderDate,{fontSize:12}]}>Order Date</Text>
               <Text style = {styles.cellPatient}>Patient</Text>
               <Text style = {styles.cellListRate} >List rate</Text>
               <Text style = {styles.cellOrderNo}>Order #</Text>
               <Text style = {styles.cellProduct} >Product</Text>
            </View>
            <View style = {styles.cell}>
                <Text style = {styles.cellTeeth}>Teeth</Text>
                <Text style = {styles.cellUnits}>Units</Text>
                <Text style = {styles.cellRateUnits}  >Rate /unit</Text>
                <Text style = {styles.cellDiscount}>Disc.</Text>
                <Text style = {styles.cellTotalAmount} >Total Amount</Text>
            </View>
       
        </View> 
    );
}

export default InvoiceOrdeTableHeader;