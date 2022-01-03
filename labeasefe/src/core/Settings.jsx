import React,{useState,useEffect} from 'react';
import Menu from '../components/menu'
import Enclosure from '../components/Settings/Orders/Enclosure';
import Priorities from '../components/Settings/Orders/Priorities'
import PrintSettingsInvoice from '../components/Settings/PrintSettings/Invoice/PrintSettingsInvoice';
import PrintSettings from '../components/Settings/PrintSettings/PrintSettings';
import Categories from '../components/Settings/Clients/Categories'
import Pricebands from '../components/Settings/Clients/Pricebands';
import PaymentModes from '../components/Settings/Clients/PaymentModes';


const Settings = (props) => {

      const [currentTab,setCurrentTab] = useState(0)
      const [secondaryTab,setSecondaryTab] = useState(0)

  const settingsMenuTabs = () => {
      return (
          <div className='container-fluid d-flex flex-column justify-content-start'>
                    <div className=" btn btn-info  fs-4 my-2"                  
                        style ={currentTab ===1? {backgroundColor:'#0b8df7'} : null} 
                        onClick = {()=>{  setCurrentTab(1) 
                                          setSecondaryTab(1)
                        }} >Orders                      
                    
                    </div>
                    <div className="btn btn-info  fs-4 my-2 " 
                         style ={currentTab ===2? {backgroundColor:'#0b8df7'} : null} 
                         onClick = {() => { setCurrentTab(2)
                                            setSecondaryTab(1)
                    }}>
                        Clients
                    </div>
                    {/* <div className="btn btn-info  fs-4 my-2"                        
                         style ={currentTab ===3? {backgroundColor:'#0b8df7'} : null}  
                         onClick = {() => { setCurrentTab(3)
                                             setSecondaryTab(1)

                         }} >Print settings</div>                          */}
                   
                    {/* <div className="btn btn-info text-white fs-4 my-2 " 
                         style ={currentTab ===4? {backgroundColor:'#0b8df7'} : null} 
                         onClick = {() => { setCurrentTab(4)  
                                          setSecondaryTab(1)
                                            
                    }}>
                       Accounts
                    </div>
                    <div className="btn btn-info text-white fs-4 my-2 " 
                         style ={currentTab ===5? {backgroundColor:'#0b8df7'} : null} 
                         onClick = {() => { setCurrentTab(5)
                                          setSecondaryTab(1)

                    }}>
                       Inventory
                    </div> */}
          </div>
      )
  }
const printTabs = () => {   
     

    return (
        <div className='d-flex flex-row'>
              <div className = 'fs-4  btn btn-info mr-2 '
                   style ={(secondaryTab ===1 && currentTab ===3)? {backgroundColor:'#0b8df7'} : null} 
                   onClick={()=>{
                       setCurrentTab(3)
                       setSecondaryTab(1)
                   } 
                } >Invoice</div>
              <div className = 'fs-4  btn btn-info   mx-2'
                   style ={(secondaryTab ===2  && currentTab ===3)? {backgroundColor:'#0b8df7'} : null} 
                   onClick={()=>{
                       setCurrentTab(3)
                       setSecondaryTab(2)
                   } 
                } >Receipt</div>  
             <div className = 'fs-4  btn btn-info  mx-2'
                   style ={(secondaryTab ===3  && currentTab ===3)? {backgroundColor:'#0b8df7'} : null} 
                   onClick={()=>{
                       setCurrentTab(3)
                       setSecondaryTab(3)
                   } 
                } >Challan</div>
             <div className = 'fs-4  btn btn-info   mx-2'
                   style ={(secondaryTab ===4  && currentTab ===3)? {backgroundColor:'#0b8df7'} : null} 
                   onClick={()=>{
                       setCurrentTab(3)
                       setSecondaryTab(4)
                   } 
                } >Lab Slip</div>
            <div className = 'fs-4  btn btn-info  mx-2'
                style ={(secondaryTab ===5  && currentTab ===3)? {backgroundColor:'#0b8df7'} : null} 
                onClick={()=>{
                    setCurrentTab(3)
                    setSecondaryTab(5)
                } 
            } >Statement</div>
            <div className = 'fs-4  btn btn-info   mx-2'
                   style ={(secondaryTab ===6  && currentTab ===3)? {backgroundColor:'#0b8df7'} : null} 
                   onClick={()=>{
                       setCurrentTab(3)
                       setSecondaryTab(6)
                   } 
                } >Price List</div>

        </div>
    )
}
const orderTabs = () => {

    
     

    return (
        <div className='d-flex flex-row'>
              <div className = 'fs-4  btn btn-info  '
                   style ={(secondaryTab ===1 && currentTab ===1)? {backgroundColor:'#0b8df7'} : null} 
                   onClick={()=>{
                       setCurrentTab(1)
                       setSecondaryTab(1)
                   } 
                } >Enclosure</div>
              <div className = 'fs-4  btn btn-info  mx-2'
                   style ={(secondaryTab ===2 && currentTab ===1)? {backgroundColor:'#0b8df7'} : null} 
                   onClick={()=>{
                       setCurrentTab(1)
                       setSecondaryTab(2)
                   } 
                } >Priorities</div>  
             <div className = 'fs-4  btn btn-info   mx-2'
                   style ={(secondaryTab ===3 && currentTab ===1)? {backgroundColor:'#0b8df7'} : null} 
                   onClick={()=>{
                       setCurrentTab(1)
                       setSecondaryTab(3)
                   } 
                } >Tax Options</div>
           

        </div>
    )
}
const clientTabs = ()=>{
    return (
        <div className='d-flex flex-row'>
              <div className = 'fs-4  btn btn-info  '
                   style ={(secondaryTab ===1 && currentTab ===2)? {backgroundColor:'#0b8df7'} : null} 
                   onClick={()=>{
                       setCurrentTab(2)
                       setSecondaryTab(1)
                   } 
                } >Categories</div>
              <div className = 'fs-4  btn btn-info   mx-2'
                   style ={(secondaryTab ===2 && currentTab ===2)? {backgroundColor:'#0b8df7'} : null} 
                   onClick={()=>{
                       setCurrentTab(2)
                       setSecondaryTab(2)
                   } 
                } >Price Bands</div>  
             <div className = 'fs-4  btn btn-info   mx-2'
                   style ={(secondaryTab ===3 && currentTab ===2)? {backgroundColor:'#0b8df7'} : null} 
                   onClick={()=>{
                       setCurrentTab(2)
                       setSecondaryTab(3)
                   } 
                } >Payment Modes</div>
           

        </div>
    )
}

useEffect(()=>{
    setCurrentTab(0)
    setSecondaryTab(0)
},[])

    return (
        <div>
            <Menu />
            <div className="row">
             <div className="col-2">
                     {settingsMenuTabs()}
             </div>
             <div className="col-10 d-flex flex-column">
             { (currentTab ===0 && secondaryTab === 0)  &&      <>
                     <div className='my-2 mx-2'>{orderTabs()}</div>
                     <div className='my-2 mx-2'>{clientTabs()}</div>
                     {/* <div className='my-2 mx-2'>{printTabs()}</div> */}
                     </> 
                     }
              {(currentTab >0 && secondaryTab >0) && <>
                    {currentTab === 1 &&  <div className='my-2'> 
                                            <div>{orderTabs()}</div>
                                            {secondaryTab === 1 && <>
                                                     <Enclosure />
                                                 </>}
                                            {secondaryTab === 2 && <>
                                                     <Priorities />
                                                 </>}     
                                            </div>}
                   {currentTab === 2 && <div className='my-2'>
                                            <div>{clientTabs()}</div>
                                            {secondaryTab === 1 && <Categories />}
                                            {secondaryTab === 2 && <Pricebands />}
                                            {secondaryTab === 3 && <PaymentModes />}
                                       </div>}
                   {/* {currentTab === 3 && <div className='my-2'>
                                          <div>{printTabs()}</div>
                                         {secondaryTab === 1 && <div><PrintSettingsInvoice /></div>}                                        
                                        </div>}                     */}

              </>}       
             </div>
            </div>
             <div>
                 {currentTab === 3 && <PrintSettings currentTab = {secondaryTab} />}
             </div>
        </div>
    );
}

export default Settings;