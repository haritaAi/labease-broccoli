import React,{useContext} from 'react';
import OrderContext from '../../../context/OrderContext';
import ClientContext from '../../../context/ClientContext';
import AdjustmentContext from '../../../context/AdjustmentContext';
import PrintIcon from '@mui/icons-material/Print';
import {Tooltip } from '@material-ui/core';
import {addToPrint} from '../../print/printAPI'
import {getTeethArchset} from './productsApi'


const InvoicePrintIcon = ({invoice}) => {
        
    
     const {orders} = useContext(OrderContext)
     const {clients} = useContext(ClientContext)
     const {adjustments} = useContext(AdjustmentContext)
     




const getOrdersList = () => {


   return  orders.filter(order => invoice.ordersList.includes(order._id))  

}
const getAdjustmentDetail = (adjustmentNo) => {

   const ad = adjustments.filter(adj => adj.adjNo === adjustmentNo)
    return ad[0]

}
const getClient = () => {
    return clients.filter(client => invoice.clientId === client._id)
}
const makeInvoiceToPrint = () =>{
    
        let invoiceOrdersList = getOrdersList()    
        let newOrderList = [...invoiceOrdersList] 
        let clientdata = getClient()                                                
        let totalunits = 0                                                      
        let adjustment = {}
        if(invoice.adjustmentNo)
               adjustment =  getAdjustmentDetail(invoice.adjustmentNo)
               console.log("Adjustment Found :" ,adjustment)
         invoiceOrdersList.forEach((order,index) => {
            let productsList = []    
            let ts = []                                                           
            let units = 0
            let teethList = []
                 if(order.products.length > 0 ){
                 order.products.forEach(product =>{ 
                                                       productsList.push(` ${product.product}`)                                                      
                                                       if(product.teethSelected.length>0)
                                                             ts = [...ts,...product.teethSelected] 
                                                            units += product.teethSelected.length
                                                         })
               }

             newOrderList[index].productsList = productsList.join()
             newOrderList[index].teethSelected = [...ts]
             newOrderList[index].units = units
             totalunits += units                                                            
             teethList = getTeethArchset(newOrderList[index].teethSelected)
            
             newOrderList[index].teethList = [...teethList] 
             })
         
             console.log("Invoice Value sent for  Print :",{...invoice,discount : adjustment.amount,totalunits:totalunits ,ordersList : newOrderList,clientDetail : clientdata})
            
             addToPrint({...invoice,discount : adjustment.amount,totalunits:totalunits, ordersList : newOrderList,clientDetail : clientdata})
    
}


    return (
        <div>
            <Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Print Invoice</div>}>                              
                                                <PrintIcon sx={{fontSize : 30}}  onClick = {()=>{                                                    
                                                    makeInvoiceToPrint()
                                                }}/>
                                         
                                            </Tooltip>
        </div>
    );
}

export default InvoicePrintIcon;