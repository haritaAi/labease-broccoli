import { IconButton } from '@material-ui/core';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import React, { useContext, useState } from 'react';
import { createProductType, updateProductType ,deleteProductType} from '../../admin/clientApi';
import UserContext from '../../context/UserContext';

const  ProductType = ({categories,productTypes,fetchProductTypes}) => {
 
 
    const {user,token} = useContext(UserContext)
 
    const [values,setValues] = useState({
        name:'', 
        category:'',      
        categoryId:''
    })

    const {_id,name,category,categoryId} = values 


    const [message,setMessage] = useState('')
    const [alert,setAlert] = useState(false)
     const [edit,setEdit] = useState(false)

    

 const handleChange = name => e =>{
        e.preventDefault()
      
        let val = e.target.value;
        setValues({...values,[name]:val})
 }

 const verifyDelete = (productType) => {
     
     if(window.confirm("Are You sure you want to delete the Product type ?")){
                   handleDelete(productType)
     }
     
 }

const handleDelete = productType => {

   console.log("Product to be deleted : ",productType)

  
    deleteProductType(productType,user._id,token)
    .then(data => {
        if(data.status !== 200){
              setMessage("Error deleting Product Type")
              setAlert(true)
              setTimeout(()=>setAlert(false),2000)
        }
        else{

            setMessage("Product Type was deleted successfully")
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
            fetchProductTypes()
            setValues({ name : "", category :'', categoryId : ''})
        }
    } )
    .catch( err => {
             setMessage("Error deleting Product Type")
              setAlert(true)
              setTimeout(()=>setAlert(false),2000)
    })
       
}
 const handleSave = ()=>{      
       

 if(edit){
     console.log("Editing Product type ",values)

            let newValues = {
                _id,
                name,
                category : {name : category, _id : categoryId}
                }
          
             console.log(" update values : ",newValues)   
             updateProductType(user._id,token,newValues)
             .then(data =>{
                 if(data.status !== 200){
                     setMessage('Error in Saving Product Type')
                     setAlert(true)
                     setTimeout(()=>setAlert(false),2000)
                    }
                    else{
                        setMessage('Prduct Type updated successfully')
                        setAlert(true)
                        setTimeout(()=>setAlert(false),2000)
                        fetchProductTypes()
                        setValues({ name : '',category: '',categoryId : ''})
                    }
                })
                .catch(err => {
                    setMessage('Error in Saving Product Type')
                    setAlert(true)
                    setTimeout(()=>setAlert(false),2000)
                })      
                setEdit(false)

 }
 else {
    let selectedCategory = categories.filter(c => c.name === category)    
     
    let newValues = {
                name,
                category : {...selectedCategory[0]}
    }
    
 
 
 createProductType(user._id,token,newValues)
 .then(data =>{
     if(data.status !== 200){
         setMessage('Error in Saving Product Type')
         setAlert(true)
         setTimeout(()=>setAlert(false),2000)
     }
     else{
         setMessage('Prduct Types saved successfully')
         setAlert(true)
         setTimeout(()=>setAlert(false),2000)
         fetchProductTypes()
         setValues({ name : '', categoryId : ''})
     }
 })
 .catch(err => {
          setMessage('Error in Saving Product Type')
          setAlert(true)
          setTimeout(()=>setAlert(false),2000)
 })

 }
     
        
}

const productTypeForm = () => {

    
    return (
        <div className = ' mx-auto'>
              
              <form>
                  <div className = 'border border-dark p-3 '>
                  {/* <h2>Add New Product Type</h2> */}
                  {alert && <div className = 'fs-3 text-danger' >{message}</div>}   
                  <div className="d-flex flex-column flex-md-row justify-content-around ">
                      <div className=" form-group ">
                            <label className = 'fs-4'>Name</label>
                            <input type="text"
                                    className = 'form-control'
                                    value = {name}
                                    onChange = {handleChange('name')}
                                    />
                      </div>
                         <div className=" form-group mx-2">
                         <label className = 'fs-4'>Category</label> 
                            <select name = 'category'
                                    className = 'fs-3 form-select'  
                                    value = {category}
                                    onChange = {handleChange('category')}
                                       >
                              <option>Select Category</option>             
                             {categories.length>0 && categories.map(cat =>  <option key = {cat._id} 
                                                                                value = {cat.name}                                                                                                                                                                                                                                     
                                                                                >{cat.name}</option>)}
                                </select>  
                         </div>
                      <div className="btn btn-info fs-3 text-white px-3"
                           onClick = {handleSave} 
                            >Save</div>
                  </div>
                  
                  </div>        
              </form>
          </div>
    )
}

const productTypesTable = () => {

    return (
        <div className = 'container-fluid  '>
        {productTypes.length>0 && <ul>
            {productTypes.map(productType => <li key = {productType._id}>
                       <div className="row  ">
                           <div className="col-8 border border-dark fs-3" onClick = {()=> {
                                                                        setValues({_id:productType._id,
                                                                                    name : productType.name, 
                                                                                    category : productType.category.name, 
                                                                                    categoryId : productType.category._id})
                                                                     }} >{productType.name}</div>                          
                           <div className="col-2 border border-dark " onClick = {() =>{
                                                                    setEdit(true) 
                                                                    setValues({_id:productType._id,
                                                                        name : productType.name, 
                                                                        category : productType.category.name, 
                                                                        categoryId : productType.category._id})
                                                                        console.log("Set Edit : ",edit)

                                                                }
                               }>            <IconButton  >
                                                 <EditIcon sx={{ fontSize: 30 }} />                                              
                                             </IconButton>
                                             </div>
                                   <div className="col-2 border border-dark"  onClick = {()=>verifyDelete(productType)}>
                                        <IconButton  >   <DeleteOutlineIcon sx={{ fontSize: 30 }}/></IconButton>
                                        </div>
                       </div>
            </li> )}
            
            </ul>}
        </div>

    )

}




    return (
        <div className = 'container-fluid'>
            <h2>Product Type</h2>
            {productTypeForm()}
          <div className = 'my-3'>
             {productTypesTable()}
          </div>
        </div>
    );
}

export default ProductType;