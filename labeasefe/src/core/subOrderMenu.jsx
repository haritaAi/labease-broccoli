import React, {Fragment,useState} from 'react';
import {Link,withRouter} from 'react-router-dom'
import { isAuthenticated ,signout} from '../auth';
import logo  from '../images/logo-white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/submenu.css'


const currentTab = (history,path) => {
   if(history.location.pathname === path) return{backgroundColor:'#ADF6F8'}
//    else return {backgroundColor : '#5c5c5c'}
}


const  SubOrderMenu = (history,path) => {
    return (
            <>
           {isAuthenticated() && isAuthenticated().user.role ===1 && 
                    <div className = 'submenu-container bg-info text-white'>
                  
                       <div style ={currentTab(history,'/order') }>
                           <Link to = '/order'  className = "px-3 nav-link">Order</Link>
                        </div>  
                        <div style ={currentTab(history,'/order/neworder') } > 
                           <Link to = '/order/neworder'  className = 'px-3 nav-link' >+New Order</Link>
                        </div>

                   </div>
                  
                 } 
                   </>
    );
}

export default withRouter(SubOrderMenu);

