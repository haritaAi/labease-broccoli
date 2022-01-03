import React from 'react';



const  InvoicePrint = (props) =>  {


    return (
        <div>
            <div>This is Header</div>
            <div className = '' >This is logo</div>
            <div className = 'd-flex flex-row justify-content-between'>
               <div >subTitle Left</div>
               <div>SubTitle Right</div>
            </div>
            <div>This is Main Content</div>

            <div>This is footer</div>
        </div>
    );
}

export default InvoicePrint;