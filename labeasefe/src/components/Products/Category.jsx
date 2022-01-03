import React,{useState,useContext} from 'react';
import UserContext from '../../context/UserContext'

import { createCategory,getCategories } from '../../admin/clientApi';


const Category = ({categories,fetchCategories}) => {

     const [newCategory,setNewCategory] = useState('')
     const [addNewCategory,setAddNewCategory] = useState(false)
     const [alert,setAlert] = useState(false)
     const [message,setMessage] = useState('')
     const [isupdate,setIsUpdate] = useState(false)
     const {user,token} = useContext(UserContext)


 const handleChange = e => {
    
    setNewCategory(e.target.value)
 }

const handleSave = () => {

console.log("Category to be saved : ",newCategory)

    createCategory(user._id,token,{name : newCategory})
    .then(data =>{
        if(data.status !== 200){
            setMessage('Error while creating new category')
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
        }
        else{
            
            setMessage('category created successfully')
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
            getCategories()
            setNewCategory('')
        }
    })
    .catch(err => {
            setMessage('Error while creating new category')
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
    })

}

    return (
        <div className = 'w-50'>
            <div className="btn btn-info m-3 fs-4"  
                 onClick = {()=> { console.log("Hi i m clicked") 
                                         setAddNewCategory(true)} }   
                     >Add New Category</div>
                     {alert && <div className="fs-4 text-danger">{message}</div>}
                   {categories.length > 0 && <ul>
                  {categories.map(cat => <li className = 'border border-dark fs-3 p-3' key = {cat._id}>{cat.name}</li>  )}
                  
              </ul>}
              {addNewCategory &&  <div className="container">
                                        <form>
                                            <div className="form-group fs-4">
                                                <label>Category Name </label><span>
                                                        <input className = 'form-group'
                                                            type = 'text'
                                                            value = {newCategory}
                                                            onChange = {handleChange} 
                                                                />
                                                            </span>

                                            </div>

                                        </form>
                                            <div className="btn btn-info fs-4"
                                                 onClick = {handleSave}
                                                 >Save</div>  
                                        </div> 
                       }   
        </div>
    );
}

export default Category;