import React,{useState,useEffect} from 'react';

const InvoiceBody = ({invoice}) => {

    const [ordersList,setOrdersList] = useState([invoice.ordersList])
    const [client,setClient]  = useState({...invoice.clientDetail})
     
 
 const getInitialValues = async () => {
    if(invoice){
        setOrdersList(invoice.ordersList)
        setClient(invoice.clientDetail)

    }
 }
useEffect(()=>{
        getInitialValues()
 },[])   



    return (
        <div>
            
        </div>
    );
}

export default InvoiceBody;