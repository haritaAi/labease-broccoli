import React,{useState,useContext,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {getToDate} from '../components/date.js'
import JobSet from '../components/JobSet';
import ClientOrderTable from './ClientOrderTable.jsx';
import { getNextOrderSequence, updateOrder } from '../admin/clientApi/index.js';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Teethselector from './Teethselector.jsx';
// import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
// import LuxonUtils from '@date-io/luxon';
import {
    
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
  

import UserContext from '../context/UserContext.js';
import ClientContext from '../context/ClientContext.js';
import OrderContext from '../context/OrderContext.js';
import { createOrder } from '../admin/clientApi/index.js';
import Menu from '../components/menu'
import '../css/order.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import DeleteOutline from '@material-ui/icons/DeleteOutline';




const NewOrderForm = ({onAddOrderCancel,onConfirmOrder}) =>  {

const history = useHistory()

   
const toDay = getToDate()
// const toDay = new Date().toDateString()

const {user,token} = useContext(UserContext)
const {clients,clientSelected,onClientSelect,setPathRedirect,setRedirect,setClientSelected} = useContext(ClientContext)
 const {orders,fetchOrders,orderSelected,setOrderSelected} = useContext(OrderContext)
// const {products} = useContext(ProductContext)
const [orderNumber,setOrderNumber] = useState(null)
const [currentOrderTab,setCurrentOrderTab] = useState(1)
let totalOrderAmount = 0
const [values,setValues] = useState({
    
    orderNo:0,
    orderAmount:0,
    status:'New',
    orderDate:new Date(),
    updated:new Date(),
    duedate:new Date(),
    dateIn:new Date(),
    deliverytime:'',
    deliveryMethod:'',
    department:'',
    ordertime:'',
    client:'',
    clientId:'',
    patient:'',
    user:user.name,
    shipment:'',
    assignedTo:'',
    error:'',
    additionalAmount:0,
    trayNo:0,
    shade1:'',
    shade2:'',
    shade3:'',
    shadeNote:'',
    articulatorTag:'',
    priority:'',  
    notes:'',
    priceBand:'',
    billTo:'',
    orderNotes:'',
    invoiceId:'',
    productsList:'',
    products:[],
    workType:'new',
    log:[],
    modelno:'',
})


const [alert,setAlert] = useState(false)
const [message,setMessage] = useState('')
const [isUpdate,setIsUpdate] = useState(false)
const [addProduct,setAddProduct] = useState(false)
const [order_Date,handleOrderDate] = useState(new Date())
const [due_Date,handleDueDate] = useState(new Date())
const [dateIn_Date,handleDateIn] = useState(new Date())
const [update_Date,handleUpdateDate] = useState(new Date())
const [jobs,setJobs] = useState([])

   
const {_id,modelno,orderNo,orderAmount,status,orderDate,updated,dueDate,dateIn,deliverytime,deliveryMethod,ordertime,client,clientId,
       patient,shipment,additionalAmount,trayNo,shade1,shade2,shade3,shadeNote,articulatorTag,priority,notes,department,
       priceBand,billTo,orderNotes,invoiceId,products,productsList,assignedTo,workType} = values

const handleChange = name => event => {
  const value = event.target.value; 
  console.log(`${name} : ${value}`)
 
  setValues({...values,[name]:value})
 
} 


const calculateTotalBill = (jobset) => {
  

    let totalBill = 0;    
    for(let i =0; i<jobset.length;i++){
       totalBill += jobset[i].total  
        console.log("Total Bill :",totalBill)
    }       
   
    return totalBill 
}
const calculateFinalBill = (jobset) => {
    if(additionalAmount && additionalAmount>0)
             return ( calculateTotalBill(jobs) +  parseInt(additionalAmount))

   else return calculateTotalBill(jobs)

} 

const handleOrderCancel = () => {
 
    // setProductSelected(null)
    //redirect to ordertable
    
    history.goBack();
}
const addTojobs = job => {
    
    let temp  = {...job}
    temp.id = jobs.length+1;
    let newJobs = [...jobs,temp]
    setJobs(newJobs)
    let total = calculateTotalBill(newJobs)
    setValues({...values,orderAmount:total})
    console.log("NEW JOBS RECEIVED IN ADDTOJOBS",newJobs)
    setAddProduct(false)
}

const addToJobCancel = ()=>{
    setAddProduct(false)

}
const editExistingJob = job => {
    console.log("JOB RECIEVED FOR EDITING :",job)
    let replaceIndex = jobs.findIndex(j => j.id === job.id)
    let newJobs = [...jobs]
    newJobs[replaceIndex] = {...job}
    setJobs(()=> [...newJobs])  

    console.log("Job recieved in NewOrderForm NEWJOBS********: ",newJobs)
    let total = calculateTotalBill(newJobs)
    setValues({...values,orderAmount:total})
}
const deleteExistingJob = id => {     
    
      
     if(jobs.length === 1){
        let reply =  window.confirm("Are you sure you want to delete the order ?")
        if(reply === true){
            let newJobs = jobs.filter(j => j.id !== id)          
            setJobs(()=>[...newJobs])
            calculateTotalBill(jobs)
            let total = calculateTotalBill(newJobs)
            setValues({...values,orderAmount:total})
     }
    }
     else{
        let newJobs = jobs.filter(j => j.id !== id)
        console.log(`New JOB :::AFTER DELETING ID ${id} `,newJobs)
        setJobs(newJobs)
        let total = calculateTotalBill(newJobs)
        setValues({...values,orderAmount:total})

     }
    
}


const handleOrderSave = ( )=>{
  
    let jobset = [...jobs]

   
    
    
    const newValues = {
       
        orderNo:orderNumber,        
        orderAmount: calculateFinalBill(jobs),
        products : jobset,           
        modelno:modelno,
        status:status,
        orderDate:order_Date,       
        updated:new Date(),
        duedate:due_Date,
        dateIn:dateIn_Date,
        deliverytime,
        deliveryMethod,
        ordertime,
        client:clientSelected.name,
        clientId:clientSelected._id,
        patient,
        user:user.name,        
        shipment:'',
        assignedTo,
        additionalAmount,
        trayNo:0,
        shade1,
        shade2,
        shade3,
        shadeNote,
        articulatorTag,
        priority,          
        priceBand:clientSelected.priceBand,
        billTo:clientSelected.billTo,
        orderNotes,
        department,
        invoiceId:'',
        isInvoiced:false,
        workType,
        
  
       
     }
   
if(isUpdate){

    console.log("Order Values  in NewOrderForm UPDATE: ",newValues)


    newValues._id = orderSelected._id
   updateOrder(user._id,token,newValues)
   .then(data => {
    if(data.status !==200){
        setMessage('Error While Updating Order')
        setAlert(true)
        setTimeout(()=>setAlert(false),2000)
    }
    else{
          setMessage('Order updated Successfully')
          setAlert(true)
          setTimeout(()=>setAlert(false),2000)
          setPathRedirect(`${process.env.PUBLIC_URL}/order`)
          fetchOrders()
          setRedirect(true)
          setClientSelected(null)
        }
        } )
        .catch(err => {
            setMessage('Error While Updating Data: ')
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)

        }) 
}
else {
 
    
    
    
       
         createOrder(user._id,token,newValues)
          .then(data => {
              if(data.status !==200){
                  setMessage('Error While Saving Order')
                  setAlert(true)
                  setTimeout(()=>setAlert(false),2000)
              }
              else{
                    setMessage('Order Saved Successfully')
                    setAlert(true)
                    setTimeout(()=>setAlert(false),2000)
                    setPathRedirect(`${process.env.PUBLIC_URL}/order`)
                    fetchOrders()
                    setRedirect(true)
                    setClientSelected(null)
              }
          } )
          .catch(err => {
              setMessage('Error While Saving Data: ')
              setAlert(true)
              setTimeout(()=>setAlert(false),2000)
    
                
    
    
          }) 

}
 
   history.goBack()

         
}
const formHeader = () => {
    return (       <form >        
                                   <div className=" d-flex flex-column flex-sm-row w-100 fs-4">
                                      <div className="col  border border-dark ">
                                          <div className="">
                                                 <div className = "d-flex flex-row flex-wrap ">
                                                         <div className = 'col-5  d-flex flex-row mb-1 ' >
                                                             <div className = 'col-6 col-md-4 '>Order # : </div>
                                                             <input className = 'col-6 col-md-8' 
                                                                    value = {orderNo}
                                                                    type = 'number'                                                                    
                                                                    />                                                        
                                                         </div>
                                                        <div className="col-md-1 "></div>
                                                         <div className = ' col-5 d-flex flex-row mb-1' >
                                                             <div className = 'col-6 col-md-4'>Charge : </div>
                                                             <div className = 'col-6 col-md-8'>{calculateFinalBill(jobs)}</div>
                                                         </div>
                                                  </div>
                                                  <div className="d-flex flex-sm-row flex-column justify-content-between">
                                                         <div className = 'col-sm-5 d-md-inline-flex  ' >
                                                             <div className = 'col-md-4'>Order Date : </div>
                                                            
                                                               <DatePicker selected = {order_Date} 
                                                                           onChange = {date => handleOrderDate(date)}
                                                                           dateFormat = 'dd/MM/yyyy'
                                                                           minDate = {new Date()}                                                                        //    isClearable 
                                                                           showYearDropdown
                                                                           scrollableMonthYearDropdown
                                                                           
                                                                           />
                                                                                                                    
                                                            
                                                         </div>
                                                       
                                                         <div className = ' col-sm-5 d-md-inline-flex mb-1' >
                                                             <div className = 'col-sm-4'>Model# :</div>
                                                             <input id = 'modelno' className = ' col col-md-8' type = 'number' />                                                            
                                                         </div>
                                                  </div>
                                                  <div className="d-flex flex-sm-row flex-column justify-content-between">
                                                         <div className = 'col-sm-5 d-md-inline-flex mb-1 ' >
                                                             <div className = 'col-md-4 '>Due Date : </div>
                                                           
                                                                <DatePicker selected = {due_Date} 
                                                                        onChange = {date => handleDueDate(date)}
                                                                        dateFormat = 'dd/MM/yyyy'
                                                                        minDate = {new Date()}  
                                                                        style = {{zIndex : '1000', fontSize:'1.8rem'}}                                                                                                                                          //    isClearable 
                                                                        showYearDropdown
                                                                        scrollableMonthYearDropdown                                                                           
                                                                        />                                                      
                                                         </div>
                                                        
                                                         <div className = ' col-sm-5 d-md-inline-flex mb-1' >
                                                               <div className="col-md-4 ">@</div>
                                                             <select id = 'deliverytime'
                                                                     className = 'col col-md-8 ' 
                                                                     value = {deliverytime}
                                                                     defaultValue={'Evening 4 - 5'}
                                                                     onChange = {handleChange('deliverytime')} >
                                                                  <option value = 'Morning 10 AM'>Morning 10 AM</option>
                                                                  <option value = 'Afternoon 3'>Afternoon 3</option>     
                                                                  <option value = 'Evening 4 - 5' >Evening 4 - 5</option>     
                                                                  <option value = 'Prcel 6:30'>Prcel 6:30</option>     
                                                                  <option value = 'Self Delivery'>Self Delivery</option>     
                                                                  <option value = 'Urgent Any-time'>Urgent Any-time</option>     
                                                                  <option value = '>Next Morning 8AM'>Next Morning 8AM</option>     
                                                              </select>                                                           
                                                         </div>
                                                  </div>
                                                  <div className="d-flex flex-sm-row flex-column justify-content-between">
                                                         <div className = 'col-md-5 d-md-inline-flex mb-1 ' >
                                                             <div className = 'col-md-4 '>Date In : </div>
                                                             
                                                                <DatePicker selected = {dateIn_Date} 
                                                                        onChange = {date => handleDateIn(date)}
                                                                        dateFormat = 'dd/MM/yyyy'
                                                                        minDate = {new Date()}                                                                        //    isClearable 
                                                                        showYearDropdown
                                                                        scrollableMonthYearDropdown                                                                           
                                                                        />                                                   
                                                         </div>
                                                        
                                                         <div className = 'col-sm-5 d-md-inline-flex' >
                                                               <div className="col-md-4">@</div>
                                                             <select className = 'col col-md-8' 
                                                                     id = 'ordertime'
                                                                     value = {ordertime}
                                                                     onChange = {handleChange('ordertime')} >
                                                                 <option></option>
                                                                  <option value = 'Morning 10 AM'>Morning 10 AM</option>
                                                                  <option value = 'Afternoon 3'>Afternoon 3</option>     
                                                                  <option value = 'Evening 4 - 5'>Evening 4 - 5</option>     
                                                                  <option value = 'Prcel 6:30'>Prcel 6:30</option>     
                                                                  <option value = 'Self Delivery'>Self Delivery</option>     
                                                                  <option value = 'Urgent Any-time'>Urgent Any-time</option>     
                                                                  <option value = 'Next Morning 8AM'>Next Morning 8AM</option>     
                                                              </select>                                                           
                                                         </div>
                                                  </div>
 
                                          </div>
                                           
                                           
                                           
                                      </div>
                                      
                                      <div className="col border border-dark">
                                        <ul>
                                            <li className = "d-flex  flex-column flex-md-row ">
                                                <div className="col-md-6 d-flex flex-sm-row ">
                                                     <div className ="col-md-3 col-6">Client</div>
                                                     <div className = "col-md-3 col-6 text-primary ">
                                                             <b>{clientSelected.name}</b></div> 
                                                </div>
                                                <div className="col-md-6 d-flex flex-sm-row ">                                                 
                                                   <div className = "col-md-3 col-6">Balance</div>
                                                   <div className = "col-md-3 col-6">0</div>
                                                   </div>
                                             </li>
                                             
                                             <li className = "d-flex flex-md-row flex-column">
                                                 <div className="col-md-6 d-flex flex-sm-row ">
                                                       <div className ="col-md-3 col-6" >Price Band</div>
                                                       <div className ="col-md-3 col-6">{priceBand}</div>
                                                   </div>
                                              </li>
 
                                            <li className = "d-flex flex-md-row flex-column">
                                                    <div  className = "col-md-3 col-6">Bill To : </div>
                                                    <div className = 'col-md-3 col-6'>{billTo}</div>
                                            </li>
                                            <li className = "d-flex flex-md-row">
                                                     <div  className = "col-md-auto col-6">Notes : </div>
                                                     <div className = "col-md-auto col-6">{clientSelected.notes}</div>
                                            </li>
                                            <li className = "d-flex flex-md-row flex-column">
                                                <div className="col-md-6 d-flex flex-sm-row ">
                                                   <div className ="col-md-auto col-6">Invoice # : </div>
                                                   <div  className = "col-md-auto col-6">{invoiceId}</div>
                                                 </div> 
                                                   <li  className = "col-md-auto col-6">Shipment # </li>
                                                   <li  className = "col-md-auto col-6"></li> 
                                                                                           
                                            </li>
 
                                            </ul> 
                                          
 
                                      </div>
                                          
                                   </div>
                                   </form>
    )
}

const formFooter = () => {
    return( 
        <form>
    <div className = ' ' style = {{fontSize : '1.6rem'}}>

      
        <div className = 'd-flex flex-column flex-md-row  '>
           <div className = 'd-flex flex-row justify-content-between'>
            <div className = 'mx-2' >
                <div>Additional Amount</div>
                <input  type = 'number'
                        style = {{maxWidth:'45vW'}}
                        value = {additionalAmount}                     
                        onChange= {handleChange('additionalAmount') }
                        />
            </div>
            <div className = 'mx-2'>
                <div>Patient</div>
                <input type = 'text'
                       value = {patient}
                       style = {{maxWidth:'45vW'}}
                       onChange = {handleChange('patient')} 
                           />
            </div>
            </div>
            <div className = 'd-flex flex-row justify-content-between'>
            <div className = 'mx-2'>
                <div>Delivery Method</div>
                <select     id = 'deliveryMehtod'
                            type = 'text' 
                            value = {deliveryMethod}
                            defaultValue={'Doctor pickup'}
                            onChange = {handleChange('deliveryMethod')} 
                            >
                        
                        <option value = 'courier'>courier</option>
                        <option value = 'Delivery Boy' >Delivery Boy</option>
                        <option value = 'Doctor pickup' >Doctor pickup</option>
                        <option value = 'Mail'>Mail</option>
                    </select> 
                    
            </div>
            <div className = 'mx-2' >
                <div>Status</div>
                <select  value = {status}
                         defaultValue={'New'}
                         onChange = {handleChange('status')}>
                    <option value = 'New' >New</option>
                    <option value = 'In Production'>In Production</option>
                    <option value = 'Complete'>Complete</option>
                    <option value = 'Hold'>Hold</option>
                    <option value = 'Try In'>Try In</option>
                    <option value = 'Cancelled'>Cancelled</option>
                </select>
            </div>
            
            <div className = 'mx-2'>
               <div>{(new  Date()).toDateString()}</div>
            </div>
        </div>
        </div>
        <hr/>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
       
        <div className = 'd-flex flex-row  justify-content-start flex-wrap'>          
           <div className = 'mx-2' >
               <div>Pan/Tray#</div>
               <input type = 'number'
                      value = {trayNo}
                      style = {{maxWidth:'45vW'}}
                      onChange = {handleChange('trayNo')}
                       />  
               </div> 

               <div  className = 'mx-2'>
                   <div>Assign To</div>
                   <select style = {{maxWidth : '45vw'}}
                           value = {assignedTo} 
                           onChange = {handleChange('assignedTo')} 
                            >
                       <option >staff</option>
                   </select>
               </div>
               <div >
                   <div className="mx-2">Manufacturer</div>
                   <select name="" id="">
                       <option>In house Lab</option>
                   </select>
               </div>

               </div>
            <div className = 'd-flex flex-row '>
                {/* list of Enclosures   */}
              
               <div className = ' btn text-primary fs-4'>
                   Add Enclosures
               </div>
               <div className = 'btn text-primary fs-4'>
                  Edit Enclosures
               </div>
               </div>
        </div>
         <div className = 'd-flex flex-row justify-content-between align-items-center flex-wrap'>
             <div className = 'mx-2' >
                <div >Department</div>
                  <select   style = {{width:'15rem'}}
                            value = {department}
                            onChange = {handleChange('department')}
                            >
                   <option value=""></option>
                   </select>  
             </div>
             <div className = 'mx-2' > 
                 <div>Work Type</div>
                
                     <div className = 'form-check form-check-inline'>
                        <label className = 'form-check-label' htmlFor = 'new'>New</label>
                        <input className = 'form-check-input' name="worktypeOption"
                                                              id="new" value = 'new' 
                                                              onChange = {handleChange('workType')} 
                                                              type="radio"  />
                     </div>
                    <div className = 'form-check form-check-inline'>
                        <label className = 'form-check-label' htmlFor = 'repeat'>Repeat</label>
                        <input className = 'form-check-input' name="worktypeOption" 
                                                              id="repeat" value = 'repeat'
                                                              onChange = {handleChange('workType')} 
                                                              type="radio"  />
                    </div>
                   <div className="form-check form-check-inline">
                        <label className = 'form-check-label' htmlFor="repair">Repair</label>
                        <input className = 'form-check-input' name="worktypeOption" 
                                                                id="repair" value = 'repair'
                                                                onChange = {handleChange('workType')} 
                                                                 type="radio" />
                   </div>
                   
               
                 
             </div>
              <div className = 'mx-2'>
                 Sub Doctor
                 <div className="d-flex flex-row align-items-center">
                    <div>Primary Doctor</div>
                    <IconButton>                  
                      <SearchIcon  sx={{fontSize: 30}} />  
                      </IconButton>  
                      <IconButton>                  
                      <AddIcon  sx={{fontSize: 30}} />  
                      </IconButton>
                 </div>
                  
                 {/* create Doc module* */}
                </div> 
                <div className = 'mx-2'>
                 Drop Location
                 <div className="d-flex flex-row align-items-center">
                    <div>Primary Address</div>  
                    <IconButton>                  
                      <SearchIcon  sx={{fontSize: 30}} />  
                      </IconButton>
                      <IconButton>                  
                      <AddIcon  sx={{fontSize: 30}} />  
                      </IconButton>
                 </div>
                 
                 {/* create Doc module* */}
                </div>
                </div>
                <hr/>
                <div>
                    <input type = 'text'
                        style = {{width : '100%'}}
                        placeholder = 'Order Notes'
                        value = {orderNotes}
                        onChange = {handleChange('orderNotes')}
                        />
                </div>
               
         
        </div>
        </form>
    )
}

const orderActionButtons = ()=>{
    return (
         <div className="d-flex flex-row justify-content-evenly ">
                      {jobs.length>0 &&  <> <div className="btn btn-info fs-4" 
                             onClick = {()=>{
                                 setAddProduct(true)
                             }}
                             >+Add Product</div>
                        <div className="btn btn-info fs-4">Save & Print</div>
                        <div className="btn btn-info fs-4"
                             onClick = {handleOrderSave}
                             >Save</div></>}
                        {isUpdate && <div className = 'text-white btn btn-danger fs-4' >
                            <DeleteOutline style = {{fontSize : 24}}/>Delete Order</div>}
                        <div className="btn btn-info fs-4"  
                             onClick = {()=>{
                                 setOrderSelected(null)
                                 setClientSelected(null)
                                 setIsUpdate(false)
                                 setAddProduct(false)
                                 history.goBack()
                                }}    
                             >Cancel</div>
                </div>
    )
}
const orderTryin = () => {

    


    return( 
          <div className = ''>
              <div className="d-flex flex-row justify-content-between fs-4">
                  <div className="col"><b>#tryIn</b></div>
                  <div className="col"><b>Scheduled</b></div>
                  <div className="col"><b>Status</b></div>
              </div>
              <div className="d-flex flex-row  justify-content-between align-items-center  ">
                  <div className=" fs-4">Zig Trial</div>
                  <div className=""><input type = 'text' 
                                                      onChange = {()=>handleChange()} /></div>
                  <div className=" d-flex flex-row align-items-center">
                   <div className="btn text-primary fs-3"><b>X</b></div>
                    <div className = ' fs-4' >In Process</div>

                   </div>
            </div>
                        

          </div>
          
        
    )
}
const orderShadeSelection = () => {
    return (
         <div className = 'container fs-4'>
            Shade
            <div className="d-flex flex-row justify-content-between my-1" >
                <div className = 'w-25 ' >
                    <div> Shade1 </div>
                    <input type = 'text'
                           style ={{maxWidth :'80%'}}
                           value = {shade1}   
                           onChange = {handleChange('shade1')} />
                </div>
                <div className = 'w-25' >
                    <div>Shade2</div>
                    <input type = 'text'
                           style ={{maxWidth :'80%'}}
                           value = {shade2}   
                           onChange = {handleChange('shade2')} />
                </div>
                <div  className = 'w-25' >
                    <div>Shade3</div>
                    <input type = 'text'
                           style ={{maxWidth :'80%'}}
                           value = {shade3}   
                           onChange = {handleChange('shade3')} />
                </div>
                </div>
                <input type = 'text' 
                        style = {{width : '100%'}}
                       value = {shadeNote} 
                       placeholder = 'shade Notes' 
                       onChange = {()=> handleChange('shadeNote')} />
            
        </div>
    )
}
const orderPriority = ()=>{
    return(
         <div className = 'row fs-4'>
             <div className="col">
                 Articulator Tag
                 <input  type = 'text' 
                         value = {articulatorTag}
                         onChange = {()=>handleChange('articulatorTag')}
                         />
             </div>
             <div className="col">
                 Priority
                 <select className = 'form-select fs-4'>
                     <option value="ASAP">ASAP</option>
                     <option value="Expediate Service">Expediate Service</option>
                     <option value="Normal">Normal</option>
                     <option value="Urgent">Urgent</option>
                     <option value="very Urgent">very Urgent</option>
                 </select>
             </div>
        </div>
        
    )
}

const orderTabs = () => {


   return(
       <div className = 'd-flex flex-row' >
            <div className="btn btn-info fs-4 mx-2"
                 style = { currentOrderTab===1?  {backgroundColor : 'gold'} : null }
                 onClick = {() => setCurrentOrderTab(1)} 
                   >Detail</div> 
            <div className="btn btn-info fs-4 mx-2"
                 style = { currentOrderTab===2?  {backgroundColor : 'gold'} : null }
                 onClick = {() => setCurrentOrderTab(2)}                 
                  >Add Images</div> 
            <div className="btn btn-info fs-4 mx-2"
                 style = { currentOrderTab===3?  {backgroundColor : 'gold'} : null }
                 onClick = {() => setCurrentOrderTab(3)}                 
                  >Log</div> 
       </div>
   )
}

const orderForm = () =>{
    
    return (
        <div className =' order-container border border-dark '>
        
            <div className="d-flex flex-row justify-content-between">
                <div className = 'fs-1'><b>{isUpdate?'Edit' : 'New'}{'  '}Order</b></div>
               { jobs.length > 0 && <div className = 'my-1'>{orderTabs()}</div>}
             </div>
            { clientSelected  &&  <div className  = ''>
                                   
                                   {formHeader()} 
                                   <div className="">
                                        <div className="d-flex flex-column flex-md-row justify-content-between">
                                            
                                    {(!addProduct && jobs.length >=1 ) &&  <>
                                             <div className="col-12 col-md-8 border border-dark ">
                                                    {alert && <div className = 'fs-3 text-danger'>{message}</div>}
                                                        <JobSet products = {jobs} onAddOrderCancel = {handleOrderCancel} 
                                                                onConfirmOrder= {addTojobs} 
                                                                onEditJob = {editExistingJob} 
                                                                onDelete = {deleteExistingJob}/>                              
                                                        
                                                </div>
                                                <div className="col-12 col-md-4 container border border-dark">
                                                    <div>{orderTryin()}</div>
                                                    <hr/>
                                                    <div>{orderShadeSelection()}</div>
                                                    <hr/>
                                                    <div>{orderPriority()}</div>
                                                </div>
                                            </>
                                            }
                                            </div> 
                                            { (jobs.length<=0 || addProduct) &&  <Teethselector     onAddOrderCancel = {addToJobCancel} 
                                                                                                       onJobSave = {addTojobs}                                                                                               
                                                                                                       onEditJob = {editExistingJob}
                                                        />   } 
                                            
                                     </div>
                                 
                                    {!addProduct && jobs.length>0 && formFooter()}
                                </div>
                            
            }
         {!clientSelected && !isUpdate &&    <div className = ' text-center  '>
                       <span className = 'text-danger fs-4'>
                           <strong>Select Client to create New Order</strong></span>
                                      <ClientOrderTable  onClientSelection = {onClientSelect}/>
                                 </div>
           }   
         {!addProduct && orderActionButtons()}
        </div> 
       
           
     )
}  

const convertToSequnceString = (num) => {

   let newString = num.toString()
 
   let numlength = newString.length
   if(numlength < 6 ){
        for(let i=0; i< 6-numlength ;i++){
            newString = "0"+newString;           
        }
   }
   return newString

} 

const getOrderSequence = async () => {
    
    await  getNextOrderSequence()
        .then(data => {          
            
            setOrderNumber(convertToSequnceString(data.sequence_val))  
           

        })
        .catch(err => {
            setMessage("Error in sequence")
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
        })
}



useEffect(()=>{
   if(orderSelected){
      
       setIsUpdate(true)  
       setClientSelected(orderSelected.clientId)     
    
       setJobs([...orderSelected.products])
       setOrderNumber(orderSelected.orderNo)
       setValues({...orderSelected})
     
   }
   else{
        getOrderSequence()      

        setValues({...values,orderNo:orderNumber})
        setIsUpdate(false)

   }

},[orderNumber])



    return (
   
   
            <div className = ''>
                <Menu />
            <div className = 'lh-1'>
                {orderForm()}
            </div>
            </div>
   
    )


   
}

export default NewOrderForm;