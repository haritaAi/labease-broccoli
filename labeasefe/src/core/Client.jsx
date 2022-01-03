import React,{useState,useEffect,useContext} from 'react';

import Menu from '../components/menu';
import ClientContext from '../context/ClientContext';

import UserContext from '../context/UserContext';
import ClientNewTable from '../components/ClientNewTable';

import SubMenu from './SubMenu';



const Client = () => {


    const [values,setValues] = useState({

        _id : "",
        name: "",
        email : "",
        address1 : "",
        address2:"",
        loction : "",
        state:"",
        phoneO:'',
        phoneR:'',
        phoneM:'',       
        error : '',
        loadding : false,
        formData:'',


    })
  
  const {user,token} = useContext(UserContext)

  const {clients,fetchClients,onClientSelect,clientSelected,setClientSelected,setPathRedirect,setRedirect} = useContext(ClientContext)
  // console.log("Clients received in Clients :",clients)

  const handleEditClient = (client) => {     

    setPathRedirect('/client/newclient')
    onClientSelect(client)   
    // console.log("In handleEDit client",client)
    //   console.log("Client received : ",client) 

   
}
const handlePaymentClient = client => {
    setPathRedirect('/payment')
    onClientSelect(client)
}    
 const handleOrderClient = (client) => {
     
        setPathRedirect('/order/neworder')
        onClientSelect(client)   
  }

useEffect(()=>{
    setClientSelected(null)
    setRedirect(false)
   
},[])

    return (
       
           <div>
               <Menu />
                <div className = 'container'>                                  
                         <SubMenu />                    
                 
                            <div className="row  fs-4">                                                              
                                <ClientNewTable onEditClient = {handleEditClient} 
                                                onOrderClient = {handleOrderClient}    
                                                onPaymentClient = {handlePaymentClient}                                                 
                                                />
                        

                                        
                            </div>
                 
                
               
                </div>
            
        </div>
       
    );
}

export default Client;