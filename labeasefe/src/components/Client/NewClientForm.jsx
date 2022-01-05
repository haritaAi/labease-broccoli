import React,{useState,useContext, useEffect} from 'react';
import {Redirect,useHistory} from 'react-router-dom'

import UserContext from '../../context/UserContext';
import {createClient,updateClient} from '../../admin/clientApi'
import TextError from '../TextError';
import OfficeContext from '../../context/OfficeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getNextClientSequence} from '../../admin/clientApi'

import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Menu from '../menu'

import Select from '../../components/Select'
import ClientContext from '../../context/ClientContext';
import CompanyContext  from '../../context/CompanyContext';

import Modal from '../../components/Modal'
import NewAddressForm from './NewAddressForm';
import AddressTable from './AddressTable';
import AddDoc from './AddDoc';
import AddIcon from '@mui/icons-material/Add';










function NewClientForm({onCancel}) {

   const history = useHistory()
    const {clients,fetchClients,onClientSelect,setClient,
        clientSelected,setClientSelected,setPathRedirect,setRedirect,redirect} = useContext(ClientContext)
         
    const {currentCompany,setCurrentCompany} = useContext(CompanyContext)    

    const [clientNumber,setClientNumber] = useState(0)


    const [values,setValues] = useState({
        addDoc:[],
        area : "",
        address1 : "",
        address2:"",
        address:[],
        acmanager :'',
        balance:'',
        billTo:'',       
        creditLimit:0,
        code : 0,
        company:currentCompany,
        contactPerson :'', 
        category : '',
        city:'',
        dcireg:'',   
        deliveryMethod :'',
        drcr : 'dr',
        emailPrimary :'' ,
        emailSecondary:'',  
        emailOption:false,
        gstin :'',  
        isLab : false,
        name: "",
        notes : '',
        pincode:'',
        phoneO:'',
        phoneR:'',
        phoneM:'',  
        priceBand:'',
        paymentTerms :'',
        route:'',
        regDate : new Date().toDateString(),
        state:"",
        smsOption:false,
        salutation:'Dr', 
        taxEx:false,
        workHours : '',
        
    })
  
  const {user,token} = useContext(UserContext)
 
  
  const {staff} = useContext(OfficeContext)



  const [errorAlert,setErrorAlert] = useState(false)
  const [errorMessage,setErrorMessage] = useState('')
  const [success,setSuccess] = useState(false)
  const [update,setUpdate] = useState(false)
  const [placeOrder,setPlaceOrder] = useState(false)
  const [additionalDoc,setAdditionalDoc] = useState([])
  const [show,setShow] = useState(false)
  const [isModalOpen ,setisModalOpen] = useState(false)
  const [addressBook ,setAddressBook] = useState([])
  const [location,setLocation] = useState(false)
  const [editLocation,setEditLocation] = useState(false)
  const [currentLocation,setCurrentLocation] = useState({})
  
  const clientNames = [{value : 'Select Client'}]
  if(clients.length > 0){
      
            let clientAp  =    clients.map(client => client.name)    
            clientAp.forEach((c,index) =>clientNames[index+1] = {value : c} )    
         
  }
 
const performRedirect = (path) => {
    return <Redirect to = {path}/>
}

const validateData = () => {


    if(values.name === '' || values.name.length<3 ){

        setErrorMessage('Please Enter Valid Name')
        setErrorAlert(true)
        setTimeout(()=> setErrorAlert(false),2000)
       return false
    }
    
    if(values.phoneM === '' || toString(values.phoneM).length<10 )
    {
        setErrorMessage('Please Enter Valid Cell phone Number')
        setErrorAlert(true)
       setTimeout(()=> setErrorAlert(false),2000)
       return false  
    }
     return true

}

const findCurrentClient = (name,mobile) => {

      let newClient =  clients.filter(client => (client.name === name && client.phoneM === mobile))
      console.log("Client found from set : ",newClient)
      return newClient[0]
}


const handleSubmit =  e => {
            e.preventDefault()
   
   let validData = validateData()
  
  if(validData){

  
   let checkedData = document.getElementById('taxEx')
    if(checkedData.checked) values.taxEx = true
    checkedData = document.getElementById('isLab')
    if(checkedData.checked) values.isLab = true
    checkedData = document.getElementById('smsOption')
    if(checkedData.checked)values.smsOption = true
    checkedData = document.getElementById('emailOption')
    if(checkedData.checked) values.emailOption = true



  console.log("New Values Received in NewForm ::::",values)
  
 if(update){
     let newValues = {...values,_id:clientSelected._id,addDoc:additionalDoc,address:addressBook}
     setValues({...values, _id : clientSelected._id})
    console.log("UPDATE CLIENT VALUES :",newValues)
     
     updateClient(user._id,token,newValues)                     
                    .then(data  => {   
                                        
                        if(data.status !== 200){
                            
                            // setValues({values})
                            setErrorMessage('Some error while updating data!')
                            setErrorAlert(true)
                            setTimeout(()=>setErrorAlert(false),2000)
                        }
                        else{                         

                          setSuccess(true);                           
                          setTimeout(() =>setSuccess(false),2000)
                            fetchClients()

                          if(placeOrder){
                               //find current client and new generated  id                              
                              //set current client as clientSelected                              
                              setClientSelected(findCurrentClient(values.name,values.phoneM)) 
                              setPathRedirect('/order/neworder')
                              setRedirect(true)
                          }  
                          else {
                            setPathRedirect('/client')
                            setRedirect(true)
                        }
                          //reset  values
                          setValues({salutation:'Dr', contactPerson :'', dcireg:'',name: "", code : '',emailPrimary :'' ,
                            emailSecondary:'',address1 : "",address2:"",area : "",state:"",city:'',pincode:'',phoneO:'',
                            phoneR:'',phoneM:'',deliveryMethod :'',emailOption:false,smsOption:false,route:'',priceBand:'',
                            billTo:'',gstin :'',creditLimit:0,taxEx:false,isLab : false,paymentTerms :'',balance:'',
                            drcr : '1',notes : '',category : '',workHours : '',acmanager :'',
                            regDate : new Date(), company:currentCompany   , addDocSalutation:'',
                                        
                            })
                        }
                       })
                    .catch(err => {
                        setErrorMessage('Error while updating Data')
                        setErrorAlert(true)
                        setTimeout(()=>setErrorAlert(false),2000)
                                  }
                          )

 }
else{
    
    console.log("UPDATE CLIENT VALUES :",{...values,name : name.toUpperCase(),addDoc:additionalDoc,address:addressBook})
   
 
    createClient(user._id,token,{...values,name : name.toUpperCase(),addDoc:additionalDoc,address:addressBook})                     
    .then(data  => {   
                         
        if(data.status !== 200){
            
            // setValues({values})
            setErrorAlert(true)
            setTimeout(()=>setErrorAlert(false),2000)
        }
        else{                         

            setSuccess(true);                           
            setTimeout(() =>setSuccess(false),2000)
            fetchClients()

            if(placeOrder){
                //find current client and new generated  id                              
               //set current client as clientSelected                              
               setClientSelected(findCurrentClient(values.name,values.phoneM)) 
               setPathRedirect('/order')
               setRedirect(true)
           }  
           else {
               console.log("Public_URL :",`${process.env.PUBLIC_URL}`)
               setPathRedirect(`${process.env.PUBLIC_URL}/client`)
            //    setRedirect(true)
              performRedirect(`${process.env.PUBLIC_URL}/client`)            
           }
           //reset 
           setValues({salutation:'Dr', contactPerson :'', dcireg:'',name: "", code : '',emailPrimary :'' ,
             emailSecondary:'', address1 : "",address2:"",area : "",state:"",city:'',pincode:'',
             phoneO:'', phoneR:'',phoneM:'',deliveryMethod :'',
             emailOption:false,smsOption:false,route:'',priceBand:'',addDoc :[],
             billTo:'',gstin :'',creditLimit:0,taxEx:false,isLab : false,paymentTerms :'',balance:'',
             drcr : '1',notes : '',category : '',workHours : '',acmanager :'',
             regDate : new Date(),  company:currentCompany, addDocSalutation:'',
             addDocName:'',                
             })
        }
    })
    .catch(err => {
        setErrorMessage('Error while saving Data')
        setErrorAlert(true)
        setTimeout(()=>setErrorAlert(false),2000)
    }
            )

      }           



        

    }
        

      
}

 const { salutation,name,code,dcireg,emailPrimary,emailSecondary,address1,address2,area,city,state,pincode,phoneO,contactPerson,
        phoneR,phoneM,deliveryMethod,emailOption,smsOption,route,
        priceBand, billTo,gstin,creditLimit,taxEx,isLab,paymentTerms , balance,company,
        drcr,notes ,category, workHours, acmanager, addDocSalutation,addDocName
        }  =  values

const handleChange = name => event => {
    event.preventDefault()
      const val = event.target.value;
      setValues({...values,[name]:val})
} 

const handleAddEmail = () => {
    let addEmail = document.getElementById('extraemail')
    addEmail.classList.toggle('d-none')
   let icon = document.getElementById('addEmailIcon')
   icon.classList.add('d-none')

}

const  handleBillTo = () => {  
 
   
    let billTo = document.getElementById('billTo')
    billTo.classList.remove('d-none')
    billTo.classList.add('d-block')
    let self = document.getElementById('self')
    self.classList.add('d-none')
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
 
 const getCodeSequence = async () => {
     
     await  getNextClientSequence()
         .then(data => {          
           
             setClientNumber(convertToSequnceString(data.sequence_val)) 
             setValues({...values,code : convertToSequnceString(data.sequence_val)})

         })
         .catch(err => {
             setErrorMessage("Error in sequence")
             setErrorAlert(true)
             setTimeout(()=>setErrorAlert(false),2000)
         })
 }
useEffect (() => {
    
     // to enable redirecting without fail
     setRedirect(false)
     if(clientSelected){        
         setUpdate( true)
         
         
         setValues({...clientSelected})
         setAdditionalDoc(clientSelected.addDoc)
         setAddressBook(clientSelected.address)
        }
        else {
         //get next client code from database   
        getCodeSequence()  
        setAdditionalDoc([])
        setAddressBook([])
    }
},[update])

const handleClientCancel = () => {
   
    
        history.go(-1)     
        setClientSelected(null)    
  
  

}
//**CRUD Operations for adding locations */
const handleAddLocation = (newLocation) =>{    

    if(editLocation){
        let index = currentLocation.index
        let oldAddressList = addressBook
        oldAddressList[index] = newLocation
       setAddressBook(oldAddressList)
       setisModalOpen(false) 
       setCurrentLocation(null)
    }  
    else {
        setisModalOpen(false)        
        setAddressBook(prev => [...prev,{...newLocation}])
    }
    setEditLocation(false) 
    
}
const handleAddressCancel = () =>{
    setisModalOpen(false)
}
const handleAddressEdit = (newAddress,index) => {   
   
   setCurrentLocation({address: newAddress, index})
   setEditLocation(true)
   setisModalOpen(true)
   
}

//CRUD Operations for Adding addintional Doctors details
const handleAddDocConfirm = (newDoc) => {
 
   setShow(false)  
   setAdditionalDoc(prev=>[...prev,newDoc])
}

const handleAddDocCancel = ()=>{
    setShow(false)
}

const handleAddDocEdit = (doc,index) => {
    
     let docList = additionalDoc
      docList[index] = doc
      setAdditionalDoc(docList)
}




            return (
                <>
                  <Menu />  
                 <div>
                 {isModalOpen && <Modal  title = 'Add  Location'                        
                        onCloseModal = {()=> setisModalOpen(false)}>
                   <NewAddressForm  onAddressConfirm = {handleAddLocation} 
                                    onAddressCancel = {handleAddressCancel}
                                    currentLocation = {currentLocation}
                                    />
                  </Modal>}     
                 </div>
                 {show && <Modal title = 'Add Doctor Information' >
                     <AddDoc  addDoc = {additionalDoc} 
                              onAddDocConfirm = {handleAddDocConfirm} 
                              onAddDocCancel = {handleAddDocCancel}
                              onAddDocEdit = {handleAddDocEdit}/>
                     </Modal>}
                  <div className="container mt-5 fs-4">
                     {/* <SubMenu /> */}
                     { errorAlert && <TextError >{<h3>{errorMessage}</h3>}</TextError>}
                  <div className="client-form-container mx-auto ">
                  
                    <form>
                              <div className = "border border-dark px-3 ">
                                <div className="d-flex flex-row justify-content-between ">
                                      <div>
                                      <h2 className = 'w-30'>{update ?  'Edit': 'New'} { ' '}Client</h2>
                                      <label className = 'fs-4'>Company :</label>  
                                      <select name="company" 
                                              className = 'fs-4 mx-2'
                                              value = {company} 
                                              onChange = {handleChange('company')} >
                                                  <option  value="1">1</option>
                                                  <option  value="2">2</option>
                                                  <option  value="3">3</option>
                                              </select>
                                      </div>
                                        
                                    <div className="d-flex flex-column  ">
                                                    <div className = 'w-100 d-flex flex-sm-row  align-items-center justify-content-between '>
                                                        <div className="">
                                                            <Select  className = 'form-select'
                                                                            label = "Salutation"
                                                                            name = 'salutation'
                                                                            value = {salutation}
                                                                            onChange = {handleChange('salutation')}
                                                                            options = {[{value : 'Dr.'},{value : 'Dr(Mrs.)'},{value :'M/s'},{value :'Mr.'}] }            
                                                                                />
                                                        </div>
                                                        <div className="w-50">
                                                            <label>Name</label>
                                                                <input  className = 'form-control' 
                                                                                type = 'text' 
                                                                                label = 'Name'
                                                                                name = 'name'
                                                                                value = {name}
                                                                                required
                                                                                onChange = {handleChange('name')}
                                                                                />
                                                        </div>
                                                        <div className="w-25 mx-2">
                                                            <label>Contact Person</label>                                                         
                                                            <input     className = 'form-control' 
                                                                            type = 'text'
                                                                            label = 'Contact Person'
                                                                            name = 'contactPerson'
                                                                            value = {contactPerson} 
                                                                            onChange = {handleChange('contactPerson')}
                                                                            />
                                                        </div>
                                                        <div className="btn text-primary fs-5 mx-2 " onClick = {()=>setShow(true)}>
                                                              <b> Add Doctor</b>                                   
                                                        </div>
                                                </div> 
                                               
                                               
                                            
                                               
                                                <div className = 'd-flex flex-sm-row  align-items-center justify-content-between'> 
                                                            <div className="w-20 px-1">
                                                                     <div>Code</div>
                                                                    <input  className = 'form-control'
                                                                                    disabled 
                                                                                    type = 'number'
                                                                                    label = 'Code'
                                                                                    name = 'code' 
                                                                                    value = {code}
                                                                                    />
                                                            </div>
                                                                <div className="w-20 px-1">
                                                                    <div>DCI Reg#</div>
                                                                    <input   className = 'form-control' 
                                                                                    type = 'text'
                                                                                    label = 'DCI Reg#'
                                                                                    name = 'dcireg' 
                                                                                    value = {dcireg}
                                                                                    onChange = {handleChange('dcireg')}
                                                                                    />   
                                                            </div>
                                                            <div className="w-40 px-1">
                                                            <label>Working Hours</label>
                                                            <input  className = 'form-control' 
                                                                                    type = 'text'
                                                                                    label = 'Working Hours'
                                                                                    name = 'workHours'
                                                                                    value = {workHours}
                                                                                    onChange = {handleChange('workHours')} 
                                                                                    />   
                                                            </div>
                                                            <div className="w-20 px-1">                                                                   
                                                                    <Select         label = 'Account Manager'
                                                                                    name = 'acmanager'
                                                                                    onChange = {handleChange('acmanager')} 
                                                                                    value = {acmanager}
                                                                                    options = {[{value : 'select'},{value : 'Shilpin Patel'},{value : 'Jayesh Jain'}]}
                                                                                    /> 
                                                            </div>
                                                    </div>

                                       </div>  
                                    </div>
                                      

                     </div>                                         
                                
                        <div className = 'border border-5 border-dark  row'>                             
                             <div className="col  ">
                                      <div className = ' '>
                                          
                                                <div className="btn btn-info fs-5  " 
                                                        onClick = {()=>{
                                                                         setisModalOpen(false)
                                                                          setLocation(false) 
                                                                     }}>
                                                    Primary Address
                                                </div>
                                                <div className="btn btn-warning fs-5 mx-2 px-4"  onClick = {()=> setLocation(true)}>
                                                   Locations
                                                </div>
                              { location &&  <div className = 'location-list'>
                                             <div className="btn btn-info"  
                                                  onClick = {()=>{
                                                      setisModalOpen(true)  
                                                  }

                                                  } >+New Location</div>

                                        {addressBook.length >0 &&  <div>
                                                            <AddressTable addressBook = {addressBook} onAddressEdit = {handleAddressEdit}/>
                                                           </div>}
                                        </div>}  
                            {  !location && <>
                                        <input className = 'form-control fs-4' 
                                                        type = 'text' 
                                                        placeholder = 'address line 1'
                                                        name = 'address1'
                                                        value = {address1}
                                                        onChange = {handleChange('address1')}
                                                        />  
                                        <input  className = 'form-control fs-4'
                                                        type = 'text' 
                                                        placeholder = 'address line 2'
                                                        name = 'address2'
                                                        value = {address2}
                                                        onChange = {handleChange('address2')}
                                                        />
                                         <input className = 'form-control fs-4' 
                                                        type = 'text' 
                                                        placeholder = 'Area'
                                                        name = 'area'
                                                        value = {area}
                                                        onChange = {handleChange('area')}
                                                        />
                                         <input className = 'form-control ' 
                                                        type = 'text' 
                                                        placeholder = 'City'
                                                        name = 'city'
                                                        value = {city}
                                                        onChange = {handleChange('city')}

                                                        />
                                           <input className = 'form-control ' 
                                                        type = 'number' 
                                                        placeholder = 'Pin'
                                                        name = 'pincode' 
                                                        value = {pincode}
                                                        onChange = {handleChange('pincode')}
                                                        />             
                                           <Select        
                                                          type = 'text' 
                                                          label = 'State'
                                                          name = 'state'
                                                          className = 'fs-5 mx-2 px-4'
                                                          value = {state}
                                                          options = {[{value : 'Select State'},{value: 'GUJARAT'},{value : 'MAHARASHTRA'},{ value : 'MADHYA PRADESH'}]}
                                                          onChange = {handleChange('state')}
                                                          />
                                        </>
                                         }
                                         </div>

                                        <div className = 'w-75  px-3'>  
                                                <label>Office Phone</label>                                              
                                                <input  className = 'form-control' 
                                                        type = 'number' 
                                                        name = 'phoneO'
                                                        label = 'Office Phone'
                                                        value = {phoneO}
                                                        onChange = {handleChange('phoneO')}
                                                        /> 
                                                <label>Cell Phone</label>
                                                <input className = 'form-control' 
                                                        type = 'number' 
                                                        name = 'phoneM'
                                                        label = 'Cell Phone'
                                                        value = {phoneM}
                                                        required
                                                        onChange = {handleChange('phoneM')}
                                                        />         
                                                <label>Res Phone</label>
                                                <input className = 'form-control' 
                                                        type = 'number' 
                                                        name = 'phoneR'
                                                        label = 'Res Phone'
                                                        value = {phoneR}
                                                        onChange = {handleChange('phoneR')}
                                                        />  
                                            </div>
                                             <div className="d-flex flex-row   justify-items-center ">
                                                       <div className = 'w-75  '>                                                          
                                                           <div className="d-flex flex-column">
                                                           <label>Email</label>
                                                           <input className = 'form-control py-1 ' 
                                                                            type = 'email'    
                                                                            label = 'Email'                                                                        
                                                                            name = 'emailPrimary'                                                                            
                                                                            value = {emailPrimary}
                                                                            placeholder = 'primary address'
                                                                            onChange = {handleChange('emailPrimary')}
                                                                            />
                                                             <div  id = 'extraemail' className = 'd-none'>
                                                                <input className ='form-control ' 
                                                                                type = 'email'                                                                                                                                                    
                                                                                name = 'emailSecondary'
                                                                                value = {emailSecondary}
                                                                                placeholder = 'secondary address'
                                                                                onChange = {handleChange('emailSecondary')}
                                                                                />    
                                                             </div>               
                                                                       
                                                               
                                                            </div> 
                                                           
                                                           
                                                       </div>
                                                       <div className="btn  fs-3 mt-4 text-dark" id = 'addEmailIcon'>
                                                           <Tooltip title = {<div style ={{fontSize : '1.4rem', padding:'0.5rem'}}>add Email</div>}>
                                                                {/* <FontAwesomeIcon  icon = 'plus'  
                                                                   onClick = {() => handleAddEmail()}/> */}
                                                                   <IconButton onClick={()=> handleAddEmail()}>
                                                                       <AddIcon />
                                                                   </IconButton>
                                                                </Tooltip>  

                                                       </div>                                                        
                                                      
                                             </div>
                                             <div className = 'd-flex flex-row'>
                                                      <label>Send Welcome Message</label>
                                                       <div className ="form-check ">
                                                             <input className ="form-check-input" 
                                                                    type="checkbox" 
                                                                    value = 'sms'
                                                                    id = 'smsOption'
                                                                                                                                      
                                                                     />
                                                             <label className ="form-check-label" htmlFor="flexCheckDefault">SMS</label>
                                                        </div>
                                                        <div className ="form-check  ">
                                                        <input className ="form-check-input" 
                                                               type="checkbox" 
                                                               value = 'email'
                                                               id = 'emailOption'
                                                                                                                         
                                                               />
                                                        <label className ="form-check-label" htmlFor="flexCheckChecked">Email </label>
                                                        </div>

                                             </div>
                                                                                              
                                            
                                  </div> 
                                <div className="col border border-dark p-0 ">

                                  <div className = 'd-flex flex-row justify-content-around  border-dark border-bottom pb-2 '>
                                        <div className = 'w-50'>                                                
                                                <Select         type = 'text' 
                                                                label = 'Delivey Method'
                                                                name = 'deliveryMethod'
                                                                value = {deliveryMethod}
                                                                options = {[{value: 'Courier'},{value : 'Delivery Boy'},
                                                                            {value : 'Doctor Pickup'},{value : 'Mail'}]}
                                                                onChange = {handleChange('deliveryMethod')}
                                                                />
                                            </div>
                                            <div className = 'w-50 '>
                                                <Select    className = 'form-select'
                                                                type = 'text'
                                                                label = 'Route'
                                                                name = 'route'
                                                                value = {route}
                                                                options = {[{value : 'CTM'},{value : 'ASARVA'}]}
                                                                onChange = {handleChange('route')}
                                                                />                       
                                            </div>

                                    </div>  

                                 <div className = 'd-flex flex-column border-dark border-bottom pb-2'>                                               
                                        <div className = 'd-flex flex-row justify-content-around  align-items-center  '>
                                                <div className = 'w-50 '>                                                
                                                    <Select    className = 'form-select' 
                                                                    type = 'text' 
                                                                    label = 'Price Band'
                                                                    name = 'priceBand'
                                                                    value = {priceBand}
                                                                    options = {[{value: ''},
                                                                                 {value: 'Favourite Clients'},{value : 'International'},
                                                                                {value : 'Laboratory'},{value : 'Out Of State'},
                                                                                {value : 'Regular'},{value : 'Sensitive'},
                                                                                {value : 'Vora'}
                                                                            ]}
                                                                     onChange = {handleChange('priceBand')}       
                                                                    />
                                                </div>
                                                <div className = 'w-50'>  
                                                                    <label>GSTIN</label>
                                                                    <input className = 'form-control' 
                                                                                    type = 'text'                                                                                                                                                    
                                                                                    name = 'gstin'
                                                                                    value = {gstin}  
                                                                                    onChange = {handleChange('gstin')}                                                                              
                                                                                    />   
                                                </div>  

                                            </div>    
                                          <div className="d-flex flex-row justify-content-around  align-items-center">

                                                
                                                       <div className ="form-check ">
                                                             <input className ="form-check-input" 
                                                                    type="checkbox" 
                                                                    name = 'taxEx'
                                                                    value = 'TaxEx'
                                                                    id = 'taxEx'                                                                  
                                                                     />
                                                             <label className ="form-check-label" >Tax Exemption</label>
                                                        </div>
                                                        <div className ="form-check ">
                                                        <input className ="form-check-input" 
                                                               type="checkbox" 
                                                               value = "isLab" 
                                                               id = 'isLab'                                                                                                                            
                                                               />
                                                        <label className ="form-check-label">This is a Dental Lab </label>
                                                        </div>




                                            </div>                                      
                                    </div>
                                  <div className = 'd-flex flex-row   justify-content-between  align-items-start border-dark border-bottom pb-2 '>
                                            <h1 >&#x20B9; </h1>
                                            <div className = 'px-1 '>
                                                <label className = ''>Credit Limit</label>
                                                <input className = 'form-control' 
                                                                type = 'number'                                                                                                                                                    
                                                                name = 'cerditLimit'
                                                                placeholder = '0'
                                                                value = {creditLimit}
                                                                onChange = {handleChange('creditLimit')}
                                                                />
                                            </div>  
                                            <div className = 'px-1 '>
                                                 <label>  Payment Terms </label>                                                       
                                                 <input className = 'form-control' 
                                                                type = 'number'                                                                                                                                                    
                                                                name = 'paymentTerms'
                                                                placeholder = '0'
                                                                value = {paymentTerms}
                                                                onChange = {handleChange('paymentTerms')}
                                                                /> 
                                                    <span className="input-group-text">Days</span>            
                                            </div>                                            
                                                
                                              

                                            <div className = ' px-2  '>
                                                <label className = ''>Opening Balance</label>
                                                <input className = 'form-control ' 
                                                                type = 'number'                                                                                                                                                    
                                                                name = 'balance'
                                                                placeholder = '0'
                                                                value = {balance}
                                                                onChange = {handleChange('balance')}
                                                                />                                             
                                              
                                                  <span  className ='d-flex flex-row'>
                                                        <div className="form-check form-check-inline">
                                                            <input className ="form-check-input" 
                                                                type="radio"
                                                                onChange = {handleChange('drcr')} 
                                                                name="drcr"  
                                                                value = 'dr'
                                                                checked
                                                                // checked ={values.drcr === '1'}
                                                                />
                                                            <label className ="form-check-label" for="flexRadioDefault1">
                                                                Dr       </label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                            <input className="form-check-input" 
                                                                type="radio" 
                                                                onChange = {handleChange('drcr')} 
                                                                name="drcr"
                                                                value = 'cr'
                                                                
                                                                    />
                                                            <label className="form-check-label" for="flexRadioDefault2">
                                                                cr
                                                            </label>
                                                            </div>     
                                                    </span>         
                                            </div>
                                        </div>
                                  <div className = 'd-flex flex-row align-items-end fs-4 border-dark border-bottom pb-2 '>
                                     
                                      <div id ='self' className = 'btn ' onClick = {()=> handleBillTo()}>Bill To :  self</div>
                                   
                                         
                                                    <div className = 'w-75 d-none' id = 'billTo'>
                                                      <Select   className = 'form-select '                                                                         
                                                                        label = 'Bill To'                                                                     
                                                                        name = 'billTo'
                                                                        value = {billTo}
                                                                        options = {clientNames}
                                                                        onChange = {handleChange('billTo')}
                                                                    />
                                                                    </div>
                                                    <Tooltip  title = {<div style ={{fontSize : '1.2rem', padding:'0.5rem'}}>
                                                                            Send Bill to other Company or Doctor instead of the present Client</div>} >
                                                             <IconButton >
                                                                    <InfoIcon sx = {{fontSize : 30}}/>
                                                             </IconButton>
                                                        </Tooltip>
                                           
                                      </div>
                                  <div className = 'border-dark border-bottom pb-2  '>
                                    
                                             <Select type = 'text' 
                                                    label = 'Category'
                                                    name = 'category'
                                                    value = {category}
                                                    onChange = {handleChange('category')}
                                                    style = {{ color : '#5c5c5c'}}
                                                    options = {[{value: 'Select associated category'},
                                                                    {value: 'Favourite Clients'},{value : 'International'},
                                                                {value : 'Laboratory'},{value : 'Out Of State'},
                                                                {value : 'Regular'},{value : 'Sensitive'},
                                                                {value : 'Vora'}
                                                            ]}
                                                    />
                                  </div>
                                  <div className = 'border-dark border-bottom pb-2 '>
                                                <label >Notes </label>
                                                <input className = 'form-control'                                                             
                                                                type = 'text'                                                                                                                                                    
                                                                name = 'notes'
                                                                value = {notes}
                                                                onChange = {handleChange('notes')} 
                                                                />          
                                  </div>
                                </div>
                                  
                               
                                
    
                     </div>
                     </form>     
                              <div className = 'd-flex flex-row justify-content-end my-3'>
                              <button className = 'btn btn-info fs-3 mx-3  px-5'  type = 'submit' onClick={handleSubmit}  >Save{update? ' changes':''}</button>
                              <button className = 'btn btn-info fs-3 mx-3'  type = 'submit' onClick={(e)=> 
                                              {  
                                                 setPlaceOrder(true)
                                                 handleSubmit(e)
                                                  }
                                                  }  >Save and New Order</button>
                              <button className = 'btn btn-info fs-3 mx-3'  
                                      onClick={handleClientCancel} 
                                       >Cancel</button>
                              </div>
                              {success && <TextError >Client created successfully</TextError> }
                              {errorAlert && <TextError >Error while saving Client data!</TextError> }
                   
                    </div>
                    </div>
                 </>           
            )
    
    
}

export default NewClientForm;