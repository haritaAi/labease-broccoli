import React,{ useState,useContext } from 'react';
import { useEffect } from 'react';
import {createPriority,deletePriority,getAllPriorities,updatePriority} from '../../../admin/clientApi' 
import UserContext from '../../../context/UserContext'

const Enclosure = (props) => {
    
    const {user,token} = useContext(UserContext)   
    
     
    const [priorities,setPriorities] = useState([])
    const [values,setValues] = useState({
        name :''
    })

const handleChange = name => event => {
      let val = event.target.value
      setValues({...values,[name]:val})

    
}
const validate = priority => {
     if(priority.name.length <3){
         window.alert("Please enter valid enclosure Name")
         return false
     }   
     else return true
}


const handleAddEnclosure = () => {
    let newValues = {name :values.name.trim()}
if(validate(newValues)){

       
   createPriority(user._id,token,newValues)
   .then(data => {
       if(data.error){
           window.alert("Error Fetching data")
       }
       else{
         getallPriorities()
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

const handleUpdateEnc = priority => {

    let newValues = {name:priority.tempName.trim(),_id : priority._id}
  if(validate(newValues)){  
    updatePriority(user._id,token,newValues)
                            .then(data => {
                                if(data.error){
                                    window.alert("Error while fetching data")
                                }
                                else{
                                     getallPriorities()
                                     
                                }
                            })
                            .catch(err => {
                                window.alert("Error while fetching data")

                            })
                        }
     } 

const prioritiesForm = () => {
        
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
const handleDelete = enc => {
    deletePriority(user._id,token,enc)
     .then(data => {
         getallPriorities()
     })
     .catch()
}
const  getallPriorities = async () => {
     
    return await getAllPriorities(user._id,token)
    .then(data => {
        if(data.error){
            window.alert("Error while fetching data")
        }
        else{
             setPriorities(data)
                     }
    })
    .catch(err => {
        window.alert("Error while fetching data")

    })    
}
useEffect(()=>{
    getallPriorities()
},[])

const priorityTable = () => {
 const handleUpdate = index => event => {

      currentPriorities[index].tempName = event.target.value     
      setPriorities(currentPriorities)
 }

    let currentPriorities = [...priorities]
   
    return(
        <div>
            <div className='fs-3'><b>Available entries:</b></div>
      {currentPriorities.length>0 && 
                <div style = {{listStyleType:'none'}} 
                    className=''                      >
                { currentPriorities.map((enc,index) => 
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
                                     setPriorities(currentPriorities)
                                     enc.tempName = enc.name                                    
                                }}
                                   />
                              {enc.update &&  <div>
                                     <div className='btn btn-info fs-5' 
                                          onClick={()=>{
                                            enc.update = false  
                                            setPriorities(currentPriorities)
                                            handleUpdateEnc(enc)

                                          }}>Ok</div>
                                     <div className='btn btn-info fs-5 mx-2'
                                          onClick={()=>{
                                              enc.update = false 
                                              setPriorities(currentPriorities)

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
            <div className=' mx-3 my-2 '><h1><b>Priorities</b></h1></div>
            
            <div>
                {prioritiesForm()}
            </div>
            <div className='w-50 my-5'>
                {priorityTable()}
            </div>
        </div>
    );
}

export default Enclosure;