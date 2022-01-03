import React, {Fragment,useState} from 'react';
import {Link,withRouter} from 'react-router-dom'
import '../css/menu.css'
import { isAuthenticated ,signout} from '../auth';
import logo  from '../images/logo-white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';






const currentTab = (history, path) => {
    
   if(history.location.pathname === path) return {color: "#0b8df7"};
   else return {color:"#FFFFFF"};

};

const Menu = ({history,path}) => {
 
  
   const [menuTab,setCurrentTab] = useState(null)
  
   const handleMenu = (item) => {
    if(item === 'menu'){     
         
       const userMenu = document.querySelector(".collapsible_menu");
       userMenu.classList.toggle('collapsible_expanded');
    }
    else if(item === 'user'){
   
      const list = document.querySelector(".collapsible_user");
      list.classList.toggle('collapsible_expanded');
    }
   }
    return (
        
         <div className = "menu container-fluid">
            <div className = "menu-left">         
             <img  className = 'logo-img ' src = {logo} />             
            
      
            </div>
            <div className = "menu-left ">
               <div className="user_list_container">
                           <ul className = 'nav-list'>   
                     
                     <Fragment>
                        <div className = 'user-logo'>
                           <div className = 'avatar' onClick = {()=>handleMenu('user')}>
                                 <FontAwesomeIcon icon = 'user' size = '1x' color = '#fff'/>
                           </div>  
                           {isAuthenticated() && isAuthenticated().user.name && <div style = {{color:"#FFFFFF"}} 
                                                                                     className = "fs-4">{isAuthenticated().user.name}</div>    }  
                     </div>
                     </Fragment>
                     
                  <div className="collapsible_user">
                           
                        { isAuthenticated() && <Fragment>
                           <div className = "nav-link" 
                              style = {{color:"#FFFFFF"}} 
                              onClick = {() => {signout(() => {history.push("/")})}}>Sign out</div>
                        </Fragment>

                        }
                      
                  </div>
                  </ul>
               </div>
           



                     <div className = 'menu_list_container'>
                          
                                    
                                    
                                 
                                    {isAuthenticated() && isAuthenticated().user.role === 1 && 

                                             
                                          (<Fragment> 
                                              <div className="nav__toggler mt-3" onClick = {()=>handleMenu('menu')}>
                                                <FontAwesomeIcon  icon = 'bars' color = '#fff' size = '2x'/>
                                            </div>
                        
                                        <ul className = 'nav-list collapsible_menu'>
                                           <li style = {{color:"#FFFFFF"}}><Link  style = {currentTab(history,"/")}  to = '/' className = "nav-link"   >Home</Link></li>  
                                          <li style = {{color:"#FFFFFF"}}><Link   style = {currentTab(history,"/client")}                                                                                
                                                                                 to = '/client'
                                                                                 className = "nav-link" 
                                                                                >Client</Link></li>
                                          <li  style = {{color:"#FFFFFF"}}><Link style = {currentTab(history,"/order")}
                                                                                 to = '/order'                                                                                 
                                                                                 className = "nav-link" 
                                                                               >Order</Link></li>
                                           <li  style = {{color:"#FFFFFF"}}><Link style = {currentTab(history,"/products")}
                                                                                 to = '/products'  
                                                                                 className = "nav-link" 
                                                                                 >Products</Link></li>                                    
                                          {/* <li  style = {{color:"#FFFFFF"}}><Link style = {currentTab(history,"/shipment")}
                                                                                 to = '/shipment'  
                                                                                 className = "nav-link" 
                                                                                 >Shipment</Link></li> */}
                                          <li  style = {{color:"#FFFFFF"}}><Link style = {currentTab(history,"/accounts")}  
                                                                                 className = "nav-link"
                                                                                 to = '/accounts' 
                                                                                 >Accounts</Link></li>
                                          <li  style = {{color:"#FFFFFF"}}><Link style = {currentTab(history,"/settings")}  
                                                                                 className = "nav-link"
                                                                                 to = '/settings' 
                                                                                 >Settings</Link></li>

                                               </ul>                                                         
                                          </Fragment>
                                          )}   
                                
                              
                           
                           
                  </div>
             

            </div>
            
         </div>
        
      );
}
 
export default withRouter(Menu);