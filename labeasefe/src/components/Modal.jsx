import React from 'react';
import '../css/modal.css'

const Modal = (props) => {
const {children,title} = props



    return (
     

        
        <div className = "modal-background  "
                >
              
           
            <div className = "my-modal d-flex flex-column " >
                <div className="modal-heading fs-3 px-5 py-2"><b>{title}</b></div>
                <hr/>
                <div className="modal-body">
                         {children}
                    </div>
                <hr/>
                  

             </div>
             
        </div>
      );
}
 
export default Modal;