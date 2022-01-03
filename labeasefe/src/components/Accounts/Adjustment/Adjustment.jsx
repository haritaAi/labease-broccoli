import React,{useState,useEffect,useContext} from 'react';
import Menu from '../../../components/menu'
import SubMenuAccounts from '../SubMenuAccounts';
import AdjustmentTable from './AdjustmentTable';
import NewAdjustment from './NewAdjustment'

import ClientContext from '../../../context/ClientContext'


const  Adjustment = (props) => {

    const {setClientSelected} = useContext(ClientContext) 
    const  [currentTab,setCurrentTab] = useState(0)
     
 const adjustmentTabs = () => {


     return(
         <div className = 'd-flex flex-column'>
             <div className = 'btn btn-info fs-4 my-2'
                  style = {currentTab === 1?  {backgroundColor: "#0b8df7"}:null}
                  onClick = {()=>setCurrentTab(1)}
                  >+New Adjustment</div>           
             <div className = 'btn btn-info fs-4 my-2'
                  style = {currentTab === 2?  {backgroundColor: "#0b8df7"}:null}
                  onClick = {()=>setCurrentTab(2)}                  
                  >Debit Adjustment</div>
         </div>
     )
 }

const handleAdustmentCancel = () => {
  
    setCurrentTab(0)
    setClientSelected(null)
}


 useEffect(()=>{
     setClientSelected(null)
     
 },[])


    return (
        <div>
            <Menu/>
            <SubMenuAccounts/>
            <div className = 'container'>
                  <div className="row">
                      <div className="col-12 col-md-2"  >
                         {adjustmentTabs()}
                      </div>
                      <div className="col-12 col-md-10">
                          {currentTab === 0 && <AdjustmentTable  /> }
                          {currentTab === 1 && <NewAdjustment onAdjustmentCancel = {handleAdustmentCancel} />}
                          
                      </div>
                       
                  </div>
            </div>
        </div>
    );
}

export default Adjustment;