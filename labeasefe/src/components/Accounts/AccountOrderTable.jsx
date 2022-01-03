
import React,{useState,useContext} from 'react';
import OrderContext from '../../context/OrderContext'
import {Link} from 'react-router-dom'
import MaterialTable from 'material-table';
import tableIcons from '../../icons/MaterialUiIcons'
import { TablePagination } from '@material-ui/core';

import UserContext from '../../context/UserContext';
import { makeStyles } from "@material-ui/core/styles";
import ClientContext from '../../context/ClientContext';



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




const AccountOrderTable = (props) =>  {

    const classes = useStyles();

    const {orders,fetchOrders} = useContext(OrderContext)
    const {clients,setClientSelected,onClientSelect} = useContext(ClientContext)
 
    const {user,token} = useContext(UserContext)
    
    const [selectRows,setSelectedRows] = useState(null)
   const [ordersUnInvoiced,setOrdersUnInvoiced] = useState([]) 
   const [message,setMessage] = useState('')
   const [alert,setAlert] = useState(false)   


  const getUninvoicedOrders = ()=> {
         
       if(orders.length>0) {
           
             let ordersData  = orders.filter(order => order.isInvoiced === false)
             setOrdersUnInvoiced(ordersData) 
       }

  }
  

   const COLUMNS = [
    {title:'Order#',field:'orderNo',cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'}},
    {title:'Client',field:'client',cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'},
                          render:rowData => <Link to = '/client/clientprofile'  style = {{textDecoration :'none'}} onClick = {()=>
                           {   let clientSelect = null;
                                clientSelect =   getClientDetails(rowData.clientId)
                               if(clientSelect) setClientSelected(clientSelect)
                              }
                          }>{(rowData.client).toUpperCase()}</Link>},
    {title : 'Patient',field : 'patient',cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'}},                         
    {title:'Products',field:'productsList',cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'}},
    
   
    {title:'OrderDate',field:'orderDate',width:'5rem',height:'2rem',
                               cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'},
                               render : rowData => <div>{rowData.orderDate && <div>{new Intl.DateTimeFormat('en-GB').format(new Date(rowData.orderDate))}</div>}</div>
                              },  
    {title:'Order Amount',field:'orderAmount',align:'left', cellStyle : { fontSize :'1.8rem',border:'1px solid #5c5c5c'}},   
   
    
]



const getClientDetails = (clientId) => {
        
    let clientdetail = clients.filter(client => client._id === clientId)
    if(clientdetail.length>0)  return(clientdetail[0])
          else window.alert("No client found")
}



    return (
        <div className = 'container'>
            {alert && <div className = 'fs-3 text-danger '><b>{message}</b></div>}
            <MaterialTable columns = {COLUMNS}
                           data = {ordersUnInvoiced}
                           icons = {tableIcons}
                           title = "Order Data"
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
                           
                       
                        onSelectionChange = {(selectedRows)=> {setSelectedRows(selectedRows)}}
                           options={{
                               filtering:true,
                               pageSize : 100,
                               pageSizeOptions:[10,20,50,100],
                               paginationType:'stepped',
                               exportButton :true,
                               exportAllData : true,
                               exportFileName:'orderdata',
                               columnsButton:true,    
                               actionsCellStyle:{
                                border:'1px solid #5c5c5c'
                              },                         
                               rowStyle :(data,index)=> index%2==0?{background:"#f2f2f2"}:null  ,
                               selection:true,
                               showSelectAllCheckbox:false,
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
    );
}

export default AccountOrderTable;