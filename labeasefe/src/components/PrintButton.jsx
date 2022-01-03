import React from 'react';

import PrintIcon from '@mui/icons-material/Print';




const PrintButton = ({onPrint}) =>  {

     return (
        <div className="btn btn-warning fs-4 mx-1 my-1 px-4" 
             style = {{width : '10rem'}}    
          
            onClick = {onPrint}  
             >                  
                <PrintIcon />Print
       
        </div>

    
    );
}

export default PrintButton;