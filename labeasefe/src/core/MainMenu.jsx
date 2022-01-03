import React, {Fragment,useState} from 'react';
import {Link,withRouter} from 'react-router-dom'
import { isAuthenticated ,signout} from '../auth';
import logo  from '../images/logo-white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/mainmenu.css'

const MainMenu = () => {


    return (
        <nav className = 'navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className="container-fluid">
                <div className="">                      
                    <img  className = 'logo-img' src = {logo} />                       
                </div>
               
                  <div className="d-flex flex-row">
                        <span className="navbar-toggler-icon fs-3"></span> 

                  </div>
                 
                 



            </div>
        </nav>
    )
}

export default  withRouter(MainMenu)