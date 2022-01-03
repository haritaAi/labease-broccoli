import React,{useEffect, useState,useContext} from 'react';
import {Link} from 'react-router-dom'
import ReceiptTable from './ReceiptTable';
import Menu from '../../../components/menu'
import {getAllReceipts} from '../../../admin/clientApi'
import ReceiptContext from '../../../context/ReceiptContext';
import SubMenuAccounts from '../SubMenuAccounts';

const  Receipt = (props)=> {
  
   const {receipts,setReceiptSelected,receiptSelected,fetchReceipts} = useContext(ReceiptContext) 
   
   const [currentTab,setCurrentTab] = useState(1)
   const [receiptsCancelled,setReceiptsCancelled] = useState([])
   const [allReceipts,setAllReceipts] = useState([])
const handleReceiptSelect = () => {

}
const findAllReceipts = ()=>{
    let data = receipts.filter(receipt => receipt.cancelled === false)
    setAllReceipts(data)
}

const findCancelledReceipts = () => {
   let data = receipts.filter(receipt => receipt.cancelled === true)  
   setReceiptsCancelled(data) 
}
useEffect(()=>{
   findAllReceipts()
   findCancelledReceipts()
  
},[])



    return (
        <div>
            <Menu/>
            <SubMenuAccounts  />
            
            <div className = 'container-fluid'>
                <div className="row">
                    <div className="col-12 col-md-2">
                        <div className = 'd-flex  flex-column my-3'> 
                        <Link className = 'btn btn-info fs-4 '                              
                            to = '/payment'       
                                >+New Receipt</Link>
                        <div className = 'btn btn-info fs-4 my-1'
                             style ={currentTab===1? {backgroundColor : "#0b8df7"}:null}
                            onClick = {()=>setCurrentTab(1)} 
                            >Payments</div>        
                        <div className = 'btn btn-info fs-4 my-1'
                             style ={currentTab===2? {backgroundColor : "#0b8df7"}:null}
                            onClick = {()=>setCurrentTab(2)} 
                            >Cancelled Payments</div>       
                    </div>
                    </div>

                    <div className="col-12 col-md-10">
                       {currentTab ===1 &&   <ReceiptTable receipts = {allReceipts} 
                                        onReceiptSelect = {handleReceiptSelect} 
                                        path = '/accounts/receipt' />   }
                         {currentTab ===2 &&   <ReceiptTable receipts = {receiptsCancelled} 
                                        onReceiptSelect = {handleReceiptSelect} 
                                        path = '/accounts/receipt' />   }
                                                                            
                        </div> 
               </div>
          </div>
        </div>
    );
}

export default Receipt;