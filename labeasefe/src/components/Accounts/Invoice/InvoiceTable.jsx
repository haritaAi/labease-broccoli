import React,{useContext, useEffect, useState} from 'react';
import  {Link,useHistory} from 'react-router-dom'
import InvoiceContext from '../../../context/InvoiceContext';
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from '../../../icons/MaterialUiIcons'
import {  TablePagination, Tooltip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from '@mui/icons-material/Info';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import EditIcon from '@mui/icons-material/Edit';
import MoneyIcon from '@mui/icons-material/Money';
import PrintIcon from '@mui/icons-material/Print';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ClientContext  from '../../../context/ClientContext';
import OrderContext from '../../../context/OrderContext';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InvoicePrintIcon from './InvoicePrintIcon';
import SearchComponent from '../../searchComponent';

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




const  InvoiceTable = ({invoices,onInvoiceSelect,path}) =>  {

    const classes = useStyles();
    const history = useHistory()
    const {invoiceSelected,setInvoiceSelected} = useContext(InvoiceContext)
    const {clients,setClientSelected,onClientSelect} = useContext(ClientContext) 
    const [searchString,setSearchString] = useState('')
    const {orders} = useContext(OrderContext)
    const [data,setData] = useState([])
    const [filteredData,setFilteredData] = useState([])

const findClientSelected = (id) => {
        let newClient = clients.filter(client => client._id === id)
          
        return newClient[0]
}
const handleUpdate = (filtered) => {
  setFilteredData(filtered)
}
const handleSearch = e =>{
   
   setSearchString(e.target.value)
}


   const columns = [
    {title : 'Invoice#',field : 'invoiceNo',cellStyle :{fontSize:'1.6rem'},
                        render: rowData => <Link style = {{textDecoration : 'none'}} 
                                                 to = {path} 
                                                 onClick = {()=>
                                                          {
                                                          setClientSelected(findClientSelected(rowData.clientId))   
                                                          setInvoiceSelected(rowData)
                                                          onInvoiceSelect(rowData)}}>
                                                          {rowData.invoiceNo}
                                                          </Link>},
    {title : 'Invoice Date',field : 'invoiceDate',cellStyle :{fontSize:'1.6rem'},render : rowData => <div>{new Intl.DateTimeFormat("en-GB").format(new Date(rowData.invoiceDate))}</div>},
    {title : 'Client', field:'client',cellStyle :{fontSize:'1.6rem'},
                      render : rowData => <Link to = '/client/clientprofile' 
                                                style = {{textDecoration : 'none'}} 
                                                onClick = {()=> {
                                         onClientSelect(findClientSelected(rowData.clientId))
                                                 }}>{rowData.client.toUpperCase()}</Link>},
    {title : 'Amount',field : 'amount',cellStyle :{fontSize:'1.6rem'}},
    {title :'Due Date',field :'invoiceDueDate',cellStyle :{fontSize:'1.6rem'}},
    {title :'Paid',field :'paid',cellStyle :{fontSize:'1.6rem'}},
    {title :'Balance',field :'balance',cellStyle :{fontSize:'1.6rem'},
                      render : rowData => <div style = {(!rowData.drcr) ? {color:'red'}:{color:'green'}}>{rowData.balance}</div>  },
    {title :'Actions',field : '',maxWidth :'15px',render : rowData => <Link target={"_blank"} 
                                                    style = {{color:'#000'}}
                                                    to = {`/print/invoice/${rowData._id}`} >
                                                     <InvoicePrintIcon invoice = {rowData} /></Link>},
   {title :'', field :'', maxWidth :'15px',render : rowData => <Link style = {{textDecoration : 'none',color : '#000'}} 
                                                    to = {path} 
                                                    onClick = {()=>
                                                            {
                                                            setClientSelected(findClientSelected(rowData.clientId))   
                                                            setInvoiceSelected(rowData)
                                                            onInvoiceSelect(rowData)}}>
                                     <Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Edit</div>}>
                                     <EditIcon sx={{fontSize : 30}} /></Tooltip> 
                                    </Link>}
   
                    ]





useEffect(()=>{
  setFilteredData(invoices)
  setData(invoices)
},[])




    return (
        <div className = 'container-fluid'> 
         <div className='fs-4'>Invoice Date</div>
         <SearchComponent data = {data} 
                          onUpdate = {handleUpdate} 
                          searchField='invoiceDate'/>
         { (invoices.length > 0) &&                   
            <MaterialTable  columns = {columns}
                            data = {filteredData}
                            icons = {tableIcons}
                            title = "INVOICE TABLE"                           
                            actions = {[                             
                            
                              {icon:()=><Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Email</div>}>
                                     <MailOutlineIcon sx={{fontSize : 30}} /></Tooltip>,
                               onClick:(e,data)=>{  
                                                    console.log(data)
                                                    // onCancelOrderInInvoice(data)
                                                  
                                                  } 
                                  },
                              {icon:()=><Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>sms</div>}>
                                     <PhoneAndroidIcon sx={{fontSize : 30}} /></Tooltip>,
                               onClick:(e,data)=>{  
                                                   setInvoiceSelected(data)
                                                   history.push('/invoice/newinvoice')
                                                    // onCancelOrderInInvoice(data)
                                                  
                                                  } 
                                  },
                              {icon:()=><Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>WhatsApp</div>}>
                                     <WhatsAppIcon sx={{fontSize : 30}} /></Tooltip>,
                               onClick:(e,data)=>{  
                                                    console.log(data)
                                                    // onCancelOrderInInvoice(data)
                                                  
                                                  } 
                                  },
                           
                            ]}
                            components = {{
                              Toolbar : props => (
                                <div style = {{padding:'10px 0px'}}>
                                  <MTableToolbar {...props} />
                                  <div>
                                    <select name = 'search'
                                            className = 'fs-4 px-3 mx-3'
                                            onChange = {handleSearch} 
                                             >
                                      <option value = ''>Last 1 week</option>
                                      <option value = ''></option>
                                      <option value = ''></option>
                                      <option value = ''></option>
                                      <option value = ''></option>
                                      <option value = ''></option>
                                    </select>
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
                           filtering:true,
                           pageSize:50,
                           padding:'dense',
                           actionsColumnIndex:-1,
                           pageSizeOptions:[10,20,50,100],
                           paginationType:'stepped',
                           exportAllData : true,
                           exportFileName:'orderdata',
                           columnsButton:true,                             
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
            }
            {invoices.length === 0 && <div className = 'fs-3 text-center'>No Invoices found </div>}
        </div>
        
    );
}

export default InvoiceTable;