import React,{useState,useEffect} from 'react';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Teethselector from './Teethselector';

const  JobSummary = ({job,index,onJobDelete,onJobEdit,onAddOrderCancel,onEditJobClick}) => {

  const [update,setUpdate] = useState(false)
  
   
  const {
        id,
        units ,
        price,
        product,
        type,
        productId,
        discount,
        discount_type,
        total,
        productTypeCategory,
        teethSelected,
      } = job

const  handleJobEdit = (index) => {
    setUpdate(true)
  
}
const handleEditCancel = ()=>{
    setUpdate(false)
}

useEffect(()=>{
   
 setUpdate(false)
},[job])

    return (
        <>
        {!update && <div className = ' border border-secondary' >
                         
        <div className = 'd-flex flex-row w-75 justify-content-start'>
            
              <div className = '  border border-dark p-2 mx-3 '> {type}</div>
              <div className = 'border border-dark p-2 mx-5'>{productTypeCategory}</div> 
              
            
            </div>
            <div className = 'd-flex w-75 justify-content-start align-items-center'>

                <div className = 'text-primary fs-3'><b>{product}</b></div>
                <div className = 'fs-3 mx-5'><b>{teethSelected.join()}</b></div>         
            </div>   
            <div className = 'd-flex'>
            <div className = 'd-flex w-75 justify-content-start align-items-center my-1 mx-1'>
               <div><b>{units}</b> Unit  @ <b>{price}</b> </div>
               <div className = 'mx-2' >{discount? `discount : ${discount}` : '' }</div> 
               <div className = 'mx-2'>{discount? `discount type : ${discount_type}`:''}</div>
               <div className = 'mx-2'>Total charge :<b> {total}</b></div>
              </div>
              <div className ='d-flex w-25 justify-content-end'>
               <div className = 'btn '>
                     <Edit  style = {{fontSize : 24 ,border : '1px solid black',borderRadius : '0.5rem'}}
                             onClick = {()=> handleJobEdit(index)}
                             />
                     
                      </div>
                <div className = 'btn'> 
                     <DeleteOutline style ={{ color :'red',fontSize : 24 , border:'1px solid red',borderRadius : '0.5rem'}}
                                    onClick = {()=>{
                                        onJobDelete(id)
                                    }}
                                    /> 
                      </div>
             </div>
             </div>  
            <div className = 'd-flex justify-content-end'>
             
            </div>
        </div>}
        {update && <div>
                 <Teethselector job = {job} 
                                onAddOrderCancel = {handleEditCancel}  
                                onJobSave = {onJobEdit}
                                onEditJob = {onEditJobClick}
                                />
            </div>}
        </>
       
    );
}

export default JobSummary;