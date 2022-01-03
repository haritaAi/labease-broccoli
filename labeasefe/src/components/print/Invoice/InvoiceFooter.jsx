import React from 'react';
import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({

    container : {     
     flex:1,
     justifyContent:'flex-start',
     fontSize:10,
     fontWeight:300,
     marginTop:100,
    }, 
 
 })


const InvoiceFooter =({client})=> {
    let gstin = ''
    

    if(client.company===1){
          gstin = 'GSTIN:24AJSPT8576H1ZA'
    }
    else if(client.company === 2){
        gstin = 'GSTIN:24AJSPT8576H1ZA'  
    }
    else if(client.company === 3){
        gstin = 'GSTIN:24AJSPT8576H1ZA' 
    }
    else {
        gstin = 'GSTIN:24AJSPT8576H1ZA'
    }
 




    return (
        <View style = {styles.container}>
            <Text>{gstin}</Text>
           
           
        </View>
    );
}

export default InvoiceFooter;