import React,{useContext} from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from '../../../icons/MaterialUiIcons'
import {  TablePagination, Tooltip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from '@mui/icons-material/Info';
import ClientContext  from '../../../context/ClientContext';
import OrderContext from '../../../context/OrderContext';

import '../../../css/orderDetail.css'

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



const  ClientOrderListTable = ({clientOrderList}) => {
     
    const classes = useStyles()
    const {clients,setClientSelected,onClientSelect} = useContext(ClientContext) 
    const {orders} = useContext(OrderContext)
   
  const findClient = id => {
     let result =  clients.filter(client => client._id === id)
     return result[0].name
  }   
  const findOrder = id =>{
      let result = orders.filter(order => order._id === id)
      return result[0]
  }
const getProductString = products => {
    let productsList = []
    products.forEach(product => productsList.push(`${product.product} - ${product.units}`))
    return productsList.join()     
}

  const columns = [
      {title:'client',field:'client.name'},
      {title:'job Total',field:'amount'},
      {title :'Tax',field: ''},
      {title : 'Pay Terms',field :'0'},
      {title :'Amount',field:'amount'},
      {title :'Due Date',field:'due',render : rowData =><div>{new Date(rowData.due).toDateString()}</div> },
      
      
  ]
const orderDetail = rowData => {
    let list = rowData.orderList
     
 
    return (
        <table style ={{minWidth :'100%'}}>
            {console.log("ORDER LIST IN DETAIL :",list)}
            <tr>
                <td>Order#</td>
                <td>Order Date</td>
                <td>Patient</td>
                <td>Products</td>
                <td>Model#</td>
                <td>Shipment#</td>
                <td>Shipment Date</td>
                <td>Order Amount</td>                
            </tr>
            
                
            {list.length > 0 && list.map(order => <tr key = {order._id}>
                                                  <td>{order.orderNo}</td>
                                                  <td>{new Date(order.orderDate).toDateString()}</td>
                                                  <td>{order.patient}</td> 
                                                  <td>{getProductString(order.products)}</td> 
                                                  <td>{order.modelno}</td> 
                                                  <td>{order.shipment}</td> 
                                                  <td>{order.dueDate}</td> 
                                                  <td>{order.orderAmount}</td> 
                                                  </tr>
            )}
        
        </table>
    )
}


return (
    <div className = ' fs-4'>
            {console.log("TABLE RECIEVED : ",clientOrderList)}
            <MaterialTable
                 columns = {columns}
                 data = {clientOrderList}
                 icons = {tableIcons}
                 title = 'New Invoices'
                 detailPanel ={[
                    {
                     icon: () => <Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem'}}>Orders</div>}>
                                       <InfoIcon sx = {{fontSize : 40}}/></Tooltip>,                           
                     render: rowData => {
                       return (
                         <div
                           style={{
                             fontSize: 15,
                             textAlign: 'left',
                             color: '#000',
                             backgroundColor: '#f0f0f0',
                           }}
                         >
                          {orderDetail(rowData)}
                         </div>
                       )
                    }
                  },
                ]}
                 components = {{
                    Toolbar : props => (
                      <div style = {{padding:'10px 0px'}}>
                        <MTableToolbar {...props} />
                        <div>
                          
                        </div>
                      </div>
                    )
                    ,
                      Pagination:props => (
                        
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
                        pageSize:5,
                        padding:'dense',
                        actionsColumnIndex:-1,
                        pageSizeOptions:[5,10,20,50,100],
                        paginationType:'stepped',
                        exportAllData : true,
                        exportFileName:'orderdata',
                        columnsButton:false ,                             
                        rowStyle :(data,index)=> index%2==0?{background:"#f2f2f2"}:null  ,
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

export default ClientOrderListTable;