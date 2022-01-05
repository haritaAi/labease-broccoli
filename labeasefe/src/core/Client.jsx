import React,{useState,useEffect,useContext} from 'react';

import Menu from '../components/menu';
import ClientContext from '../context/ClientContext';

import UserContext from '../context/UserContext';
import ClientNewTable from '../components/ClientNewTable';

import SubMenu from './SubMenu';
import {getClients} from '../admin/clientApi'


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
        loading : false,
        formData:'',


    })
  
  const {user,token} = useContext(UserContext)

  const {onClientSelect,setClientSelected,setPathRedirect,setRedirect} = useContext(ClientContext)
//   const {clients,fetchClients,onClientSelect,clientSelected,setClientSelected,setPathRedirect,setRedirect} = useContext(ClientContext)
 
    const [clients,setClients] = useState([])
    

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
 
  const {error,loading} = values

 const fetchClients =  async () => {
      setValues({error : '',loading : true});
    await  getClients(user._id,token)
        .then(data => {
            if(data.error){
            setValues({error : "Error fetching data",loading : false})       
            window.alert("Failed to Connect to database ")
            }
            else {
                setClients(data)
                setValues({error : '',loading : false})
            }
        })
        .catch(err => {       
                            setValues({error : err,loading: false})
                            window.alert("Failed to Connect to database ")
                          
                            })

}   
useEffect(()=>{
    fetchClients()
    setClientSelected(null)
    setRedirect(false)
   
},[])

    return (
       
           <div>
               <Menu />
                <div className = 'container'>                                  
                         <SubMenu />                    
                          {loading && <div className='fs-3 text-center text-secondary'>Loading...</div>}
                          {error && <div className='fs-3 text-center text-danger'>{error} </div>}
                            <div className="row  fs-4">                                                              
                            {clients.length > 0 &&     <ClientNewTable clients = {clients}
                                                onEditClient = {handleEditClient} 
                                                onOrderClient = {handleOrderClient}    
                                                onPaymentClient = {handlePaymentClient}                                                 
                                                />
                        
                                    }   
                            {clients.length === 0 && <div>No database available</div>}             
                            </div>
                 
                
               
                </div>
            
        </div>
       
    );
}

export default Client;