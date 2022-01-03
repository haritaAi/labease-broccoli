import React,{useEffect, useState} from 'react';
import Modal from '../../components/Modal'
import '../../css/modal.css'
import Select from '../../components/Select'


const  NewAddressForm = ({onAddressConfirm,onAddressCancel,currentLocation}) => {

    const [values,setValues] = useState({
        
            name :'',
            address1:'',
            address2:'',
            area:'',
            city:'',
            pincode:'',
            state:'',
            contactPerson:'',
            phoneO:'',
            phoneM:'',
            workHours:'',
            route:''
          
    })
  
const [message,setMessage] = useState('')
const [alert,setAlert] = useState(false)


const handleChange = name => event => {
    event.preventDefault()
    const data = event.target.value;
    setValues({...values,[name]:data})
}


    const {name,address1,address2,area,city,state,pincode,contactPerson,phoneM,phoneO,workHours,route} = values


useEffect(()=>{
    console.log("Current LOcation ::::::::::",currentLocation)
    if(currentLocation.address){
        setValues({...currentLocation.address})
    }
},[])


const validate = ()=>{
    if((name === '' || name.length<3) || (contactPerson.length<3)  || phoneM.length<6   ) {
        
        
        setMessage("Please enter valid Name ,contact person and mobile phone number")
        setAlert(true)
        setTimeout(()=>setAlert(false),2000)
        
        return false
    }
     return true
}

    return (
        <div>
            
       <form action="">
                            
                            <div className = 'row fs-4'>
                            {alert && <div className = 'text-danger ' style = {{fontSize : '1.6rem'}}><b>{message}</b></div>}                
                                <div className="col w-50 mx-3">

                                <label>Name</label>
                                <input  className = 'form-control' 
                                              type = 'text' 
                                              label = 'Name'
                                              name = 'name'
                                              value = {name}
                                              required
                                              onChange = {handleChange('name')}
                                              />
                                <label>Address:</label>
                                <input className = 'form-control my-2' 
                                                      type = 'text' 
                                                      placeholder = 'address line 1'
                                                      name = 'address1'
                                                      value = {address1}
                                                      onChange = {handleChange('address1')}
                                                      />  
                                      <input  className = 'form-control my-2'
                                                      type = 'text' 
                                                      placeholder = 'address line 2'
                                                      name = 'address2'
                                                      value = {address2}
                                                      onChange = {handleChange('address2')}
                                                      />
                                       <input className = 'form-control my-2' 
                                                      type = 'text' 
                                                      placeholder = 'Area'
                                                      name = 'area'
                                                      value = {area}
                                                      onChange = {handleChange('area')}
                                                      />
                                       <input className = 'form-control my-2' 
                                                      type = 'text' 
                                                      placeholder = 'City'
                                                      name = 'city'
                                                      value = {city}
                                                      onChange = {handleChange('city')}

                                                      />

                                        <div className="d-flex flex-row align-items-end">
                                           
                                          
                                              <Select   type = 'text' 
                                                        className = 'fs-5 px-4 w-100 '                                                          
                                                        name = 'state'
                                                        label = 'State'
                                                        value = {state}
                                                        options = {[{value : 'Select State'},{value: 'GUJARAT'},{value : 'MAHARASHTRA'},{ value : 'MADHYA PRADESH'}]}
                                                        onChange = {handleChange('state')}
                                                        />
                                                                                                 <input className = 'w-50' 
                                                      type = 'number' 
                                                      placeholder = 'Pincode'
                                                      name = 'pincode' 
                                                      value = {pincode}
                                                      onChange = {handleChange('pincode')}
                                                      />    
                                          </div>              
                                                  
                                        
                                       
                                </div>
                                <div className="col w-50 mx-5">
                              
                                              <label>Contact Person</label>                                                         
                                              <input     className = 'form-control' 
                                                              type = 'text'
                                                              label = 'Contact Person'
                                                              name = 'contactPerson'
                                                              value = {contactPerson} 
                                                              onChange = {handleChange('contactPerson')}
                                                              />
                                                  
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
                                               <label>Working Hours</label>
                                              <input  className = 'form-control' 
                                                                      type = 'text'
                                                                      label = 'Working Hours'
                                                                      name = 'workHours'
                                                                      value = {workHours}
                                                                      onChange = {handleChange('workHours')} 
                                                                      />                                                        
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
                         <div className=" d-flex  justify-content-end  px-5 mt-5">

                                    <div className = 'btn fs-3  bg-info pt-3  mb-3 px-5 mx-5' onClick = {()=>{
                                                                                                            if(validate())                                            
                                                                                                                 onAddressConfirm(values)
                                                                                                            }}>Save</div>
                                    <div className="btn btn-info fs-3 pt-3  mb-3 px-5 mx-5" onClick = {onAddressCancel}>Cancel</div>
                          </div>
                            </form>


        </div>
    );
}

export default NewAddressForm;
