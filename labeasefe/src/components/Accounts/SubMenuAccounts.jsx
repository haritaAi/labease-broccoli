import React from 'react';
import {Link,withRouter} from 'react-router-dom'








 const SubMenuAccounts  = ({history}) => {

    const currentTab = (history, path) => {
    
        if(history.location.pathname === path) return {backgroundColor: "#0b8df7"};
        else return {color:"#FFFFFF"};
     
     };
   


        return (
            <div className = ''>
                <div className="d-flex flex-row  flex-wrap bg-info">
                    <Link className="btn btn-info fs-4 text-white px-3 py-2 mx-2 " style = {currentTab(history,"/accounts/invoices")}   to = '/accounts/invoices'>Invoices     </Link>
                    <Link className="btn btn-info fs-4 text-white px-3 py-2 mx-2 " style = {currentTab(history,"/accounts/collections")}  to = '/accounts/collections'>Collections  </Link>
                    <Link className="btn btn-info fs-4 text-white px-3 py-2 mx-2 " style = {currentTab(history,"/accounts/receipt")}  to = '/accounts/receipt'>Payment      </Link>
                    <Link className="btn btn-info fs-4 text-white px-3 py-2 mx-2 " style = {currentTab(history,"/accounts/adjustments")}  to = '/accounts/adjustments'>Adjustments  </Link>
                    <Link className="btn btn-info fs-4 text-white px-3 py-2 mx-2 " style = {currentTab(history,"/accounts/manage")}  to = '/accounts/manage'>Manage       </Link>
                </div>
                
            </div>
        )
 }


export default withRouter(SubMenuAccounts);
