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


const  SubMenu = ({history,path}) => {
    return (
            <>
           {isAuthenticated() && isAuthenticated().user.role ===1 && 
                    <div className = 'submenu-container bg-info '>
                  
                       <div style ={currentTab(history,'/client') }>
                           <Link to = '/client'  
                                 className = "px-3 nav-link" 
                                 style = {{color : '#000'}}>Client</Link>
                        </div>  
                        <div style ={currentTab(history,'/client/newclient') } > 
                           <Link to = '/client/newclient'  
                                 className = 'px-3 nav-link' 
                                 style = {{color : '#000'}}>+New Client</Link>
                        </div>
                        <div style ={currentTab(history,'/client/orders') } > 
                           <Link to = '/client/orders'  
                                 className = 'px-3 nav-link' 
                                 style = {{color : '#000'}}>Orders</Link>
                        </div>

                   </div>
                  
                 } 
                   </>
    );
}

export default withRouter(SubMenu);

