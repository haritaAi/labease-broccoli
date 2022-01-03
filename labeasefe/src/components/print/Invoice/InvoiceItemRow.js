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
        <View style = {styles.cell}>
        <Text style = {styles.cell1} >{index}</Text>
        <Text style = {styles.cellOrderDate} >{getFormatDate(order.orderDate)}</Text> 
        <Text style = {styles.cellPatient} >{order.patient}</Text>
        <Text style = {styles.cellListRate}>{order.orderAmount}</Text>
        <Text style = {[styles.cellOrderNo,{fontSize:10}]}>{order.orderNo}</Text>
        <Text style = {[styles.cellProduct,{fontSize:10}]}>{order.productsList}</Text>
        </View>
        <View style = {styles.cell}>
          <View style = {styles.cellTeeth}>
                    <View style = {styles.archUp}>
                        <Text style = {styles.archLeft}>{order.teethList[1]}</Text>
                        <Text style = {styles.archRight}>{order.teethList[2]}</Text>     
                        </View>
                      <View style =  { styles.archDown}>
                        <Text style = {styles.archLeft}>{order.teethList[3]}</Text>
                        <Text style = {styles.archRight}>{order.teethList[4]}</Text>     
                      </View>
                  
            </View>        
        <Text style = {styles.cellUnits}>{order.units}</Text>
        <Text style = {styles.cellRateUnits}></Text>
        <Text style = {styles.cellDiscount}>{order.discount}</Text>
        <Text style = {styles.cellTotalAmount} >{order.orderAmount}</Text>
        </View>
        </View>) 
    
    
    
    
    return (
        <Fragment>{rows}</Fragment>
    );
}

export default InvoiceItemRow;