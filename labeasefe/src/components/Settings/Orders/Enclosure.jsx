import React,{ useState,useContext } from 'react';
import { useEffect } from 'react';
import {createEnclosure,deleteEnclosure,getAllEnclosures,updateEnclosure} from '../../../admin/clientApi' 
import UserContext from '../../../context/UserContext'

const Enclosure = (props) => {
    
    const {user,token} = useContext(UserContext)   
    const [update,setUpdate] = useState(false)
     
    const [enclosures,setEnclosures] = useState([])
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

       
   createEnclosure(user._id,token,newValues)
   .then(data => {
       if(data.error){
           window.alert("Error Fetching data")
       }
       else{
         getallEnclosures()
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
    updateEnclosure(user._id,token,newValues)
                            .then(data => {
                                if(data.error){
                                    window.alert("Error while fetching data")
                                }
                                else{
                                     getAllEnclosures()
                                     
                                }
                            })
                            .catch(err => {
                                window.alert("Error while fetching data")

                            })
                        }
     } 
const handleDelete = enc => {
    deleteEnclosure(user._id,token,enc)
      .then(data => {
          getallEnclosures()
      })
      .catch()
}
const enclosureForm = () => {
        
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

const  getallEnclosures = async () => {
     
    return await getAllEnclosures(user._id,token)
    .then(data => {
        if(data.error){
            window.alert("Error while fetching data")
        }
        else{
             setEnclosures(data)
                     }
    })
    .catch(err => {
        window.alert("Error while fetching data")

    })    
}
useEffect(()=>{
    getallEnclosures()
},[update])

const enclosureTable = () => {
 const handleUpdate = index => event => {

      currentEnclosures[index].tempName = event.target.value     
      setEnclosures(currentEnclosures)
 }

    let currentEnclosures = [...enclosures]
   
    return(
        <div>
            <div className='fs-3'><b>Available entries:</b></div>
      {currentEnclosures.length>0 && 
                <div style = {{listStyleType:'none'}} 
                    className=''                      >
                { currentEnclosures.map((enc,index) => 
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
                                     setEnclosures(currentEnclosures)
                                     enc.tempName = enc.name                                    
                                }}
                                   />
                              {enc.update &&  <div>
                                     <div className='btn btn-info fs-5' 
                                          onClick={()=>{
                                            enc.update = false  
                                            setEnclosures(currentEnclosures)
                                            handleUpdateEnc(enc)

                                          }}>Ok</div>
                                     <div className='btn btn-info fs-5 mx-2'
                                          onClick={()=>{
                                              enc.update = false 
                                              setEnclosures(currentEnclosures)

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
            <div className=' mx-3 my-2 '><h1><b>Enclosures</b></h1></div>
            
            <div>
                {enclosureForm()}
            </div>
            <div className='w-50 my-5'>
                {enclosureTable()}
            </div>
        </div>
    );
}

export default Enclosure;