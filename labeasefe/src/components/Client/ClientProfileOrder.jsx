import React,{useContext,useState,useEffect} from 'react';
import OrderContext  from '../../context/OrderContext';

import MaterialTable from 'material-table';
import tableIcons from '../../icons/MaterialUiIcons'
import {  Tooltip } from '@material-ui/core';

import InfoIcon from '@mui/icons-material/Info';


const  ClientOrder  =  ({clientSelected}) =>  {


  const {orders} = useContext(OrderContext)
   
  const [newData,setNewData] = useState([])


  const generateNewData = () => {
    if(orders.length>0 && clientSelected){       
      
        let orderStack =  orders.filter(order => order.clientId === clientSelected._id)    
             
       setNewData(orderStack)       
           
 
     }
  }




    const COLUMNS = [
        {title:'Order#',field:'orderNo',maxWidth : '2rem',height:'2rem',
                           cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'}},
        {title:'client',field:'client',height:'2rem',cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'},
                         render : rowData => <div>{rowData.client.toUpperCase()}</div>
                          },
        {title:'products',field:'productsList',height:'2rem',cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'}},
        {title:'Order Amount',field:'orderAmount',height:'2rem',align:'left',
                            cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'},
                             },
        {title:'status',field:'status',width:'10%',height:'2rem',
                                  cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'},
                                  // lookup:{New:'New', InProduction: 'In Production',tryIn: 'Try In',hold:'Hold',complete:'Complete',cancelled : 'Cancelled'} 
                              },
        {title:'Order Date',field:'orderDate',cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'},
                                   render : rowData => <div>{new Intl.DateTimeFormat('en-GB').format(new Date(rowData.orderDate))}</div>
                                //    render : rowData => <div>{console.log(":::::::::::",rowData)}</div>   
                            },         
        {title:'Due Date',field:'duedate',width : '5rem',height:'2rem',
                                cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'},
                                 render : rowData => <div>{new Intl.DateTimeFormat("en-GB").format(new Date(rowData.duedate))}</div>                              
                                },
        
                            ]


// const orderDetail = (rowData) => {
//                                 const{orderno,client,productsList,orderAmount,status,orderDate,updated,duedate} = rowData
                           
//                                return(
//                                    <div>
//                                        <ul>
//                                            <li className = 'd-flex flex-row'>
//                                                <div className = 'w-50'>order # :</div>
//                                                <div className = 'w-50'>{orderno}</div>
//                                            </li>
//                                            <li className = 'd-flex flex-row'>
//                                                <div className = 'w-50'>Client :</div>
//                                                <div className = 'w-50'>{client}</div>
//                                            </li>
//                                            <li className = 'd-flex flex-row'>
//                                                <div className = 'w-50'>Products :</div>
//                                                <div className = 'w-50'>{productsList}</div>
//                                            </li>
//                                            <li className = 'd-flex flex-row'>
//                                                <div className = 'w-50'>Status :</div>
//                                                <div className = 'w-50'>{status}</div>
//                                            </li>
//                                            <li className = 'd-flex flex-row'>
//                                                <div className = 'w-50'>Order Date:</div>
//                                                <div className = 'w-50'>{new Intl.DateTimeFormat('en-GB').format(new Date(orderDate))}</div>
//                                            </li>
//                                            <li className = 'd-flex flex-row'>
//                                                <div className = 'w-50'>Order Amount:</div>
//                                                <div className = 'w-50'>&#x20B9;{orderAmount}</div>
//                                            </li>
//                                            <li className = 'd-flex flex-row'>
//                                                <div className = 'w-50'>Last update :</div>
//                                                <div className = 'w-50'>{new Intl.DateTimeFormat('en-GB').format(new Date(updated))}</div>
//                                            </li>
//                                            <li className = 'd-flex flex-row'>
//                                                <div className = 'w-50'>Due Date :</div>
//                                                <div className = 'w-50'>{new Intl.DateTimeFormat('en-GB').format(new Date(duedate))}</div>
//                                            </li>
                                        
//                                        </ul>
//                                    </div>
//                                )
//                            }
                           

useEffect(()=>{
// console.log("Generating new table")
if(clientSelected  && orders.length>0) generateNewData()
},[])



    return (
        <div className = 'container-fluid'>
        <MaterialTable columns = {COLUMNS}
                       data = {newData}
                       icons = {tableIcons}
                       title = "Order Data"
                    //    detailPanel ={[
                    //     {
                    //      icon: () => <Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem'}}>Order detail</div>}>
                    //                        <InfoIcon sx = {{fontSize : 35}}/></Tooltip>,                           
                    //      render: rowData => {
                    //        return (
                    //          <div
                    //            style={{
                    //              fontSize: 18,
                    //              textAlign: 'left',
                    //              color: '#000',
                    //              backgroundColor: '#f0f0f0',
                    //            }}
                    //          >
                    //           {orderDetail(rowData)}
                    //          </div>
                    //        )
                    //     }
                    //   },
                    // ]}
                    onSelectionChange = {(selectedRows)=> {console.log(selectedRows)}}
                       options={{
                           filtering:true,
                           actionsCellStyle : {border: '1px solid #5c5c5c'},
                           pageSizeOptions:[10,20,50,100],
                           paginationType:'stepped',
                           exportAllData : true,
                           exportFileName:'orderdata',
                           columnsButton:true,                             
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

export default ClientOrder;