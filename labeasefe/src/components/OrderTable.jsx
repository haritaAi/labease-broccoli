import React,{useState,useContext,useEffect} from 'react';
import OrderContext from '../context/OrderContext'
import {Link} from 'react-router-dom'
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from '../icons/MaterialUiIcons'
import { TablePagination } from '@material-ui/core';


import {updateOrder} from '../admin/clientApi'
import UserContext from '../context/UserContext';
import { makeStyles } from "@material-ui/core/styles";
import ClientContext from '../context/ClientContext';
import SearchComponent from './searchComponent';
import {getOrders,getClients} from '../admin/clientApi'

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
    },
    tableCell :{
      padding:"0px 3px"
    }
  });

const OrderTable = (props)=> {

   const classes = useStyles();

  const {setOrderSelected} = useContext(OrderContext)
  const {setClientSelected} = useContext(ClientContext)
  const [orders,setOrders] = useState([])
  const [clients,setClients] = useState([])
  const [data,setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const {user,token} = useContext(UserContext)
  const [values,setValues] = useState({
    error:'',
    loading:false
  })
  const [selectRows,setSelectedRows] = useState([])
 
 const [message,setMessage] = useState('')
 const [alert,setAlert] = useState(false)
 
 const [searchVal,setSearchVal] = useState('orderDate')


const handleUpdate = (filtered) => {
    setFilteredData(filtered)
}

 const handleStatus = (e) => {
     console.log("Updating assign To")
    let val = e.target.value

    let success = 0;
    
    if(selectRows.length>0){
         
          selectRows.forEach(order =>{
              
             let newValues = {...order,status:val}

            updateOrder(user._id,token,newValues)
             .then(data =>{
                 
                 success+=1;
                 if(success === selectRows.length)fetchOrders()
                 }
             )
             .catch((err) => {
                setMessage("Error while  updating status")
                setAlert(true)
                setTimeout(()=>setAlert(false),2000)
                window.alert("Error while updating status")
             })
               
          } )         
          
         
         
    }
    else{
       
       window.alert("Please Select Orders for updating status")
    }
 }



const handleDepartment = e => {
     let val = e.target.value
     if(selectRows.length>0){
        let success = 0
         selectRows.forEach(order =>{
             
            let newValues = {...order,department:val}

           updateOrder(user._id,token,newValues)
            .then(data =>{              
               
                    success+=1;
                    if(success === selectRows.length)fetchOrders()                
            })
            .catch((err => {
               setMessage("Error while  updating department")
               setAlert(true)
               setTimeout(()=>setAlert(false),2000)
               window.alert("Error while Updating Department")
            })
              
            )
            
         } )      
        
        
   }
   else{
    
      window.alert("Please Select Orders for updating ")
   }




}

const handleAssignTo = e => {
    if(selectRows.length>0){
        let success = 0
         selectRows.forEach(order =>{
             
            let newValues = {...order,assignedTo:e.target.value}

           updateOrder(user._id,token,newValues)
            .then(data =>{              
                    success +=1;   
                    if(success === selectRows.length)fetchOrders()                

            })
            .catch((err => {
               setMessage("Error while  updating staff assigned")
               setAlert(true)
               setTimeout(()=>setAlert(false),2000)
               window.alert("Error while updating staff assigned")
            })
              
            )
            
         } )
         
         setMessage(`${success} orders updated successfully`)
         setAlert(true)
         setTimeout(()=>setAlert(false),2000)
        
   }
   else{
           
      window.alert("Please Select Orders for updating")

   }
}

const handleRepeatOrderSearch = ()=>{
    let newData = orders.filter(order => order.workType==='repeat')
    
    setFilteredData(newData)
    
}
const handleRepairOrderSearch = ()=>{
  let newData = orders.filter(order => order.workType === 'repair')
   setFilteredData(newData)
}
const generateProductsList = products => {
   let list = []
   products.forEach(job => list.push(`${job.product}-${job.units}`))
   return list.join()
}
const handleInvoiceFilter = event => {
  let filterVal = event.target.value
  let newData = []  
  if(filterVal === 'true') {
   newData =   orders.filter(order => order.isInvoiced === true)
  setFilteredData(newData)
   }
  else if(filterVal === 'false'){

  newData =   orders.filter(order =>order.isInvoiced=== false)
  setFilteredData(newData)
  
  } 
  else setFilteredData(orders)
  
}
useEffect(()=>{
  (async ()=> {
    setOrderSelected(null) 
    setValues({loading:true})
    const client  = await getClients(user._id,token)
    const order = await getOrders(user._id,token)       
    setClients(client)
    setOrders(order)  
    setData(order)
    setFilteredData(order)
    setValues({loading:false})      
    
})()
},[])

const fetchOrders = async () => {
  await getOrders(user._id,token)
  .then(data => {
      if(data.error){
      setMessage("Error fetching data")
      setAlert(true)
      setTimeout(()=>setAlert(false),2000)
      }
      else {
          setOrders(data)
          // console.log("ORDERS RECEIVED IN ROUTES :",data)
      }
  })
  .catch(err => { 
                      setMessage("Error fetching data")
                      setAlert(true)
                      setTimeout(()=>setAlert(false),2000)
                      })
}


  const COLUMNS = [
      
      {title:'Order#',field:'orderNo',maxWidth:'7rem',cellStyle : {fontSize :'1.6rem',border:'1px solid #5c5c5c',width:'3rem'},
                            render : rowData => <Link to = '/order/neworder' 
                                                      style = {{textDecoration :'none'}}                                                     
                                                      onClick = {()=>{                                                        
                                                        setOrderSelected(rowData)
                                                      }}>
                                                   {rowData.orderNo}       
                                                 </Link> 
                            },
      {title:'OrderDate',field:'orderDate',maxWidth:'11rem',
                            cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c',width:'5rem'}, filtering:false,
                            render : rowData => <div>{rowData.orderDate && <div>{new Intl.DateTimeFormat('en-GB').format(new Date(rowData.orderDate))}</div>}</div>
                           },
      {title:'Client',field:'client',minWidth : '180px',defaultSort :'asc',cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'},
                            render:rowData => <Link to = '/client/clientprofile'  
                                                    style = {{textDecoration :'none'}} 
                                                    className = {classes.tableCell}
                                                    onClick = {()=> setClientSelected(rowData.clientId)}>
                                                         {(rowData.client).toUpperCase()}
                                                         </Link>},
       {title:'Patient',field : 'patient',maxWidth:'7rem',cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'}  }  ,                   
      
      {titile : 'Products',field : 'products',cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'},
                              render : rowData =><div>{generateProductsList(rowData.products)}</div> },
      {title:'Value',field:'orderAmount',align:'left',maxWidth:'15rem', cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'},
                          type: 'currency' ,currencySetting: { currencyCode :'INR'} },
      {title:'Status',field:'status',minWidth:'15rem', cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'} ,
                               render : rowData => {

                                 return   rowData.status === 'Complete'? <div style = {{color:'#04910e'}}>{rowData.status}</div> :
                                        rowData.status === 'Hold'? <div style = {{color : '#f20a0a',fontWeight :'bold'}}>{rowData.status}</div> :
                                            <div style = {{color : '#5c5c5c'}}>{rowData.status}</div>
                              
                                  } ,
                                  lookup :{New : 'NEW','In Production' : 'In Prodction', Complete:'COMPLETE', Hold : 'HOLD', 'Try In' : 'Try In', Cancelled : 'Cancelled' }  
                               },      
     
      {title:'Due Date',field:'duedate',width:'7%',maxWidth:'11rem',
                              cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'},
                               render : rowData =>(rowData.duedate &&  <div>{new Date(rowData.duedate).toDateString() === (new Date().toDateString())?
                                                                    <div style = {{color : 'red',fontWeight : 'bold'}}>{new Intl.DateTimeFormat("en-GB").format(new Date(rowData.duedate)  )}</div> :
                                                                     <div>{new Intl.DateTimeFormat("en-GB").format(new Date(rowData.duedate) ) }</div>
                                                                         
                                                                                 }</div>    )                          
                              },
      {title : 'Date In',foeld :'dateIn',width:'7%',maxWidth:'11rem',
                  cellStyle : { fontSize :'1.6rem',border:'1px solid #5c5c5c'},
                  render : rowData =>(rowData.dateIn &&  <div>{new Intl.DateTimeFormat("en-GB").format(new Date(rowData.dateIn) ) }</div>  ) }                        
      
  ]

const orderDetail = (rowData) => {
     const{orderno,client,productsList,orderAmount,status,orderDate,updated,duedate} = rowData

    return(
        <div>
            <ul>
                <li className = 'd-flex flex-row'>
                    <div className = 'w-50'>order # :</div>
                    <div className = 'w-50'>{orderno}</div>
                </li>
                <li className = 'd-flex flex-row'>
                    <div className = 'w-50'>Client :</div>
                    <div className = 'w-50'>{client}</div>
                </li>
                <li className = 'd-flex flex-row'>
                    <div className = 'w-50'>Products :</div>
                    <div className = 'w-50'>{productsList}</div>
                </li>
                <li className = 'd-flex flex-row'>
                    <div className = 'w-50'>Status :</div>
                    <div className = 'w-50'>{status}</div>
                </li>
                <li className = 'd-flex flex-row'>
                    <div className = 'w-50'>Order Date:</div>
                    <div className = 'w-50'>{new Intl.DateTimeFormat('en-GB').format(new Date(orderDate))}</div>
                </li>
                <li className = 'd-flex flex-row'>
                    <div className = 'w-50'>Order Amount:</div>
                    <div className = 'w-50'>&#x20B9;{orderAmount}</div>
                </li>
                <li className = 'd-flex flex-row'>
                    <div className = 'w-50'>Last update :</div>
                    <div className = 'w-50'>{new Intl.DateTimeFormat('en-GB').format(new Date(updated))}</div>
                </li>
                <li className = 'd-flex flex-row'>
                    <div className = 'w-50'>Due Date :</div>
                    <div className = 'w-50'>{new Intl.DateTimeFormat('en-GB').format(new Date(duedate))}</div>
                </li>
             
            </ul>
        </div>
    )
}

const {error,loading} = values

    return (
        <div className = 'container'>
          <div>
            <div>
              {loading && <div className='fs-3 text-center text-secondary'>Loading...</div>}
              <div className='fs-4'>Compare Date</div>
              <select className='fs-4' onChange = {(e)=> {                            
                            setSearchVal(e.target.value)
                            
                          }}
                            >
                <option value = 'dueDate'>Final Delivery Due Date</option>
                <option value = 'orderDate'>Order Date</option>
                <option value = 'dateIn'>Date In</option>
                {/* <option value = 'statusDate'>Status Date</option> */}
                <option value = 'invoiceDate'>Invoice Date</option>
                <option value = 'tryinDate'>Schedule tryin Delivery Date</option>
              </select>
            </div>
            <SearchComponent data = {data} onUpdate = {handleUpdate} searchField={searchVal} />
         
          </div>
            {alert && <div className = 'fs-3 text-danger '><b>{message}</b></div>}
            <MaterialTable columns = {COLUMNS}
                           data = {filteredData}
                           icons = {tableIcons}
                           title = "Order Data"
                           components = {{
                               Toolbar : props => (
                                <div>
                                    <MTableToolbar {...props}/>
                                    
                                    <div style = {{padding:'10px 0px'}}>
                                       <select className="bg-body border border-dark rounded outline-0 p-2 mx-3 col-6 col-sm-2 fs-4"
                                                name='status'                                                                                    
                                                onChange={handleStatus}
                                                >
                                            <option >Mark as</option>
                                            <option value = "New">New</option>
                                            <option value = "In Production">In Production</option>
                                            <option value = "Complete">Complete</option>
                                            <option value = "Hold">Hold</option>
                                            <option value = "Try In">Try In</option>
                                            <option value = "Cancelled">Cancelled</option>
                                           
                                            </select> 


                                        <select className="bg-body border border-dark rounded outline-0 p-2 fs-4 mx-3 my-2 col-6 col-sm-2"
                                                onChange = {handleDepartment}  
                                                >
                                            <option >Move To</option>
                                            <option value = "OUTBOX">OUTBOX</option>
                                            <option value = "ACRYLIC">ACRYLIC</option>
                                            <option value = "ADMIN">ADMIN</option>
                                            <option value = "CAD CAM">CAD CAM</option>
                                            <option value = "METAL">METAL</option>
                                            <option value = "MOULD AND DIE">MOULD AND DIE</option>
                                            <option value = "ORTHODONTIC">ORTHODONTIC</option>
                                            <option value = "PICKUP AND DELIVERY">PICKUP AND DELIVERY</option>
                                            <option value = "PORCELAIN">PORCELAIN</option>
                                            <option value = "OUALITY">OUALITY</option>
                                            <option value = "WAX">WAX</option>
                                            </select> 

                                            <select className="bg-body border border-dark rounded outline-0 p-2 fs-4 mx-3 my-2 col-6 col-sm-2"
                                                onChange = {handleAssignTo}  
                                                >
                                            <option >Assign To</option>
                                            <option value = "BHARAT BHAI">BHARAT BHAI</option>
                                            <option value = "CHANDRAKANT BHAI">CHANDRAKANT BHAI</option>
                                            <option value = "Courier">Courier</option>
                                            <option value = "Dr DHAVAL THAKKAR">Dr DHAVAL THAKKAR</option>
                                            <option value = "JAGDISHBHAI">JAGDISHBHAI</option>
                                            <option value = "MOULD AND DIE">MOULD AND DIE</option>
                                            <option value = "MR.AJIT">MR.AJIT</option>
                                            <option value = "NAGIN BHAI">NAGIN BHAI</option>
                                            <option value = "R K">R K</option>
                                            <option value = "RAHUL TAPODHAN">RAHUL TAPODHAN</option>
                                            <option value = "RAKESH BHAI">RAKESH BHAI</option>
                                            <option value = "RATI KAKA">RATI KAKA</option>
                                            <option value = "UMIT DAVE">UMIT DAVE</option>
                                            <option value = "YOGESH BHAI">YOGESH BHAI</option>
                                        
                                            </select> 

                                    <div className = 'btn btn-info fs-4 my-1 mx-3'
                                          onClick = {()=> setFilteredData(orders)}
                                          >All Orders</div> 
                                    <div className = 'btn btn-info fs-4 my-1 mx-3'
                                          onClick = {()=> handleRepeatOrderSearch()}
                                          >Repeat Orders</div> 
                                    <div className = 'btn btn-info fs-4 my-1 mx-3'
                                          onClick = {()=> handleRepairOrderSearch()}
                                          >Repair Orders</div> 
                                    </div>
                                   <div>
                                     <label>Invoice:</label>
                                     <select className = ' border border-dark rounded outline-0 p-2 mx-3 my-1 col-1 fs-4'
                                             name= 'invoice'
                                             onChange = {handleInvoiceFilter}  
                                             >
                                               <option >All</option>
                                               <option value = {true}>Invoiced</option>
                                               <option value = {false}>Not Invoiced</option>
                                     </select>
                                   </div>
                                  
                                </div>    
                               ),

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
                           
                       
                        onSelectionChange = {(selectedRows)=> {setSelectedRows(selectedRows)}}
                         
                        options={{
                               filtering:true,
                               pageSize : 25,
                               padding:'dense',
                               pageSizeOptions:[10,20,50,100],
                               paginationType:'stepped',
                               exportButton :true,
                               exportAllData : true,
                               exportFileName:'orderdata',
                               columnsButton:true,    
                               actionsCellStyle:{
                                border:'1px solid #5c5c5c'
                              },                         
                               rowStyle :(data,index)=> (index%2==0?{background:"#f2f2f2"}:null )  ,
                               selection:true,
                               showSelectAllCheckbox:false,
                               showTextRowsSelected:false,
                               headerStyle: {
                                backgroundColor: '#01572b',
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

export default OrderTable;