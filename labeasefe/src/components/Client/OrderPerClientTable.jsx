import React,{useState,useEffect,useContext} from 'react';
import {Link} from 'react-router-dom'
import Menu from '../../components/menu'
import SubMenu from '../../core/SubMenu';
import ClientContext  from '../../context/ClientContext'
import OrderContext from '../../context/OrderContext'
import MaterialTable from 'material-table';
import {  TablePagination, Tooltip } from '@material-ui/core';

import EditIcon from '@mui/icons-material/Edit';
import MoneyIcon from '@mui/icons-material/Money';
import tableIcons from '../../icons/MaterialUiIcons'
import FlipToFrontRoundedIcon from '@mui/icons-material/FlipToFrontRounded';
import { makeStyles } from "@material-ui/core/styles";
import '../../css/order.css'
import {getClients,getOrders} from '../../admin/clientApi'
import UserContext from '../../context/UserContext';



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


function OrderPerClientTable({onNewPayment}) {


  const {user,token} = useContext(UserContext)
  const {onClientSelect,setClientSelected,setPathRedirect,setRedirect} = useContext(ClientContext)
  // const [clients,setClients] = useState([])
  // const [orders,setOrders] = useState([])
  const [data,setData] = useState([])
  const [values,setValues] = useState({
    error:'',
    loading:false
  })
 

  // const {orders} = useContext(OrderContext)
   const classes = useStyles();
  


   const [newData,setNewData] = useState([])




  

const getNewTable = (data1,data2) =>{
 const orders = [...data2]
 const clients = [...data1]

     if(orders.length>0){
       let newDataStack = []
     
     clients?.forEach(client => {
      
      let orderStack =  data2.filter(order => order.clientId._id === client._id)
      
      if(orderStack.length>0){
            
           newDataStack.push({client,orders :orderStack ,value : calculateTotalOrderValue(orderStack) , num:calculateNumberOfOrders(orderStack)})  
      }
            
         setNewData(newDataStack)
          
     })  

    }
  }
  const calculateTotalOrderValue = (ordersData) => {
           let total  = 0;
           ordersData.forEach(order => total+=order.orderAmount )
           return total
  }
 const calculateNumberOfOrders = (ordersData) => {
   let total = 0
   ordersData.forEach(order => total+=order.products.length )
   return total

 }


  const columns = [
    {title : 'Client', field:'client.name',
             cellStyle : { fontSize :'1.6rem',paddingLeft:'1rem',border:'1px solid #5c5c5c'}, defaultSort:'asc',
             render:rowData =>
                    <Link to = '/client/clientprofile' 
                          style = {{textDecoration:'none'}} 
                          onClick = {()=>  setClientSelected(rowData.client)}>
                      {(rowData.client.name).toUpperCase()}
                      </Link>
                      },
    {title:'Value',field : 'value',align : 'left',
             cellStyle : { fontSize :'1.8rem',padding:'1rem',border:'1px solid #5c5c5c'},
             type: 'currency' ,currencySetting: { currencyCode :'INR'}},
    {title : 'Num',field : 'num', align : 'center',maxWidth:'3rem' ,
             cellStyle : { fontSize :'1.6rem',padding:'1rem',border:'1px solid #5c5c5c'}},
    {title:'code',field : 'client.code',align : 'center',
             cellStyle : { fontSize :'1.6rem',padding:'1rem',border:'1px solid #5c5c5c'},
             render : rowData => 
                 <Link to = '/client/newclient'
                        style = {{textDecoration :'none'}}
                        onClick={()=> setClientSelected(rowData.client)}
                        >{rowData.client.code}</Link>
            },
    {title :'Office Phone',field : 'client.phoneO',align : 'left',
             cellStyle : { fontSize :'1.6rem',padding:'1rem',border:'1px solid #5c5c5c'}},
    {title : 'Cell Phone',field : 'client.phoneM',align : 'left',
             cellStyle : { fontSize :'1.6rem',padding:'1rem',border:'1px solid #5c5c5c'}},
    {title : 'City',field : 'client.city',align : 'left',
             cellStyle : { fontSize :'1.6rem',padding:'1rem',border:'1px solid #5c5c5c'}},
    {title : 'email',field : 'client.emailPrimary',align : 'left',
             cellStyle : { fontSize :'1.6rem',padding:'1rem',border:'1px solid #5c5c5c'},sorting:false}
  ]
 
useEffect(()=>{
   
 
  (async ()=> {
        setValues({loading:true})
        const client  = await getClients(user._id,token)
        const order = await getOrders(user._id,token)       
        getNewTable(client,order)
        setData({client,order})  
        setValues({loading:false})      
        
  })()
   
},[])




const onOrderClient =(data)=>{
  
  setPathRedirect('/order/neworder')
  onClientSelect(data.client)
  setRedirect(true)

}
const onEditClient = (data) => {
  
  setPathRedirect('/client/newclient')
  setClientSelected(data.client)
  // onClientSelect(data.client)
  setRedirect(true)

}
 const {loading,error} = values


    return (
        <div>         
               <Menu />
                <div className = 'container'>                                  
                         <SubMenu />                    
                             {loading  && <div className='fs-3 text-secondary text-center'>Loading...</div>} 
                             {error && <div className='fs-3 text-danger text-center' >Error fetching data</div>}
                             
                            <div className="row  fs-4">                                                              
                              
                                <MaterialTable columns = {columns}
                                                data = {newData}
                                                icons = {tableIcons}
                                                title = 'Client-Orders'
                                                actions={[
                                                        {icon:()=><Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Create Order</div>}>
                                                        <FlipToFrontRoundedIcon  sx={{fontSize : 25}} /></Tooltip>,
                                                        iconProps:{style : {border:'1px solid #5c5c5c'}},
                                                        onClick:(e,data)=>{  
                                                                    onOrderClient(data)
                                                                  
                                                                  } 
                                                    },
                                                    {
                                                      icon:()=><Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Edit Client</div>}>
                                                                 <EditIcon sx={{fontSize : 25}}/></Tooltip>,
                                                      onClick:(e,data)=>{ 
                                                                          onEditClient(data)
                                                                          }
                          
                                                      },
                                                      {
                                                        icon:()=><Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>New Payment</div>}>
                                                                   <MoneyIcon sx={{fontSize : 25}}/></Tooltip>,
                                                        onClick:(e,data)=>{ 
                                                                            onEditClient(data)
                                                                            }
                            
                                                        }
                                                ]}
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
                                                options = {{
                                                   filtering : true, pageSizeOptions:[5,10,20,50,100],rowsPerPage:25
                                                  ,paginationType:'stepped',exportAllData : true,
                                                   exportFileName : 'clientdata',addRowPosition:"first",
                                                   actionsColumnIndex:0,
                                                   padding:'dense',
                                                   actionsCellStyle:{
                                                     border:'1px solid #5c5c5c',
                                                    
                                                   },
                                                   columnsButton:true,
                                                   rowStyle :(data,index)=> index%2==0?{background:"#f2f2f2",height:'2rem'}:{height:'2rem'}  ,
                                                  
                                                   headerStyle: {
                                                       backgroundColor: '#01579b',
                                                       color: '#FFF',
                                                       fontSize:'1.5rem'
                                                     },
                                                    style:{
                                                    fontSize : '2rem'
                                                  } ,
                                                 
                                               }}
                                                >  
                                </MaterialTable>
                                        
                            </div>
                 
                
               
                </div>
            
        </div>
    );
}

export default OrderPerClientTable;