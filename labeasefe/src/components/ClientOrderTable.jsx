import React,{useState,useContext} from 'react';
import MaterialTable from 'material-table';
import ClientContext from '../context/ClientContext'
import tableIcons from '../icons/MaterialUiIcons'
import FlipToFrontRoundedIcon from '@mui/icons-material/FlipToFrontRounded';
import { IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import Edit from '@material-ui/icons/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ClientOrderTable = ({ onClientSelection}) =>  {

  const {clients} = useContext(ClientContext)


    const columns = [
        {title : 'Name',field : 'name',defaultSort:'asc',cellStyle : {fontSize:'1.8rem'}},      
        {title : 'Mobile',field : 'phoneM',cellStyle : {fontSize:'1.8rem'}},
        {title : 'City',field : 'city',cellStyle : {fontSize:'1.8rem'}},
        
    ]



    return (
        <div className = 'container-fluid ' >
        <MaterialTable columns = {columns} 
                       data = {clients}   
                       icons = {tableIcons} 
                       title = "Client Data"
                       onRowClick = {(row,data) => {
                        onClientSelection(data)
                       }}
                                           
                       options = {{filtering : true, pageSizeOptions:[10,25,50,100],
                                    pageSize : 25     
                                   ,paginationType:'stepped',exportAllData : true,
                                    padding:'dense',
                                    exportFileName : 'clientdata',addRowPosition:"first",
                                    actionsColumnIndex:6,
                                    columnsButton:true,                                   
                                    headerStyle: {
                                        backgroundColor: '#01579b',
                                        color: '#FFF',
                                        fontSize:'2rem',
                                       
                                      },
                                     style:{
                                     fontSize : '2rem'
                                   } 
                                }}
                                                   
                       />
        </div>
    );
}


export default ClientOrderTable;