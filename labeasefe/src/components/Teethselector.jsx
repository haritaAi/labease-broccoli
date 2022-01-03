import React, { useState,useEffect, useContext } from 'react';
import { getProductTypes } from '../admin/clientApi';
import DropdownMenu from './DropdownMenu';
import ProductsTable from './ProductsTable';
import ToothList from './TeethList';
import ProductContext from '../context/ProductContext';

const Teethselector = ({ job, onAddOrderCancel,onJobSave,onEditJob}) => {
 
  // const [jobs,setJobs] = useState([])
  
  
    const [productSelected,setProductSelected] = useState(null);  
     
    const [productTypes,setProductTypes] = useState([])
    const [update,setUpdate] = useState(false)
    const {products} = useContext(ProductContext)
    const [showSlabPrice, setShowSlabPrice] = useState(false)
    const [slabValues,setSlabValues] = useState()

   const [teethSelected,setteethSelected] = useState([]) 
  const  [values,setValues] = useState({
      id:0,
      discount:0,
      discount_type:'a',
      price:0,
      product:'',
      total:0,
      type:'',
      units:0,     
      slab1End:0,
      slab1Price:0,
      slab2End:0,
      slab2Price:0,
      slab3Price:0,

  })
 
  const [upperArch1,setUpperArch1] = useState([
    {index:'1',state:false},
    {index:'2',state:false},
    {index:'3',state:false},
    {index:'4',state:false},
    {index:'5',state:false},
    {index:'6',state:false},
    {index:'7',state:false},
    {index:'8',state:false},
  
])
  const [upperArch2,setUpperArch2] = useState([
    {index:'1',state:false},
    {index:'2',state:false},
    {index:'3',state:false},
    {index:'4',state:false},
    {index:'5',state:false},
    {index:'6',state:false},
    {index:'7',state:false},
    {index:'8',state:false},
  
])
  const [lowerArch3,setLowerArch3] = useState([
    {index:'1',state:false},
    {index:'2',state:false},
    {index:'3',state:false},
    {index:'4',state:false},
    {index:'5',state:false},
    {index:'6',state:false},
    {index:'7',state:false},
    {index:'8',state:false},
  
])
  const [lowerArch4,setLowerArch4] = useState([
    {index:'1',state:false},
    {index:'2',state:false},
    {index:'3',state:false},
    {index:'4',state:false},
    {index:'5',state:false},
    {index:'6',state:false},
    {index:'7',state:false},
    {index:'8',state:false},
  
])
const {slab1End,slab1Price,slab2End,slab2Price,slab3Price} = values

const handleAddRemoveTooth = (toothState,division,index) => {

  if(toothState)setteethSelected(prev => [...prev,`${division}${index}`])

  else setteethSelected(teethSelected.filter(t => t !== `${division}${index}`))

  
}
const findProductSelected = (id) => {
     
   let newProduct = products.filter(product => product._id === id)
   return (newProduct[0])
}
const fetchProductTypes = async () => {
     
  const data = await getProductTypes()
  setProductTypes(data)
  
}


useEffect (() => {

   fetchProductTypes()
   if(job){   
     setUpdate(true)
     setteethSelected(job.teethSelected)
     getArchs()
     setValues({...job})
     setProductSelected(findProductSelected(job.productId))
     
     
    }
},[update])



const getIndex = (tooth) =>{

  return tooth.slice(1)
}

const getArch = (tooth) =>{
 
   return tooth.slice(0,1)
}

const setArch = (toothIndex,arch) => {

  if(arch === '1')         
       {
          console.log("INside upperArch1n")
           let newIndex = upperArch1.findIndex( tooth => tooth.index === toothIndex )
           let newArch = [...upperArch1] 
           newArch[newIndex].state = true
           setUpperArch1(newArch)
  
       }
  else if(arch === '2')
        {
          let newIndex = upperArch2.findIndex( tooth => tooth.index === toothIndex )
          let newArch = [...upperArch2] 
          newArch[newIndex].state = true
          setUpperArch2(newArch)
          
        }  
    else if(arch === '3')
          {
              let newIndex = lowerArch3.findIndex( tooth => tooth.index === toothIndex )
              let newArch = [...lowerArch3] 
              newArch[newIndex].state = true
              setLowerArch3(newArch)
          
          }
     else if(arch === '4') 
       {
          let newIndex = lowerArch4.findIndex( tooth => tooth.index === toothIndex )
          let newArch = [...lowerArch4] 
          newArch[newIndex].state = true
          setLowerArch4(newArch)
      
       }
      

}
const getArchs = () => {
   
  console.log("TEETH  SELECTED IN GETARCH",teethSelected)
 if(teethSelected.length > 0){
  
 let teethArray = [...job.teethSelected]
    
      if(teethArray.length > 0){

          for(let i = 0;i < teethArray.length;i++){
          
          let  toothIndex =   getIndex(teethArray[i])
          let  arch =  getArch(teethArray[i])
          
          
  
          setArch(toothIndex,arch)
  
          }
  
      }
    } 

}


 const handleToothSelection = (index,division) => {
     let toothId
     let newArray
  
    //  setteethSelected(prev => [...prev,`${division}${index}`])
    //  console.log("Selected teeth set :::::", teethSelected)
     if(division === 1)   
         {
             toothId  = upperArch1.findIndex(t => t.index === index)
             newArray = [...upperArch1];
            (newArray[toothId].state = !newArray[toothId].state)  
             handleAddRemoveTooth(newArray[toothId].state,division,index)
            setUpperArch1(newArray)
         }
     else if(division === 2)         
          {
            toothId  = upperArch2.findIndex(t => t.index === index)
            newArray = [...upperArch2];
            (newArray[toothId].state = !newArray[toothId].state)
            handleAddRemoveTooth(newArray[toothId].state,division,index)
            setUpperArch2(newArray)
          } 

     else if(division === 3)      
            {
                toothId  = lowerArch3.findIndex(t => t.index === index)
                newArray = [...lowerArch3];
               (newArray[toothId].state = !newArray[toothId].state)
               handleAddRemoveTooth(newArray[toothId].state,division,index)
                setLowerArch3(newArray)
            }   
     else if( division === 4)
            {
                toothId  = lowerArch4.findIndex(t => t.index === index)
                newArray = [...lowerArch4];
                (newArray[toothId].state = !newArray[toothId].state)
                handleAddRemoveTooth(newArray[toothId].state,division,index)
                setLowerArch4(newArray)
            }

 } 

const handleToothReset = (option) => {
    console.log("In handleToothReset",option)
  let newArray;
  
 if(option === 'None')   
  {

    newArray = [...upperArch1]
    newArray.forEach(t => t.state = false)
    setUpperArch1(newArray)
  
   newArray = [...upperArch2]
   newArray.forEach(t => t.state = false)
   setUpperArch2(newArray)

   
   newArray = [...lowerArch3]
   newArray.forEach(t => t.state = false)
   setLowerArch3(newArray)

   
   newArray = [...lowerArch4]
   newArray.forEach(t => t.state = false)
   setLowerArch4(lowerArch4)
   
   setteethSelected([])
  }
  else if(option === 'Upper Arch')
  {
    newArray = [...upperArch1]
    newArray.forEach(t => t.state = true)
    setUpperArch1(newArray)
  
   newArray = [...upperArch2]
   newArray.forEach(t => t.state = true)
   setUpperArch2(newArray)

   setteethSelected(prev => [...prev,'11','12','13','14','15','16','17','18','21','22','23','24','25','26','27','28'])
  }
 else if( option === 'Lower Arch')
 {
    newArray = [...lowerArch3]
    newArray.forEach(t => t.state = true)
    setLowerArch3(newArray)
 
    
    newArray = [...lowerArch4]
    newArray.forEach(t => t.state = true)
    setLowerArch4(lowerArch4)
    
    setteethSelected(prev => [...prev,'41','42','43','44','45','46','47','48','31','32','33','34','35','36','37','38'])

 }


}
const handleProductSelection = (product) => {
      //  event.preventDefault() 
       console.log("Product selected  in tooth selector:", product)
  
       setProductSelected(product);
       if(product.slabPrice){
         setShowSlabPrice(true)
        setValues({
          ...values,
          slab1Price :product.slab1.s1price,
          slab1End :  product.slab1.end,
          slab2End :  product.slab2.end,
          slab2Price :product.slab2.s2price,
          slab3Price: product.slab3.s3price
        })
       }  
       
  }

const handleProductChange = () => {
  setProductSelected(null)
}
const handleChange = name => event => {
   event.preventDefault()
   
   setValues({...values,[name]:event.target.value})
}
const handleJobEdit =() => {
  console.log("JOB ID IN EDIT ",job.id)
  let productTypeSeleceted = productTypes.filter(p => p.name === productSelected.productType.name )

  let newValues ={
    id: job.id,
    units : teethSelected.length,
    price: productSelected.price,
    product : productSelected.name,
    type:productSelected.productType.name,
    productTypeCategory:productTypeSeleceted[0].category.name,
    productId:productSelected._id,
    discount:values.discount,
    discount_type:values.discount_type,
    total : calculateBill(),  
    slab1End,
    slab1Price,
    slab2End,
    slab2Price,
    slab3Price,  
    teethSelected
  }
  
  console.log("NEW JOB TO BE SAVED IS :",newValues)
  onEditJob(newValues)
   setValues({
    id:0, 
   units:0,
   price:0,
   discount:0,
   total:0,
   discount_type:'a',
   product:'',
   category:'',
   productId:'',
   type:'',
   slab1End:0,
   slab1Price:0,
   slab2End:0,
   slab2Price:0,
   slab3Price:0,
   
   })
handleToothReset('None')
setProductSelected(null)
}
const handleJobSave = () => { 
 
   let productTypeSeleceted = productTypes.filter(p => p.name === productSelected.productType.name )
   console.log("Details of product type selected :",productTypeSeleceted[0])


  let newValues ={

    units : teethSelected.length,
    price: productSelected.price,
    product : productSelected.name,
    type:productSelected.productType.name,
    productTypeCategory:productTypeSeleceted[0].category.name,
    productId:productSelected._id,
    discount:values.discount,
    discount_type:values.discount_type,
    total : calculateBill(),    
    slab1End,
    slab1Price,
    slab2End,
    slab2Price,
    slab3Price,
    teethSelected
  }
 
  onJobSave(newValues)
  setValues({
         id:0, 
        units:0,
        price:0,
        discount:0,
        total:0,
        discount_type:'a',
        product:'',
        category:'',
        productId:'',
        type:'',
        slab1End:0,
        slab1Price:0,
        slab2End:0,
        slab2Price:0,
        slab3Price:0,
        
        })
   handleToothReset('None')
   setProductSelected(null)
}
const calculateBill = () => {
  console.log("Product SELECTED :::::",productSelected)
  let amount = 0;
  
  if(productSelected.slabPrice){
    console.log("SlabPrice true")
     let totalTeeth = teethSelected.length
    //  let  slab1End = productSelected.slab1.end
    //  let  slab2End = productSelected.slab2.end
    
     let teethArray = 0;
    while(teethArray < slab1End && teethArray < totalTeeth)
     {
          amount= amount + parseInt(slab1Price)
          teethArray++
          console.log("Amount:",amount)
     } 
     if(slab2End){
       while(teethArray < slab2End && teethArray<totalTeeth){
        amount= amount + parseInt(slab2Price)
        teethArray++
        console.log("Amount:",amount)

       }
     }
     if(teethArray < totalTeeth ){
       while(teethArray < totalTeeth){
          amount= amount + parseInt(slab3Price)
          teethArray++
          

       }
     }
  }
  else{
    amount = productSelected.price*teethSelected.length
    
  }
  let discount = values.discount 
  if(values.discount_type === 'p')
  {
    discount = (values.discount * amount)/100   
    } 
  return (amount-discount)
}

 const slabPriceForm = () => {
   return ( <div>
        { productSelected.slabPrice  &&    
                        <div className = 'border border-dark rounded fs-4  px-3'>
                            <div className = 'd-flex flex-row justify-content-between'>
                                        <div className="d-flex flex-row justify-content-around py-2 mx-2 ">
                                            <div className="d-flex flex-row ">
                                            <div className = 'w-75'> First </div> 
                                                <input className = 'form-control w-25 mx-2' type = 'number'
                                                                                            name = 'slEnd1' 
                                                                                            value = {slab1End}
                                                                                            onChange = {handleChange('slab1End')}
                                                                                            />
                                            </div>
                                            <div className="d-flex flex-row ">
                                            <div className = 'w-75'> Units@ </div>
                                               <input className = 'form-control w-25' name = 's1Price' 
                                                                                      type = 'number'
                                                                                      value = {slab1Price}
                                                                                      onChange = {handleChange('slab1Price')}                                                                                      
                                                                                      />
                                            </div>
                                            <div>Per Unit</div>
                                        </div>
                                        </div>     
                             
                          {   (slab2End > 0) && <div className="d-flex flex-row justify-content-around  py-2"  >
                                <div className="d-flex flex-row ">
                                <div className = 'w-75'>  Next</div>
                                    <input className = 'form-control w-25 mx-2' name = 'slEnd2'
                                                                                type = 'number'    
                                                                                value = {slab2End} 
                                                                                onChange = {handleChange('slab2End')}                                                                                
                                                                                />
                                </div>
                                <div className="d-flex flex-row ">
                                    <div className = 'w-75'> Units@ </div>
                                         <input className = 'form-control w-25' name = 's2Price' 
                                                                                type = 'number'
                                                                                value = {slab2Price}
                                                                                onChange = {handleChange('slab2Price')}                                                                                
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
                                                                      type = 'number'    
                                                                      value = {slab3Price} 
                                                                      onChange = {handleChange('slab3Price')}                                                                      
                                                                      />
                                    </div>
                                    <div className =  'px-2'>Per Unit</div>
                            </div>
                                

                      
                        </div>
                   }

     </div>
   )
 }



const toothSelectionForm = () => {

  
 
 return (
            <div className = 'tooth-container' >
                      
              <div className = 'd-flex justify-content-between lh-1'>
                  <div>{productSelected.product_type}</div>
                  <div>{productSelected.productTypeCategory}</div>
                  <div className = 'd-inline-flex '>
                    <div className = 'fs-2'>{productSelected.name}</div> 
                    <div className = 'btn btn-secondary mx-2 fs-3'
                          onClick = {handleProductChange} >Change</div>
                  </div>
                  
              </div>
              <div className = ' border border-dark  px-auto toothSelector'>
                  <div className = 'd-flex justify-content-between bg-info fs-4 text-white p-2'> 
                          <div className = ''>Select Teeth</div>
                          <DropdownMenu title = {'Quick Select'} 
                                        option1 = {'None'}
                                        option2 = {'Upper Arch'}
                                        option3 = {'Lower Arch'} 
                                        onSelectOption = {handleToothReset}        
                                          />
                  </div>
            
              <div className = "d-flex">
                  <ToothList selectorClass = 'flex-md-row-reverse' 
                              division = {1} 
                              handleSelectTooth = {handleToothSelection}
                              selectedTeeth = {upperArch1}                              
                              />
                                  <span className = "divider-vt"></span>
                                  <span> <ToothList division = {2}  
                                                    handleSelectTooth = {handleToothSelection}
                                                    selectedTeeth = {upperArch2}  
                                                    /> </span>
              </div>
                  
              <div className = 'divider-hz '></div>


              <div className = "d-flex">
                  <ToothList selectorClass = 'flex-row-reverse' 
                              division = {4}   
                              handleSelectTooth = {handleToothSelection} 
                              selectedTeeth = {lowerArch4}  
                              />
                                  <span className = "divider-vt"></span>
                                  <span> <ToothList division = {3}  
                                                    handleSelectTooth = {handleToothSelection}
                                                    selectedTeeth = {lowerArch3}                                                            
                                                    /> </span>
              </div>
              </div>

              <div className = 'd-flex flex-column justify-content-between fs-4 m-2 '>
                <div>
                    <div>Teeth :{teethSelected.join()}</div>
                    <div>Units :{teethSelected.length} </div>
                    { !productSelected.slabPrice && <div className = 'w-50'>Unit Rate : <input type = 'number'
                                            className = 'input-group' 
                                            defaultValue = {productSelected.price}
                                            onChange = {handleChange('price')}
                                            />
                                            </div>}
                    
                    {teethSelected.length > 0 && <div className = "fs-3">Total : {calculateBill()} </div> }                       
                   
                    </div>
                   {productSelected.slabPrice && <div>{slabPriceForm()}</div>}

               
                <div className = 'd-flex flex-column mw-50'>
                  <div className="d-flex flex-row justify-content-between">
                    <div className="col-5">Discount Type:
                        <select  onChange = {handleChange('discount_type') }> 
                              <option value="p">Precent</option>
                              <option value="a" selected>Amount</option>
                          </select> 
                    </div>
                        
                      <div className = "col-5 ">Discount: <input type = 'number'
                                              className = 'input-group'  
                                              value = {values.discount}                                              
                                              onChange = {handleChange('discount')}
                                              /></div>

                  </div>
                      
                    <div className="d-flex flex-row justify-content-between">
                      <div className="my-3 fs-3">
                        Gross Amount: {calculateBill()}
                      </div>
                      <div className = 'd-flex  flex-md-column align-items-end flex-sm-row mt-3'>
                        <button className = " btn btn-success fs-4 my-3 "
                                onClick ={(e)=>{
                                  e.preventDefault() 
                                 if(update){
                                  if(teethSelected.length>0) handleJobEdit()
                                  else {
                                    let reply =  window.confirm("No Teeth selected , Are you sure you want to continue?")        
                                      if(reply === true) 
                                            handleJobEdit()
                                            
                                 }  
                                  
                                 } 
                                 else{
                                   
                                                                
                                  if(teethSelected.length>0) handleJobSave()
                                 else {
                                         let reply =  window.confirm("No Teeth selected , Are you sure you want to continue?")        
                                           if(reply === true) 
                                                 handleJobSave()
                                                 
                                      }
                                    }               
                                      
                                    }
                                  }
                                >Save</button>                             
                           
                           {/* <div className = '  btn btn-secondary fs-3 my-3 '
                            style = {{marginLeft:'45%'}}
                            onClick = {() => {
                              setValues({
                                teethArray :[],
                                units:0,
                                price:0,
                                discount:0,   
                                discount_type:'a'                                   
                            })
                              onAddOrderCancel()
                            }

                            }
                            >Cancel</div>  */}
                       </div> 
                                        </div>
                    
                      
                    
                </div>
                  

                                      
              </div>
            </div>
          )
}



    return (
        <div className = 'container '>
          {productSelected   &&   <>     {toothSelectionForm()}     </>           }
          {!productSelected &&  !update  && <>
           <ProductsTable onProductSelection = {handleProductSelection} />
           {/* <div className = '  btn btn-secondary fs-3 my-3 '
                            style = {{marginLeft:'45%'}}
                            onClick = {e => {
                              setValues({
                                teethArray :[],
                                units:0,
                                price:0,
                                discount:0,   
                                discount_type:'a'                                   
                            })
                              onAddOrderCancel()
                            }

                            }
                            >Cancel**</div>  */}
                             </>  } 
        </div>
    );
}

export default Teethselector;