import React, { useState,useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';


const AddDoc = ({addDoc,onAddDocConfirm,onAddDocCancel,onAddDocEdit}) => {

   const [values,setValues] = useState({
       name : '',
       cellno:'',
       designation:''
   }) 
  const [show,setShow] =useState(false)
  const [message,setMessage] = useState('')
  const [alert,setAlert] = useState(false)
  const [edit,setEdit] = useState(false)
  const [editIndex,setEditIndex] = useState(null)

const handleChange = name => event => {
    
    let data = event.target.value
    setValues({...values,[name]:data})
}


useEffect(()=>{
    if(addDoc.length === 0)setShow(true)

},[])

const handleEdit = (doc,index) => {
  setValues(doc)
  setShow(true)  
  setEdit(true)
  setEditIndex(index)
} 


const {name,cellno,designation} = values

const validate = () => {

const {name,cellno,designation} = values

    if((name === '' || name.length<3) || cellno === '' ){
        
        setMessage("Please enter valid Name and Cell phone number")
        setAlert(true)
        setTimeout(()=>setAlert(false),2000)
        return false
    }
    
    return true
}




    return (
        <div className = 'container '>
    { show &&  <ul className ='fs-4'>
                {alert && <li className ='text-danger fs-4'><b>{message}</b></li>}
                <li >
                    <div className="d-flex flex-row justify-content-between ">
                               <div className = 'w-75'>
                                <label>Name</label>
                                <input  className = 'form-control' 
                                              type = 'text' 
                                              name = 'name'
                                              value = {name}                                             
                                              onChange = {handleChange('name')}
                                              />
                                 </div>
                                 <div>
                                    <label>Cell Phone</label>
                                    <input  className = 'form-control' 
                                                type = 'number' 
                                                name = 'cellno'
                                                value = {cellno}                                              
                                                onChange = {handleChange('cellno')}
                                                /> 
                                </div>   
                             </div>                          
                </li>
                <li>
                               <label>Designation Preference</label>
                                <input  className = 'form-control' 
                                              type = 'text' 
                                              name = 'designation'
                                              value = {designation}                                              
                                              onChange = {handleChange('designation')}
                                              />  
                </li>
                <li className=" d-flex  justify-content-end  px-5 mt-5">

                    <div className = 'btn fs-3  bg-info pt-3  mb-3 px-5 mx-5'                         
                         onClick = {()=>{  if(validate()){
                                           if(edit){
                                               onAddDocEdit(values,editIndex)
                                           }
                                           else  onAddDocConfirm(values)

                                           setEdit(false)
                                           setShow(false)
                                       }
                                            }}>Save</div>
                    <div className="btn btn-info fs-3 pt-3  mb-3 px-5 mx-5" onClick = {onAddDocCancel}>Cancel</div>
                </li>
            </ul>}
            {!show && <ul>
                    {
                        addDoc.map((doc,index) =><li key = {index}>
                             <div className="d-flex flex-row mx-3 ">
                             <div className = 'btn w-75 border border-dark ' style ={{fontSize : '1.6rem'}} onClick = {()=> setValues(doc)}>{doc.name}</div> 
                             <div className='btn border border-dark'  onClick = {()=>handleEdit(doc,index)}><EditIcon sx={{fontSize : 24}} /></div>
                             </div>
                            </li> )
                    }
                     <li className = 'btn btn-info  mx-2 mt-2' style ={{fontSize : '1.6rem'}} onClick = {() => setShow(true)} >+ Add Doctors</li>
                     <li className = 'btn btn-info mx-2 mt-2' style ={{fontSize : '1.6rem'}} onClick = {onAddDocCancel} >cancel</li>
                </ul>}
            
        </div>
    );
}

export default AddDoc;