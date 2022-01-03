import React from 'react';
import {Link,withRouter} from 'react-router-dom'


const  SubMenuOffice = ({history}) =>{

    const currentTab = (history,path) => {
        if(history.location.pathname === path)return {backgroundColor: "#0b8df7"};
        else return {color : '#fff'};
    }
    return (
        <div className = ''>
        <div className="d-flex flex-row  flex-wrap bg-info">
            <Link className="btn btn-info fs-4 text-white px-3 py-2 mx-2 " style = {currentTab(history,"/accounts/invoices")}   to = '/settings/orders'>Orders     </Link>
            <Link className="btn btn-info fs-4 text-white px-3 py-2 mx-2 " style = {currentTab(history,"/accounts/collections")}  to = '/settings/clients'>Clients  </Link>
            <Link className="btn btn-info fs-4 text-white px-3 py-2 mx-2 " style = {currentTab(history,"/accounts/receipt")}  to = '/settings/print'>Print      </Link>
            <Link className="btn btn-info fs-4 text-white px-3 py-2 mx-2 " style = {currentTab(history,"/accounts/adjustments")}  to = ''>  </Link>
            <Link className="btn btn-info fs-4 text-white px-3 py-2 mx-2 " style = {currentTab(history,"/accounts/manage")}  to = ''>   </Link>
        </div>
        
    </div>
    );
}

export default withRouter(SubMenuOffice);