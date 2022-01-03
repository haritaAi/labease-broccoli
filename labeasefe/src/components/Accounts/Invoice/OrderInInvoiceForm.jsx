import React,{useContext, useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom'
import MaterialTable from 'material-table';
import tableIcons from '../../../icons/MaterialUiIcons'
import {  TablePagination, Tooltip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import ClientContext from '../../../context/ClientContext'
import OrderContext from '../../../context/OrderContext'


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
  

const  OrderInInvoiceForm = ({rOrders,onRowSelect}) => {

   const classes = useStyles();
   const history = useHistory()
   const {clients,setClientSelected,onClientSelect} = useContext(ClientContext)
   const {orders,setOrderSelected} = useContext(OrderContext)


   const [selectedRows,setSelectedRows] = useState([])
   
   const findClientSelected = (id) => {
    let newClient = clients.filter(client => client._id === id)
      
    return newClient[0]
}


const getProductList = products => {
  let productList = []
  console.log("Products :::",products)
   if(products.length > 0){
      products.forEach(p => productList.push(`${p.product} - ${p.units}` ))
   }
   return productList.join()
   
}


   const columns = [
       {title : 'Order#',field : 'orderNo',maxWidth:'7rem', 
                      render: rowData => <Link style = {{textDecoration : 'none'}} 
                                               to = '/order/newOrder' 
                                               onClick = {()=>setOrderSelected(rowData)}>
                                               {rowData.orderNo}
                                               </Link>},
       {title : 'Order Date',field : 'orderDate',
                     render : rowData => <div>{new Intl.DateTimeFormat("en-GB").format(new Date(rowData.orderDate))}</div>},
       {title : 'Client', field:'client',
                     render : rowData => <Link to = '/client/clientprofile' 
                                               style = {{textDecoration : 'none'}}
                                               onClick = {()=>{
                                                   setClientSelected(findClientSelected(rowData.clientId))
                                               }}
                                   >{rowData.client.toUpperCase()}</Link>},
       {title : 'patient',field : 'patient'},
       {title :'products',field :'',render : rowData => <div>{getProductList(rowData.products)}</div>},
       {title :'Order Amount',field :'orderAmount'},
       
   ]
const handleAddToInvoiceCancel = () => {
  setSelectedRows([])
  // onRowSelect(selectedRows)
  history.goBack()
}

const addToInvoice = () => {
    onRowSelect(selectedRows)
}

 const handleRowSelection = rowsSelected => {
     
    setSelectedRows(rowsSelected)

 }  

useEffect(()=>{

},[])  

return (
  <div className = 'container-fluid'>
          {console.log("Orders received in OrderInInvoiceForm ::::",rOrders)}
          
            <div className = 'border border-info fs-4 mx-auto my-2   '>
                             <div className="d-flex flex-row justify-content-end ">
                                   <div className="btn btn-info text-white fs-3 mx-3 border border-white" 
                                        onClick = {handleAddToInvoiceCancel}>Cancel</div>    
                                   <div className="btn btn-info text-white fs-3 border border-white" 
                                        onClick = {addToInvoice}>Add to Invoice</div>    
                              </div> 
                              
            <MaterialTable  columns = {columns}
                            data = {rOrders}
                            icons = {tableIcons}
                            title = 'Orders'
                            onSelectionChange = {(selectedRows)=> {handleRowSelection(selectedRows)}}
                            // actions = {[
                            //   {icon:()=><Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Cancel</div>}>
                            //              <CancelPresentationIcon sx={{fontSize : 25}} /></Tooltip>,
                            //     onClick:(e,data)=>{  
                            //                             console.log(data)
                            //                             // onCancelOrderInInvoice(data)
                                                      
                            //                           } 
                            //           },
                             
                            // ]}
                            components = {{
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
                           filtering:true,
                           actionsColumnIndex:6,
                           pageSize:50,
                           padding:'dense',
                           pageSizeOptions:[10,20,50,100],
                           paginationType:'stepped',
                           exportAllData : true,
                           exportFileName:'orderdata',
                          //  columnsButton:true,                             
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
        </div>
    );
}

export default OrderInInvoiceForm;