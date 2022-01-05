import React,{useState,useEffect} from 'react'
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import Signin from './admin/Signin'
import Signup from './admin/Signup'
import Home from './core/Home'
import AdminRoute  from './auth/adminRoutes'
import Order from './core/Order'
import Client from './core/Client'
import Settings from './core/Settings'


import ForgotPassword from './auth/ForgotPassword'


import { isAuthenticated } from './auth';
import  {getClients, getOrders,getProducts, 
         getInvoices,getAllReceipts,
         getAllAdjustments,getAllStaff} from './admin/clientApi'

import ClientContext from './context/ClientContext'
import UserContext  from './context/UserContext'
import OrderContext from './context/OrderContext'
import ProductContext from './context/ProductContext'
import InvoiceContext from './context/InvoiceContext'
import ReceiptContext from './context/ReceiptContext'


import NewOrderForm from './components/NewOrderForm'
import OrderTable from './components/OrderTable'
import OfficeContext from './context/OfficeContext'
import CompanyContext from './context/CompanyContext'
import NewClientForm from './components/Client/NewClientForm'
import Products from './core/Products'
import ProductForm from './components/Products/ProductForm'
import Shipment from './core/Shipment'
import Accounts from './core/Accounts'

import OrderPerClientTable from './components/Client/OrderPerClientTable'
import ClientProfilePage from './components/Client/ClientProfilePage'
import Payment from './components/Accounts/Payment'
import Invoice from './components/Accounts/Invoice/Invoice'
import Receipt from './components/Accounts/Receipt/Receipt'
import Adjustment from './components/Accounts/Adjustment/Adjustment'
import AdjustmentContext from './context/AdjustmentContext'


import ComponentToPrint from './components/print/ComponentToPrint'
import ReceiptComponentToPrint from './components/print/Receipt/ReceiptComponentToPrint'
import ResetPassword from './auth/ResetPassword'


function Routes() {


    const {user,token} = isAuthenticated()

   
    const [clients,setClients] = useState([])
    const [orders,setOrders] = useState([])
    const [products,setProducts] = useState([])
    const [invoices,setInvoices] = useState([])
    const [receipts,setReceipts] = useState([])
    
    const [staff,setStaff] = useState([])
    const [adjustments,setAdjustments] = useState([])
    const [redirect , setRedirect] = useState(false)
    const [currentCompany,setCurrentCompany] = useState('1')
    const [pathRedirect,setPathRedirect] = useState(null)
   
    const [clientSelected,setClientSelected] = useState(null)  
    const [orderSelected,setOrderSelected] = useState(null)
    const [invoiceSelected,setInvoiceSelected] = useState(null)
    const [receiptSelected,setReceiptSelected] = useState(null)
    const [message,setMessage] = useState('')
    const [alert,setAlert] = useState(false)


const fetchClients =  async () => {

                await  getClients(user._id,token)
                    .then(data => {
                        if(data.error){
                        setMessage("Error fetching data")
                        setAlert(true)
                        setTimeout(()=>setAlert(false),2000)
                        window.alert("Failed to Connect to database ")
                        }
                        else {
                            setClients(data)
                        }
                    })
                    .catch(err => { 
                                        setMessage("Error fetching data")
                                        setAlert(true)
                                        setTimeout(()=>setAlert(false),2000)
                                        })
       
        
        
    }    
const fetchOrders = async ()=> {
   

                     await getOrders(user._id,token)
                            .then(data => {
                                if(data.error){
                                setMessage("Error fetching data")
                                setAlert(true)
                                setTimeout(()=>setAlert(false),2000)
                                }
                                else {
                                    setOrders(data)
                                    // console.log("ORDERS RECEIVED IN ROUTES :",data)
                                }
                            })
                            .catch(err => { 
                                                setMessage("Error fetching data")
                                                setAlert(true)
                                                setTimeout(()=>setAlert(false),2000)
                                                })
        // setOrders(orderData)
       
    }
const fetchProducts = async () => {     

                 await getProducts(user._id,token)
                                .then(data => {
                                    if(data.error){
                                    setMessage("Error fetching data")
                                    setAlert(true)
                                    setTimeout(()=>setAlert(false),2000)
                                    }
                                    else {
                                        setProducts(data)
                                    }
                                })
                                .catch(err => { 
                                                    setMessage("Error fetching data")
                                                    setAlert(true)
                                                    setTimeout(()=>setAlert(false),2000)
                                                    })
    
    
   }
const fetchInvoices = async () => {
    await  getInvoices()
           .then(data => {
               if(data.error){
                  setMessage("Error fetching data")

                  setAlert(true)
                  setTimeout(()=>setAlert(false),2000)
               }
               else {
                //    console.log("Invoices generated in Route :",data)
                   setInvoices(data)
               }
           })
           .catch(error =>{
                 setMessage("Error fetching data")
                 setAlert(true)
                 setTimeout(()=>setAlert(false),2000)
           } 
              )
 }
const fetchReceipts = async () => {
    await getAllReceipts()
    .then(data => {
        if(data.error){
           setMessage("Error fetching data")
           setAlert(true)
           setTimeout(()=>setAlert(false),2000)
        }
        else {
            // console.log("RECEIPTS IN ROUTE :",data)
            setReceipts(data)
        }
    })
    .catch(error =>{
          setMessage("Error fetching data")
          setAlert(true)
          setTimeout(()=>setAlert(false),2000)
    } 
       )
}
const  fetchAdjustments = async () => {
    await getAllAdjustments()
    .then(data => {
        if(data.error){
           setMessage("Error fetching data")
           setAlert(true)
           setTimeout(()=>setAlert(false),2000)
        }
        else {
            // console.log("ADJUSTMENTS IN ROUTE :",data)
            setAdjustments(data)
        }
    })
    .catch(error =>{
          setMessage("Error fetching data")
          setAlert(true)
          setTimeout(()=>setAlert(false),2000)
    } 
       )
}
const fetchStaff = async () => {
    await getAllStaff()
    .then(data => {
        if(data.error){
           setMessage("Error fetching data")
           setAlert(true)
           setTimeout(()=>setAlert(false),2000)
        }
        else {
            
            setStaff(data)
        }
    })
    .catch(error =>{
          setMessage("Error fetching data")
          setAlert(true)
          setTimeout(()=>setAlert(false),2000)
    } 
       )
}
const onClientSelect = (client) => { 
      setClientSelected(client)   
      setRedirect(true)
   }
const onOrderSelect = (order) => {
    setOrderSelected(order)
    setRedirect(true)
}   
const updateDB = () => {
    if(user){
        fetchClients() 
        fetchProducts()
        fetchOrders()
        fetchInvoices()
        fetchReceipts()
        fetchAdjustments() 
        fetchStaff()
    }
}
    
useEffect(()=>{
    // updateDB()
    // setInterval(updateDB,120000)
},[])


useEffect(()=> {
    performRedirect()
    // console.log("This is route refresh")
},[redirect])





const   performRedirect = () => {
   
    if(redirect)
    {
           
          if(pathRedirect )
           return <Redirect to = {pathRedirect} />;
           setRedirect(false)
        }
           
}



    return (   

            <div>
                {/* {error && <h3 className = 'text-danger'>{error}</h3>} */}
                {alert && <div className = 'text-red fs-3'>{message}</div>}
         <BrowserRouter basename="/labease">
                  <Switch>

                      {/* <Route path = '/client' exact component = {Client}/> */}
                      <Route path = '/signup'  exact  component = {Signup}/>
                      <Route path = '/signin' exact component = {Signin}/>
                      <Route path  = '/reset-pswd' exact component = {ForgotPassword}/>
                      <Route path  = '/reset-pswd/:id/:token' exact component = {ResetPassword}/>
     
     
                      
                      {/* <AdminRoute path = '/' exact  component = {Base}/> */}
                <OfficeContext.Provider value = {staff}>      
                 <UserContext.Provider value = {{user,token}}>
                 <ClientContext.Provider value = {{clients,fetchClients,setClients,onClientSelect,clientSelected,
                                                    redirect,setRedirect,setClientSelected,setPathRedirect}}>
                 <OrderContext.Provider value = {{orders,fetchOrders,onOrderSelect,setOrderSelected,orderSelected}}>
                 <ProductContext.Provider value = {{products,fetchProducts}}> 
                 <CompanyContext.Provider value = {{currentCompany,setCurrentCompany}}>
                 <InvoiceContext.Provider value = {{invoices,invoiceSelected,setInvoiceSelected,fetchInvoices,setPathRedirect,setRedirect}} >
                    <ReceiptContext.Provider value = {{receipts,receiptSelected,setReceiptSelected,fetchReceipts}}>
                     <AdjustmentContext.Provider value = {{adjustments}}>
                      {performRedirect()}  
                      <AdminRoute path = '/' exact  component = {Home}/>
                    
                      <AdminRoute path = '/client' exact component = {Client }/>
                      <AdminRoute path = '/client/newclient' exact   component = {NewClientForm }/>
                      <AdminRoute path = '/client/orders' exact   component = {OrderPerClientTable }/>
                      <AdminRoute path = '/client/clientprofile' exact   component = {ClientProfilePage}/>

                      
                    
                      <AdminRoute path = '/order' exact component = {Order}/>
                      <AdminRoute path = '/ordertable' exact component = {OrderTable}/>
                      <AdminRoute path = '/order/neworder' exact component = {NewOrderForm}/>
  
                      <AdminRoute path = '/products' exact component = {Products}/>
                      <AdminRoute path = '/products/newproduct' exact component = {ProductForm}/>

                      <AdminRoute  path = '/payment' exact component = {Payment}/>
                


                      <AdminRoute  path = '/shipment' exact component = {Shipment}/>

                      <AdminRoute  path = '/accounts' exact component = {Accounts}/>
                      <AdminRoute  path = '/accounts/invoices' exact component = {Invoice}/>
                      <AdminRoute  path = '/accounts/collections' exact component = {Accounts}/>
                      <AdminRoute  path = '/accounts/adjustments' exact component = {Adjustment}/>
                      <AdminRoute  path = '/accounts/manage' exact component = {Accounts}/>
                      <AdminRoute  path = '/accounts/receipt' exact component = {Receipt}/>
                      
                      <AdminRoute  path = '/settings' exact component = {Settings}/>
                      
                      <AdminRoute  path = '/print/invoice/:id' exact component =  {ComponentToPrint}/>
                      <AdminRoute  path = '/print/receipt/:id' exact component = {ReceiptComponentToPrint}/>
                      
                         </AdjustmentContext.Provider>
                      </ReceiptContext.Provider>
                         </InvoiceContext.Provider>
                        </CompanyContext.Provider>
                      </ProductContext.Provider>
                  </OrderContext.Provider>
                </ClientContext.Provider>
               </UserContext.Provider>
               </OfficeContext.Provider>
                  </Switch>
          
         </BrowserRouter>
         </div>
             
    );
}

export default Routes;