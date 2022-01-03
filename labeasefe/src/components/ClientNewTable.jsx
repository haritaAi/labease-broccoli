import React,{useContext} from 'react';
import {Link} from 'react-router-dom'
import MaterialTable, { MTableToolbar } from 'material-table';
import ClientContext from '../context/ClientContext'
import tableIcons from '../icons/MaterialUiIcons'
import FlipToFrontRoundedIcon from '@mui/icons-material/FlipToFrontRounded';
import { TablePagination, Tooltip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import EditIcon from '@mui/icons-material/Edit';
import MoneyIcon from '@mui/icons-material/Money';




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



const ClientNewTable = ({onEditClient,onOrderClient,onPaymentClient}) =>  {


  const classes = useStyles();
  

  const {clients,setClientSelected} = useContext(ClientContext)

   
    const columns = [
        {title : 'Name',field : 'name', cellStyle : { fontSize :'1.6rem'}, defaultSort:'asc',
                  render:rowData => <Link to = '/client/clientprofile' style = {{textDecoration:'none'}} onClick = {()=>  setClientSelected(rowData)}>{(rowData.name).toUpperCase()}</Link>
                 
                  },
        {title : 'Code', field : 'code',cellStyle : { fontSize :'1.6rem'}, sorting : false,
                 render : rowData => <Link style = {{textDecoration : 'none'}}
                                           to = '/client/newclient'
                                           onClick = {()=>setClientSelected(rowData)}
                                           >{rowData.code}</Link>  
                 },
        {title : 'office Phone',cellStyle : { fontSize :'1.6rem'},field : 'phoneO'},
        {title : 'Cell Phone',cellStyle : { fontSize :'1.6rem'},field : 'phoneM'},
        {title : 'City',field : 'city',cellStyle : { fontSize :'1.6rem'}},
        {title : 'Email',field : 'emailPrimary',cellStyle : { fontSize :'1.6rem'}},
        {title : '',field : '', render : rowData => <Link to = '/client/newClient' 
                                                          style = {{textDecoration :'none',color:'#000'}}  
                                      onClick={()=>{
                                        setClientSelected(rowData)
                                      }}
                                     ><Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Edit Client</div>}>
        <EditIcon sx={{fontSize : 30}}/></Tooltip></Link>}
        
    ]

   const clientDetail = (rowData) => {

    const {name,emailPrimary,phoneO,phoneM,phoneR,address1,address2,city,state} = rowData

     return (
       <div>
             
             
                                        <div className = 'row'>
                                            <div className="col-3">
                                              
                                            </div>
                                            <div className="col">
                                            <strong>Client Detail</strong>
                                            <div className="row">
                                                <div className="col-3">Name :</div>
                                                <div className="col-5">{name}</div>
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-3">email : </div>
                                                <div className="col-5">{emailPrimary}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">Office :</div>
                                                <div className="col-5">{phoneO}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">Mobile :</div>
                                                <div className="col-5">{phoneM}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">Residence :</div>
                                                <div className="col-5">{phoneR}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">Address : </div>
                                                <div className="col-5">{address1}</div>
                                            </div>    
                                            <div className="row">
                                                <div className="col-3"> </div>
                                                <div className="col-5">{address2}</div>
                                            </div>       
                                            <div className="row">
                                                <div className="col-3">Location : </div>
                                                <div className="col-5">{city}</div>
                                            </div>    
                                            <div className="row">
                                                <div className="col-3">State : </div>
                                                <div className="col-5">{state}</div>
                                            </div> 
                                                
                                            </div>
                                                
                                                    
                                        </div>     
       </div>
     )
   }



    return (
        <div>
        <MaterialTable columns = {columns} 
                       data = {clients}   
                       icons = {tableIcons} 
                       title = "Client Data"
                  
                      components = {{
                        Pagination:props => (
                                
                          (
                            <TablePagination 
                            component = 'component'
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
                       actions = {[
                           {icon:()=><Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Create Order</div>}>
                                      <FlipToFrontRoundedIcon sx={{fontSize : 30}} /></Tooltip>,
                             onClick:(e,data)=>{  
                                                     onOrderClient(data)
                                                   
                                                   } 
                                   },
                          
                            {
                              icon:()=><Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>New Payment</div>}>
                                         <MoneyIcon sx={{fontSize : 25}}/></Tooltip>,
                              onClick:(e,data)=>{ 
                                                   onPaymentClient(data)
                                                  }
  
                              }
                       ]}
                       options = {{filtering : true,
                                   pageSize:50,
                                    pageSizeOptions:[10,20,50,100],
                                    paginationType:'stepped',exportAllData : true,
                                    padding:'dense',
                                    exportFileName : 'clientdata',addRowPosition:"first",
                                    actionsColumnIndex:6,
                                    columnsButton:true,
                                    rowStyle :(data,index)=> index%2==0?{background:"#f2f2f2"}:null  ,
                                    headerStyle: {
                                        backgroundColor: '#01579b',
                                        color: '#FFF',
                                        fontSize:'1.5rem'
                                      },
                                     style:{
                                     fontSize : '2rem'
                                   } 
                                }}
                                                   
                       />
        </div>
    );
}

export default ClientNewTable;