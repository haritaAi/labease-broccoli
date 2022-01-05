import React from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const EmailButton = ({email}) => {



    
    
    return (
        <div className="btn btn-warning fs-4 mx-1 my-1 px-3" style = {{width : '10rem'}} onClick = {()=> 
                                                                        {
                                                                            if(!email) window.alert("No email registered for this Client")
                                                                            else 
                                                                              console.log("Email :",{email})}
                                                                        }  > 
                                   < MailOutlineIcon/>
                                       Email</div>
    );
}

export default EmailButton;