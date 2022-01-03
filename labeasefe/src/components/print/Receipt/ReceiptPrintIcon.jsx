import React from 'react';
import PrintIcon from '@mui/icons-material/Print';
import {Tooltip } from '@material-ui/core';
import {addToPrintReceipt} from '../../print/printAPI'


const ReceiptPrintIcon = ({receipt}) => {

            
    return (
        <div>
             <Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Print Receipt</div>}>                              
                                                <PrintIcon sx={{fontSize : 30}}  onClick = {()=>{                                                    
                                                   addToPrintReceipt(receipt) 
                                                }}/>
                                         
                                            </Tooltip>
            
        </div>
    );
}

export default ReceiptPrintIcon;