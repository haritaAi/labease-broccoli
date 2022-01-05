import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Menu from '../components/menu'
import ProductsTable from '../components/Products/ProductsTable';
import ProductForm from '../components/Products/ProductForm'
import ProductType from '../components/Products/ProductType';
import Category from '../components/Products/Category'
import {getCategories,getProductTypes,getProducts,deleteProduct} from '../admin/clientApi'
import ProductContext from '../context/ProductContext'
import UserContext from '../context/UserContext';
import '../css/product.css'


const Products = (props) => {

   
    const [showProductsTable,setShowProductsTable] = useState(true)
    const [productForm,setProductForm] = useState(true)
  
    const [categories,setCategories] = useState([])
    const [productTypes,setProductTypes] = useState([])
    const [productSelected,setProductSelected] = useState(null) 
    const [products,setProducts] = useState([])
    const {user,token} = useContext(UserContext)
    const [values,setValues] = useState({
        error:'',
        loading:false
    })
    const [message,setMessage] = useState('')
    const [alert,setAlert] = useState(false)
    const [currentTab ,setCurrentTab] = useState(1)

    const fetchProducts = async () => {     
          setValues({error:'', loading:true})
        await getProducts(user._id,token)
                       .then(data => {
                           if(data.error){
                          setValues({error : data.error,loading : false})
                           }
                           else {
                              setValues({error : '',loading : false})
                              setProducts(data)
                           }
                       })
                       .catch(err => { 
                        setValues({error : err,loading : false}) })


}


const fetchCategories = async () => {
 
        let categories = await  getCategories()
        setCategories(categories) 

   }
   const fetchProductTypes = async () => {      
       
       let productTypes = await getProductTypes()
       setProductTypes(productTypes)

       
   }

const handleEditProduct = product => {  
    
    setProductSelected(product)
    setCurrentTab(3)   
 
}

const handleDeleteProduct =  async product => {
  
    await deleteProduct(user._id,token,product)
         .then(
              data => {           
                setMessage("Product  was deleted successfully")
                setAlert(true)
                setTimeout(()=>setAlert(false),2000)
                fetchProducts()
                
        
         }
         )
         .catch(err => {
            setMessage("Error deleting Product")
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
         })

}

const productMenuTabs = ()=> {
    return (
        <div className = 'd-flex flex-row  justify-content-around  '
        style = {{backgroundColor : 'dodgerblue'}} >
         
           <div className="btn  text-white fs-3 p-2" 
                style = {currentTab === 1 ?{backgroundColor:'tomato'}:{backgroundColor:'dodgerblue'} }
                onClick = {()=>{
                   
                    setCurrentTab(1)
                }}
                >Products</div> 
           <div className="btn  text-white fs-3 p-2" 
                style = {currentTab === 2 ?{backgroundColor:'tomato'}:{backgroundColor:'dodgerblue'} }
                onClick = {()=>{
                   
                    setCurrentTab(2)
                }}
                >Product Types</div> 
           <div className="btn  text-white fs-3 p-2" 
                style = {currentTab === 3 ?{backgroundColor:'tomato'}:{backgroundColor:'dodgerblue'} }
                onClick = {()=>{                   
                    setCurrentTab(3)
                }}
                >Add New Product</div> 
           <div className="btn  text-white fs-3 p-2" 
                style = {currentTab === 4 ?{backgroundColor:'tomato'}:{backgroundColor:'dodgerblue'} }
                onClick = {()=>{
                    
                    setCurrentTab(4)
                }}
                >Category</div> 

        </div>
    )
} 

const handleCancel = () => {
    setProductSelected(null)
    setCurrentTab(1)
}


useEffect(()=>{
    fetchProducts()
    fetchCategories()
    fetchProductTypes()
},[productSelected])


    return (
        <div>
            <Menu />

           <div className=" container-100-mdx60-xlx50 ">
             {productMenuTabs()}   
                  <div className = 'p-5'>
                    {alert && <div className = 'fs-3 text-danger' >{message}</div>}   

                    {currentTab===2 && <ProductType categories = {categories} 
                                                      productTypes = {productTypes} 
                                                      fetchProductTypes = {fetchProductTypes}/>}
                    { currentTab===3 &&  <ProductForm  categories = {categories} 
                                                    productTypes = {productTypes}
                                                    productToEdit = {productSelected}
                                                    fetchProducts = {fetchProducts}
                                                    onCancel={handleCancel}
                                                    /> }
                    { currentTab===1 && <ProductsTable products = {products} 
                                                          fetchProducts = {fetchProducts}
                                                          onEditProduct = {handleEditProduct}
                                                          onDeleteProduct = {handleDeleteProduct}
                                                          />}
                    {currentTab===4 && <Category categories = {categories} fetchCategories = {fetchCategories} />}  
                    </div>  
                   

               </div> 
        </div>
    );
}

export default Products;