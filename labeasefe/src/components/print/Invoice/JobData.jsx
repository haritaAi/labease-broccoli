import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet,Image} from '@react-pdf/renderer';
import  Teethdata from './Teethdata'
import styles from './stylesheet';

const stylesNew = StyleSheet.create({
   cell:{
    
      flexDirection:'row',
      borderBottom:'1px solid #000'
   },
  arch:{
     flexBasis:0,
     flexGrow:1,
     borderRight:'1px solid #000',
  }
});

const  JobData = ({teethList}) =>  {

  const upperLeft = teethList[1];
  const upperRight = teethList[2];
  const lowerLeft = teethList[4];
  const lowerRight = teethList[3] 

    const data = <View>               
                  <Text style = { stylesNew.arch}>{upperLeft}</Text>
                  <Text style = {stylesNew.arch}>{upperRight}</Text>     
            <Text style = {stylesNew.arch}>{lowerLeft}</Text>
            <Text style = {stylesNew.arch}>{lowerRight}</Text>
         
         </View> 
    
    return (
        <Fragment>{data}</Fragment>
    );
}

export default JobData;