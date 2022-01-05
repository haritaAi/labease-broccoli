import React,{ useState,useContext } from 'react';
import { useEffect } from 'react';
import {createClientCategory,getAllClientCategories,updateClientCategory} from '../../../admin/clientApi' 
import UserContext from '../../../context/UserContext'

const Categories = (props) => {
    
    const {user,token} = useContext(UserContext)   
    
     
    const [categories,setCategories] = useState([])
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

       
   createClientCategory(user._id,token,newValues)
   .then(data => {
       if(data.error){
           window.alert("Error Fetching data")
       }
       else{
         getallClientCategories()
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
    updateClientCategory(user._id,token,newValues)
                            .then(data => {
                                if(data.error){
                                    window.alert("Error while fetching data")
                                }
                                else{
                                     getallClientCategories()
                                     
                                }
                            })
                            .catch(err => {
                                window.alert("Error while fetching data")

                            })
                        }
     } 

const categoryForm = () => {
        
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

const  getallClientCategories = async () => {
     
    return await getAllClientCategories(user._id,token)
    .then(data => {
        if(data.error){
            window.alert("Error while fetching data")
        }
        else{
             setCategories(data)
                     }
    })
    .catch(err => {
        window.alert("Error while fetching data")

    })    
}
useEffect(()=>{
    getallClientCategories()
},[])

const categoryTable = () => {
 const handleUpdate = index => event => {

      currentCategory[index].tempName = event.target.value     
      setCategories(currentCategory)
 }

    let currentCategory = [...categories]
   
    return(
        <div>
            <div className='fs-3'><b>Available entries:</b></div>
      {currentCategory.length>0 && 
                <div style = {{listStyleType:'none'}} 
                    className=''                      >
                { currentCategory.map((enc,index) => 
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
                                     setCategories(currentCategory)
                                     enc.tempName = enc.name                                    
                                }}
                                   />
                              {enc.update &&  <div>
                                     <div className='btn btn-info fs-5' 
                                          onClick={()=>{
                                            enc.update = false  
                                            setCategories(currentCategory)
                                            handleUpdateEnc(enc)

                                          }}>Ok</div>
                                     <div className='btn btn-info fs-5 mx-2'
                                          onClick={()=>{
                                              enc.update = false 
                                              setCategories(currentCategory)

                                          }}
                                         >Cancel</div>

                                 </div>}
                                 
                                 <div className="btn btn-outline-danger my-1 fs-5">Delete</div>

                                   </div>
                                   )}
                </div >}
        </div>
    )
}

    return (
        <div>
            <div className=' mx-3 my-2 '><h1><b>Categories</b></h1></div>
            
            <div>
                {categoryForm()}
            </div>
            <div className='w-50 my-5'>
                {categoryTable()}
            </div>
        </div>
    );
}

export default Categories;