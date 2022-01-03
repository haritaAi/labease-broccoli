import React,{useContext, useEffect, useState} from 'react';
import  {Link,useHistory} from 'react-router-dom'
import MaterialTable, { MTableToolbar } from 'material-table';
import tableIcons from '../../../icons/MaterialUiIcons'
import {  TablePagination, Tooltip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import EditIcon from '@mui/icons-material/Edit';

import PrintIcon from '@mui/icons-material/Print';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ClientContext  from '../../../context/ClientContext';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {getFormatDate} from '../../DateAPI/index'
import ReceiptContext from '../../../context/ReceiptContext';
import ReceiptPrintIcon from '../../print/Receipt/ReceiptPrintIcon';



import Popover from '@mui/material/Popover';
import InvoiceListTable from './InvoiceListTable';

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


const ReceiptTable = ({receipts,onReceiptSelect,path}) => {

    const classes = useStyles();
    const history = useHistory()
    const {clients,setClientSelected,onClientSelect} = useContext(ClientContext)
    const {receiptSelected,setReceiptSelected} = useContext(ReceiptContext)
    const [showInvoiceDetail,setShowInvoiceDetail] = useState(false) 
    const [searchString,setSearchString] = useState('')
    const [anchorEl,setAnchorEl] = useState(null)
     const open = Boolean(anchorEl)
     const id = open ? 'simple-popover' : undefined;

const findClientSelected = (id) => {
        let newClient = clients.filter(client => client._id === id)
          
     console.log("CLient Selected :",newClient)
     return newClient[0]
}
const handleSearch = e =>{
   
    setSearchString(e.target.value)
 }
 const handleClick = event => {
     setAnchorEl(event.currentTarget)
 }
 const handleClose = () => {
   setAnchorEl(null)
 }
const InvoiceDetail =(receiptData) => {
   return (
     <InvoiceListTable receiptData = {receiptData} onClose = {handleClose} />
   )
}



const columns = [
    {title :'Receipt#',field : 'receiptNo',maxWidth : '7rem',
               render : rowData => <Link to ='/payment'
                                         style = {{textDecoration:'none'}}
                                         onClick = {()=> {
                                          
                                           setReceiptSelected(rowData)
                                           setClientSelected(rowData.client)
                                         }}
                                          >{rowData.receiptNo}</Link>
               },
    {title :'Receipt Date',field : 'paymentDate',maxWidth : '12rem',
               render : rowData => <div>{getFormatDate(rowData.paymentDate)}</div>},
    {title :'Client',field : 'client',minWidth:'10rem',
                render : rowData => <Link to = '/client/clientprofile' 
                                          style = {{textDecoration : 'none'}} 
                                          className = 'fs-4'
                                          onClick = {()=> {
                                          setClientSelected(rowData.client)
                                        }}
                                        >{rowData.client.name.toUpperCase()}</Link>
               
             },
    {title :'Amount',field : 'amount',maxWidth:'10rem',
                            render :  rowData =><div> <div  className = ' btn fs-4 text-primary'
                                                       onClick = {handleClick}
                                                       >{rowData.amount}</div>
                                                         <Popover open = {open}
                                                                 id = {id}
                                                                 anchorEl = {anchorEl}
                                                                 onClose = {handleClose}
                                                                anchorOrigin = {{
                                                                  verticle :'top',
                                                                  horizontal :'left'
                                                                }}
                                                            >{InvoiceDetail(rowData)}
                                                        </Popover>
                                                        </div> 
                          },
    {title :'Applied',field : 'amount',maxWidth:'10rem'},
    {title :'Actions',field : '',maxWidth :'10px' ,render : rowData => <Link target={"_blank"} 
                                                    style = {{color:'#000'}}
                                                    to = {`/print/receipt/${rowData._id}`}
                                                    onClick={()=>console.log("receipt Data to print",rowData)}
                                                    >
                                                     <ReceiptPrintIcon receipt = {rowData} /></Link>},
  {title :'',field : '', maxWidth :'10px', render : rowData => <Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>sms</div>}>
                                                            <PhoneAndroidIcon sx={{fontSize : 30}} /></Tooltip>},
   {title :'',field : '', maxWidth :'10px', render : rowData => <Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>WhatsApp</div>}>
   <WhatsAppIcon sx={{fontSize : 30}} /></Tooltip>},    
   {title :'',field : '', maxWidth :'10px', render : rowData => <Link to ='/payment'
                                                                      style = {{textDecoration:'none', color : '#000'}}
                                                                      onClick = {()=> {
                                                                        setReceiptSelected(rowData)
                                                                        setClientSelected(rowData.client)
                                                                      }}>
                <Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Edit</div>}>
                                                        <EditIcon sx={{fontSize : 30}} /></Tooltip></Link>},                                                     
   
]


useEffect(()=>{
  setClientSelected(null)
  setReceiptSelected(null)
},[])

  return (
      <div className = 'container-fluid'>
         {(receipts.length > 0) && 
           <MaterialTable
                columns ={columns}
                data = {receipts}
                icons = {tableIcons}
                title = 'RECEIPTS'
               
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
                 pageSize:25,
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
             } ,
             cellStyle :{fontSize:'1.6rem'}
             }}
                >

           </MaterialTable>         
         }
        {receipts.length === 0 && <div className = 'text-center'> 
                    <div className = 'fs-3 text-center'>No Receipts found </div>
                    </div>
                    }

      </div>
  )

}
export default ReceiptTable