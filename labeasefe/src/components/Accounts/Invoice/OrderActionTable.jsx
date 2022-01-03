import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom'
import MaterialTable from 'material-table';
import tableIcons from '../../../icons/MaterialUiIcons'
import {  TablePagination, Tooltip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import OrderContext  from '../../../context/OrderContext';
import ClientContext  from '../../../context/ClientContext';


const useStyles = makeStyles({
    root: {
      backgroundColor: "blue",
      color: "green"
    },
    toolbar: {
      backgroundColor: "white"
    },
    caption: {
      color: "black",
      fontSize: "20px"
    },
    selectIcon: {
      color: "blue",
      fontSize:'2rem'
    },
    select: {
      color: "blue",
      fontSize: "2rem"
    },
    actions: {
      color: "blue"
    }
  });
  

const  OrderActionTable = ({rOrders,onRowSelect,showAction}) => {

   const classes = useStyles();
   const {orders,setOrderSelected} = useContext(OrderContext)
   const {clients,setClientSelected} = useContext(ClientContext)
  
   



   const getProductsList = products => {
          
         let productsList = []    
        if(products.length > 0 ){
          products.forEach(product => productsList.push(`${product.product} - ${product.units}`))
           
        }
       
        return productsList.join()  

   }
  

   const columns = [
       {title : 'Order#',field : 'orderNo',maxWidth:'5rem',
                         render : rowData => showAction? <div>{rowData.orderNo}</div> :
                                     <Link style = {{textDecoration :'none'}} 
                                           to = 'order/newOrder'
                                           onClick = {() =>{
                                            setOrderSelected(rowData)
                                           } }
                                            >{rowData.orderNo}</Link>  
                         },
       {title : 'Order Date',field : 'orderDate',maxWidth:'8rem',
                             render : rowData => <div>{new Intl.DateTimeFormat("en-GB").format(new Date(rowData.orderDate))}</div>},
       {title : 'Client', field:'client',render : rowData => <div>{rowData.client.toUpperCase()}</div>},
       {title : 'patient',field : 'patient',maxWidth : '12rem'},
       {title :'products',field :'',render : rowData => <div>{getProductsList(rowData.products)}</div>},
       {title :'Order Amount',field :'orderAmount',maxWidth:'7rem'},
       
   ]


useEffect(()=>{
  // setOrderSelected(null)
},[])
  

    return (
        <div className = 'container-fluid'>
       
            <div className = 'border border-info fs-4 mx-auto my-2   '>                            
                              
            <MaterialTable  columns = {columns}
                            data = {rOrders}
                            icons = {tableIcons}
                            title = 'Orders'
                            
                            actions = {[
                             showAction &&  {icon:()=><Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Cancel</div>}>
                                         <CancelPresentationIcon sx={{fontSize : 25}} /></Tooltip>,
                               onClick:(e,data)=>{  
                                                        
                                                        onRowSelect(data)                                                      
                                                      } 
                                      },
                             
                            ]}
                            components = {{
                                Pagination:props => (
                                  console.log(props),
                                  (
                                    <TablePagination 
                                    component = 'div'
                                    colSpan={props.colSpan}
                                    count={props.count}
                                    rowsPerPage={props.rowsPerPage}
                                    page={props.page}
                                    onChangePage={props.onChangePage}
                                    onChangeRowsPerPage = {props.onChangeRowsPerPage}
                                    classes = {{
                                      root: classes.root,
                                      toolbar:classes.toolbar,
                                      caption:classes.caption,
                                      selectIcon:classes.selectIcon,
                                      select:classes.select,
                                      actions:classes.actions,                                                     
                                    }}
                                    />
                                  )
                                )
                              }}
                      
                         options={{
                           filtering:false,
                           padding:'dense',
                           pageSize:5,
                           search:false,
                           actionsColumnIndex:6,
                           pageSizeOptions:[5,10,20,50,100],
                           paginationType:'stepped',
                           exportAllData : true,
                           exportFileName:'orderdata',
                          //  columnsButton:true, 
                           selection:false,  
                           showTextRowsSelected:false,                      
                           headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF',
                            fontSize:'1.5rem'
                          },
                         style:{
                         fontSize : '1.5rem'
                       } 
                       }}
                  >

            </MaterialTable>
        </div>
        </div>
    );
}

export default OrderActionTable;