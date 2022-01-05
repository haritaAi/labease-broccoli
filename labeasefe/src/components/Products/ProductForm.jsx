import React, { useState,useContext,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {createProduct,updateProduct} from '../../admin/clientApi';
import UserContext  from '../../context/UserContext';
import Menu from '../menu'

const ProductForm = ({categories,productTypes,fetchProducts,productToEdit,onCancel}) => {

  const history = useHistory()

  const [values,setValues] = useState({
    name :'',
    code:'',
    warranty:'',
    productType:'MISC',
    cpDays:'',
    price:0,
    isSlab:false,
    slEnd1:'',
    s1Price:'',
    slEnd2:'',
    s2Price:'',
    s3Price:''
  })
  
  const [showSecondSlab,setShowSecondSlab] = useState(false)
  const [message,setMessage] = useState('')
  const [alert,setAlert] = useState(false) 
  const [isUpdate,setIsUpdate] = useState(false)

  const {user,token} = useContext(UserContext)   
  
  

  useEffect(()=>{
    if(productToEdit){
       setIsUpdate(true)
         
    //    let productTypeName =  productTypes.filter(p => p._id === productToEdit.productType )
       
       
        setValues({
            _id : productToEdit._id,
            name : productToEdit.name,
            code :productToEdit.code,
            warranty:productToEdit.warranty ,
            productType :productToEdit.productType.name,
            productTypeId:productToEdit.productType.productTypeId,
            price:productToEdit.price ,
            isSlab : productToEdit.slabPrice,
            slEnd1 : productToEdit.slab1.end,
            s1Price : productToEdit.slab1.s1price,
            slEnd2:productToEdit.slab2.end,
            s2Price : productToEdit.slab2.s2price,
            s3Price : productToEdit.slab3.s3price,
            priceband:productToEdit.priceband,
            cpDays:productToEdit.cpDays
        })
       console.log("Editing mode On :::::::::::::::")  
      }
  },[])
 
  
  const {name,code,warranty,productType,productTypeId,cpDays,price,isSlab,slEnd1,s1Price,slEnd2,s2Price,s3Price}  =  values  
   
   
  const handleChange = (name) => e => {
      e.preventDefault()
      let val = e.target.value
      setValues({...values,[name]:val})
  }

 const handleSlabPricing = () => {
     if(!isSlab) setValues({...values,isSlab : true})
     else setValues({...values,isSlab : false})
 }


const handleSave =(e) => {
            e.preventDefault()        
        
            let productTypeSelected = productTypes.filter(p => p.name === productType)
            
        let newValues = {
            
            name ,
            code ,
            warranty ,
            productType : {name : productType,_id : productTypeSelected[0]._id},        
            price ,
            slabPrice:isSlab,
            slab1 : { end : slEnd1, s1price:s1Price  },
            slab2:{end : slEnd2, s2price: s2Price},
            slab3:{s3price : s3Price},
            priceband:'',
            cpDays,
        }
            

if(isUpdate){
    
    newValues._id = productToEdit._id
    updateProduct(user._id,token,newValues)
    .then(data =>{
        if(data.status !== 200){
            setMessage('Error in updating Product Type')
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
        }
        else{
            setIsUpdate(false)
            setMessage('Prduct Types updated successfully')
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
            fetchProducts()
            setValues({
                name :'',
                code:'',
                warranty:'',
                productType:'MISC',
                productTypeId:'',
                cpDays:'',
                price:0,
                isSlab:false,
                slEnd1:'',
                s1Price:'',
                slEnd2:'',
                s2Price:'',
                s3Price:''
              })
        }
    })
    .catch(err => {
            setMessage('Error in updating Product Type')
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
    })

}
else {
    createProduct(user._id,token,newValues)
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
            fetchProducts()
            setValues({
                name :'',
                code:'',
                warranty:'',
                productType: 'MISC', 
                productTypeId:'',
                cpDays:'',
                price:0,
                isSlab:false,
                slEnd1:'',
                s1Price:'',
                slEnd2:'',
                s2Price:'',
                s3Price:''
              })
        }
    })
    .catch(err => {
            setMessage('Error in Saving Product Type')
            setAlert(true)
            setTimeout(()=>setAlert(false),2000)
    })
}
 


  }  

    return (

       

        <div className = 'container '>
         
            <h1> Add New Product</h1>
            {alert && <div className = 'fs-3 text-danger' >{message}</div>}   
            <div className="d-flex">
                <form>
                    <div className = 'd-flex flex-row'>
                            <div className="form-group w-50 fs-4">
                                <label htmlFor="name">Name</label>
                                <input className = ''
                                    type = 'text'
                                    name  = 'name'
                                    value = {name}
                                    onChange = {handleChange('name')}
                                    />
                            </div>
                            <div className="form-group mx-2 fs-4">
                                <label htmlFor="code">code</label>
                                <input className = ''
                                    type = 'text'
                                    name  = 'code'
                                    value = {code}
                                    onChange = {handleChange('code')}
                                    />
                            </div>
                            <div className="form-group mx-2 fs-4">
                                <label htmlFor="warranty">Warranty</label>
                                <div className="d-flex flex-row">
                                    <input className = 'w-50'
                                        type = 'number'
                                        name  = 'warranty'
                                        value = {warranty}
                                        defaultValue = '0'
                                        placeholder = '0'
                                        onChange = {handleChange('warranty')}
                                        />
                                        <span className = 'w-50 px-2'>years</span>
                                    </div>
                            </div>
                    </div>
                    <div className = 'd-flex flex-row justify-content-between'>
                            <div className = 'form-group  w-50'>
                                <label className = 'fs-4'>Type</label>
                                        <select name="productType" 
                                                value = {productType}  
                                                onChange = {handleChange('productType')}
                                                defaultValue = "MISC"
                                                className = 'form-select fs-4 '>
                                            <option>Select Type</option>
                                        {productTypes.length>0 && productTypes.map(type =>  <option key = {type._id} 
                                                                                                value = {type.name}                                                                                                                                                                                        
                                                                                                >{type.name}</option>)}
                                        
                                        </select>
                            </div>
                    
               
                    
                                    <div className="form-group w-25 fs-4">
                                        <label htmlFor="name">Completion Period</label>
                                        <div className = 'row'>
                                                <input className = 'col'
                                                    type = 'number'
                                                    name  = 'cpDays'
                                                    defaultValue = '5'
                                                    placeholder = '5'
                                                    value = {cpDays}
                                                    onChange = {handleChange('cpDays')}
                                                    /><span className = 'col'>Days</span>
                                            </div>
                                    </div>
                            </div>

                    <div className = 'd-flex flex-row align-items-center'>  
                            <div className="form-group w-25 mx-2 fs-4">
                                <label htmlFor="code">Standard Charge</label>
                                <input className = ''
                                    type = 'text'
                                    name  = 'price'
                                    value = {price}
                                    onChange = {handleChange('price')}
                                    />
                            </div>                  


                            <div className = 'form-check fs-4 mx-3'>
                                <input className = 'form-check-input'
                                        type = 'checkbox'
                                        value = {isSlab}   
                                        cheked = {isSlab} 
                                        onClick = {() => handleSlabPricing()}                              
                                    />
                                    <label class="form-check-label" for="flexCheckDefault">
                                        use Slab Pricing
                                        </label>
                            </div>

                    </div>
                 { isSlab &&    
                        <div className = 'border border-dark rounded fs-4  px-3'>
                            <div className = 'd-flex flex-row justify-content-between'>
                                        <div className="d-flex flex-row justify-content-around py-2 mx-2 ">
                                            <div className="d-flex flex-row ">
                                            <div className = 'w-75'> First </div> 
                                                <input className = 'form-control w-25 mx-2' name = 'slEnd1' 
                                                                                            value = {slEnd1}
                                                                                            onChange = {handleChange('slEnd1')}
                                                                                            />
                                            </div>
                                            <div className="d-flex flex-row ">
                                            <div className = 'w-75'> Units@ </div>
                                               <input className = 'form-control w-25' name = 's1Price' 
                                                                                      value = {s1Price}
                                                                                      onChange = {handleChange('s1Price')}                                                                                      
                                                                                      />
                                            </div>
                                            <div>Per Unit</div>
                                        </div>
                                <div className = 'btn btn-info px-3 fs-2 text-white'
                                     onClick = {() => {
                                           
                                          setShowSecondSlab(true)
                                            
                                     }}    ><strong>+</strong></div>
                                </div> 
                          {   showSecondSlab && <div className="d-flex flex-row justify-content-around  py-2"  >
                                <div className="d-flex flex-row ">
                                <div className = 'w-75'>  Next</div>
                                    <input className = 'form-control w-25 mx-2' name = 'slEnd2' 
                                                                                value = {slEnd2} 
                                                                                onChange = {handleChange('slEnd2')}                                                                                
                                                                                />
                                </div>
                                <div className="d-flex flex-row ">
                                    <div className = 'w-75'> Units@ </div>
                                         <input className = 'form-control w-25' name = 's2Price' 
                                                                                value = {s2Price}
                                                                                onChange = {handleChange('s2Price')}                                                                                
                                                                                />
                                </div>
                                <div>Per Unit</div>
                            </div>
                               }


                            <div className="d-flex flex-row  py-2">
                                <div className="w-50 ">
                                    Remaining Units@ 
                                </div>
                                <div className="w-25 ">
                                    <input className = 'form-control' name = 's3Price' 
                                                                      value = {s3Price} 
                                                                      onChange = {handleChange('s3Price')}                                                                      
                                                                      />
                                    </div>
                                    <div className =  'px-2'>Per Unit</div>
                            </div>
                                

                        </div>
                   }

                  <div className ='d-flex flex-row justify-content-end mt-3'> 
                        <button className="btn btn-info mx-3 fs-3 text-white" onClick = {handleSave}>Save</button>
                        <button className="btn btn-info mx-3 fs-3 text-white"  onClick = {onCancel}>Cancel</button>
                  </div>
                </form>
            </div>
        </div>
    );
}

export default ProductForm;