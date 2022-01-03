import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {  Tooltip } from '@material-ui/core';



const  AddressTable = ({addressBook,onAddressEdit})=> {
    
    console.log("AddressBook received :",addressBook)    
  

    
         
    return (
        <ul>
         {addressBook.length > 0 && addressBook.map((address,index) => <li key = {index}>
                                         <div className="">
                                             <div className="row">
                                                 <div className="col-8 border border-dark">
                                                    {address.name}
                                                 </div>
                                                 <div className="col-4 border border-dark">
                                                 <Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Edit Location</div>}>
                                                      <EditIcon sx={{fontSize : 30}} onClick = {()=>onAddressEdit(address,index)}/></Tooltip>
                                                   
                                                 </div>
                                             </div>
                                         </div>
                                       </li>)}                
        </ul>
    );
}

export default AddressTable;