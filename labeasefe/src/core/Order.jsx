import React,{useEffect, useContext} from 'react';

import OrderContext from '../context/OrderContext';
import ClientContext from '../context/ClientContext';

import OrderTable from '../components/OrderTable';
import SubOrderMenu from '../core/subOrderMenu'
import Menu from '../components/menu'
import '../css/order.css'


const  Order = () =>  { 
    
    const {setClientSelected} = useContext(ClientContext)
    const {setOrderSelected} = useContext(OrderContext)
useEffect (() => {
   
    setClientSelected(null)
    setOrderSelected(null)       
},[])



    return (
      
      <div>  
        <Menu />
        
         <div className = 'container '>
             <SubOrderMenu />
            <div className = " fs-3">
          
             <OrderTable/>  
            

            </div>          
         
        </div> 
        </div>
    );
}

export default Order;