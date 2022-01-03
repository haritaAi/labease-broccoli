import React,{ useState,useContext } from 'react';
import { useEffect } from 'react';
import {createPriceband,getAllPricebands,updatePriceband,deletePriceband} from '../../../admin/clientApi' 
import UserContext from '../../../context/UserContext'

const Pricebands = (props) => {
    
    const {user,token} = useContext(UserContext)   
    const [update,setUpdate] = useState(false)
     
    const [pricebands,setPricebands] = useState([])
    const [values,setValues] = useState({
        name :''
    })

const handleChange = name => event => {
      let val = event.target.value
      setValues({...values,[name]:val})

    
}
const validate = enc => {
     if(enc.name.length <3){
         window.alert("Please enter valid enclosure Name")
         return false
     }   
     else return true
}


const handleAddEnclosure = () => {
    let newValues = {name :values.name.trim()}
if(validate(newValues)){

       
   createPriceband(user._id,token,newValues)
   .then(data => {
       if(data.error){
           window.alert("Error Fetching data")
       }
       else{
         getallPricebands()
           setValues({
               name : ''
           })
       }
   })
   .catch(err => {
           window.alert("Error Fetching data")
   })
}

}

const handleUpdateEnc = enc => {

    let newValues = {name:enc.tempName.trim(),_id : enc._id}
  if(validate(newValues)){  
    updatePriceband(user._id,token,newValues)
                            .then(data => {
                                if(data.error){
                                    window.alert("Error while fetching data")
                                }
                                else{
                                     getallPricebands()
                                     
                                }
                            })
                            .catch(err => {
                                window.alert("Error while fetching data")

                            })
                        }
     } 


const handleDelete = priceband =>{
       console.log("Priceband received for deletion :",priceband)

      deletePriceband(user._id,token,priceband)
           .then(data => {
               getallPricebands()
           })
           .catch()

}     
const pricebandForm = () => {
        
    return (
        <form>
            <div className='w-25 d-inline-flex'>
                   <input  type = 'text'
                           className='fs-4'
                           value = {values.name}
                           onChange = {handleChange('name')}
                           placeholder='Type new Entry here'
                           />
            </div>
                   <div className="btn btn-info fs-4 px-5 mx-3" onClick={()=>{
                       handleAddEnclosure()
                   }}>Add</div>   
        </form>
    )
}

const  getallPricebands = async () => {
     
    return await getAllPricebands(user._id,token)
    .then(data => {
        if(data.error){
            window.alert("Error while fetching data")
        }
        else{
             setPricebands(data)
                     }
    })
    .catch(err => {
        window.alert("Error while fetching data")

    })    
}


useEffect(()=>{
    getallPricebands()
},[])

const pricebandTable = () => {
 const handleUpdate = index => event => {

      currentPriceband[index].tempName = event.target.value     
      setPricebands(currentPriceband)
 }

    let currentPriceband = [...pricebands]
   
    return(
        <div>
            <div className='fs-3'><b>Available entries:</b></div>
      {currentPriceband.length>0 && 
                <div style = {{listStyleType:'none'}} 
                    className=''                      >
                { currentPriceband.map((enc,index) => 
                        <div className='d-flex flex-row align-items-center justify-content-evenly border border-dark border-bottom  '>
                            <div className='fs-4 '>{index+1}</div> 
                           
                         <input type = 'text'
                                key = {enc._id} 
                                style = {{outlineWidth : 'none',border:'none'}}
                                className='fs-4  d-block px-2' 
                                value =   {!enc.update?enc.name: enc.tempName}
                                onChange = {handleUpdate(index)}
                                onClick = {() => {
                                     enc.update = true
                                     setPricebands(currentPriceband)
                                     enc.tempName = enc.name                                    
                                }}
                                   />
                              {enc.update &&  <div>
                                     <div className='btn btn-info fs-5' 
                                          onClick={()=>{
                                            enc.update = false  
                                            setPricebands(currentPriceband)
                                            handleUpdateEnc(enc)

                                          }}>Ok</div>
                                     <div className='btn btn-info fs-5 mx-2'
                                          onClick={()=>{
                                              enc.update = false 
                                              setPricebands(currentPriceband)

                                          }}
                                         >Cancel</div>

                                 </div>}
                                 
                                 <div className="btn btn-outline-danger my-1 fs-5"
                                      onClick = {()=>handleDelete(enc)}     
                                           >Delete</div>

                                   </div>
                                   )}
                </div >}
        </div>
    )
}

    return (
        <div>
            <div className=' mx-3 my-2 '>
                <h1><b>Price Bands</b></h1>
                </div>
            
            <div>
                {pricebandForm()}
            </div>
            <div className='w-50 my-5'>
                {pricebandTable()}
            </div>
        </div>
    );
}

export default Pricebands;