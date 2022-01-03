import React,{Fragment} from 'react';
import { Page, Text, View, Document,Image} from '@react-pdf/renderer';
import {getFormatDate} from '../../DateAPI'
import Teethdata from './Teethdata';
import JobData from './JobData'
import styles from './stylesheet'

const sanitize_block = (value) => {
  if(value){
      return value
  }
  else return ' '
}


const InvoiceItemRow = ({ordersList}) =>  {
    
    const rows = ordersList.map(( order,index) => 
      <View style = {styles.tableRow} key = {order._id} >
        <Text style = {styles.cell1} >{index}</Text>
        <Text style = {styles.cellOrderDate}>{getFormatDate(order.orderDate)}</Text>
        <Text style = {styles.cellPatient} >{order.patient}</Text>
        <Text style = {styles.cellListRate}>{order.orderAmount}</Text>
        <Text style = {styles.cellOrderNo}>{order.orderNo}</Text>
        <Text style = {styles.cellProduct}>{order.productsList}</Text>
        <Text style = {styles.cellTeeth}><JobData teethList = {order.teethList} /></Text>        
        <Text style = {styles.cellUnits}>{order.units}</Text>
        <Text style = {styles.cellRateUnits}></Text>
        <Text style = {styles.cellDiscount}>{order.discount}</Text>
        <Text style = {styles.cellTotalAmount}>{order.orderAmount}</Text>
        </View>) 
    
    
    
    
    return (
        <Fragment>{rows}</Fragment>
    );
}

export default InvoiceItemRow;