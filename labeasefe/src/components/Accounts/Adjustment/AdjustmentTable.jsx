import React,{useContext, useEffect, useState} from 'react';

import MaterialTable  from 'material-table';
import tableIcons from '../../../icons/MaterialUiIcons'
import {  TablePagination } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from '@mui/icons-material/Info';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import EditIcon from '@mui/icons-material/Edit';
import MoneyIcon from '@mui/icons-material/Money';
import PrintIcon from '@mui/icons-material/Print';

import UserContext from '../../../context/UserContext'
import AdjustmentContext from '../../../context/AdjustmentContext'


import {getFormatDate} from '../../DateAPI/index'

import Modal from '../../../components/Modal'
import {deleteAdjustment, updateInvoice} from '../../../admin/clientApi'




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


const AdjustmentTable = (props) => {

    const classes = useStyles();
   
    const {adjustments,fetchAdjustments} = useContext(AdjustmentContext)
    const {user,token} = useContext(UserContext)
    const [adjustmentSelected,setAdjustmentSelected] = useState(null)
 


const onDeleteAdjustment = rowData => {

    let invoice = {...rowData.invoice}
    invoice.balance = parseInt(invoice.balance)+ parseInt(rowData.amount)
    invoice.adjustmentNo = ''
    invoice.discount = 0
    updateInvoice(user._id,token,invoice)
        .then(data => {
            if(data.error){
                window.alert("Could not update the Invoice")
            }
        })
        .catch(err=> {
            window.alert("Could not update the Invoice")
                })

    deleteAdjustment(user._id,token,rowData)
    .then(data => {
        if(data.error){
            window.alert("Could not delete the Adjustment")
        }
    })
    .catch(err=> {
     window.alert("Could not delete the Adjustment")

    })
    setAdjustmentSelected(null)
    fetchAdjustments()

}

const showDetail = () => {


     const rowData  = {...adjustmentSelected}


    return(
        <div className = 'fs-4'>
        <Modal title = 'Credit ADjustment '>
           <div>Against Invoice# :<b> {rowData.invoice.invoiceNo}</b></div>
              <div>Client :<b>{(rowData.client.name).toUpperCase()}</b> </div>
              <div className = 'd-flex flex-row align-items-center'>
                  <div>
                      <div>Amount</div>
                      <input  value = {rowData.amount}/>
                  </div>
                  <div className = 'mx-4'>
                      <div >Adjustment Date</div>
                      <div className = 'border border-dark'>{getFormatDate(rowData.adjDate)}</div>
                  </div>
              </div>
              <div>
                  <div>Reference #</div>
                  <input value = {rowData.adjNo}/>
              </div>
              <div>
                  <div>Adjustment Type</div>
                  <div>{rowData.adjType}</div>
              </div>
              <div>
                  <div>Notes : {rowData.notes}</div>
              </div>
              <div>
                <div className="btn btn-info fs-4"
                      onClick = {() => {
                          let reply = window.confirm("This will delete the credit adjustment permenantly , Are you sure?")
                          if(reply){
                               onDeleteAdjustment(rowData)
                          }
                      }}
                      >Delete Adjustment</div>
                <div className="btn btn-info mx-4 fs-4" 
                        onClick = {() => {
                            setAdjustmentSelected(null)
                        }}>Cancel</div>
            </div>
        </Modal>
        
        
        </div>
    )
}

 const columns = [
     {title : 'Adj#', field : 'adjNo',render: rowData => <div className = 'text-primary' 
                                                               style = {{cursor : 'pointer'}}   
                                                                onClick = {()=>{
                                                                                 setAdjustmentSelected(rowData)                 
                                                                                
                                                                                }}>{rowData.adjNo}</div>},
     {title : 'Adj.Date', field : 'adjDate',render : rowData => <div>{getFormatDate(rowData.adjDate)}</div>},
     {title : 'Client', field : 'client.name'},
     {title : 'Amount', field : 'amount'},
     {title : 'Adjustment Type', field : 'adjType'},
     {title : 'Applied To', field : 'invoice.invoiceNo',
                 render : rowData => <div>invoice  {rowData.invoice.invoiceNo}</div>},
    
 ]

useEffect(()=>{},[])


    return (
        <div className = 'container-fluid'>
            {adjustmentSelected && showDetail()}
        {adjustments.length>0 && 
               <MaterialTable columns = {columns}
                              data = {adjustments}
                              icons = {tableIcons}
                              title = 'CREDIT ADJUSTMENTS'
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
                             pageSize:25,
                             padding:'dense',
                             actionsColumnIndex:-1,
                             pageSizeOptions:[10,20,50,100],
                             paginationType:'stepped',
                             exportAllData : true,
                             exportFileName:'orderdata',                                                        
                             rowStyle :(data,index)=> index%2==0?{background:"#f2f2f2"}:null  ,
                             showTextRowsSelected:false,
                             headerStyle: {
                              backgroundColor: '#01579b',
                              color: '#FFF',
                              fontSize:'1.5rem',
                              zIndex : 2,
                            },
                           style:{
                           fontSize : '1.5rem'
                         } ,
                         cellStyle : {
                             fontSize : '1.6rem'
                         }
                         }}                          
                          >

               </MaterialTable>
               }  
        </div>
    );
}

export default AdjustmentTable;