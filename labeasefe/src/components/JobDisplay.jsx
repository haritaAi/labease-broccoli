import React from 'react';
import ToothList from './TeethList'


const JobDisplay = ({jobs}) => {
   
   

// const { units ,
//         price,
//         product,
//         type,
//         productId,
//         discount,
//         discount_type,
//         total,
//         productTypeCategory,
       
//       } = job


 const upperArch1 = [
    {index:'1',state:false},
    {index:'2',state:false},
    {index:'3',state:false},
    {index:'4',state:false},
    {index:'5',state:false},
    {index:'6',state:false},
    {index:'7',state:false},
    {index:'8',state:false},
 ]  
 const upperArch2 = [
    {index:'1',state:false},
    {index:'2',state:false},
    {index:'3',state:false},
    {index:'4',state:false},
    {index:'5',state:false},
    {index:'6',state:false},
    {index:'7',state:false},
    {index:'8',state:false},
 ]
 const lowerArch3 = [
    {index:'1',state:false},
    {index:'2',state:false},
    {index:'3',state:false},
    {index:'4',state:false},
    {index:'5',state:false},
    {index:'6',state:false},
    {index:'7',state:false},
    {index:'8',state:false},
 ]
 const lowerArch4 = [
    {index:'1',state:false},
    {index:'2',state:false},
    {index:'3',state:false},
    {index:'4',state:false},
    {index:'5',state:false},
    {index:'6',state:false},
    {index:'7',state:false},
    {index:'8',state:false},
 ]

const getIndex = (tooth) =>{

    return tooth.slice(1)
}

const getArch = (tooth) =>{
   
     return tooth.slice(0,1)
}

const setArch = (toothIndex,arch) => {

    if(arch === '1')         
         {
             let newIndex = upperArch1.findIndex( tooth => tooth.index === toothIndex )
             upperArch1[newIndex].state = true
    
         }
    else if(arch === '2')
          {
            let newIndex = upperArch2.findIndex( tooth => tooth.index === toothIndex )
            upperArch2[newIndex].state = true
            
          }  
      else if(arch === '3')
            {
                let newIndex = lowerArch3.findIndex( tooth => tooth.index === toothIndex )
                lowerArch3[newIndex].state = true
            
            }
       else if(arch === '4') 
         {
            let newIndex = lowerArch4.findIndex( tooth => tooth.index === toothIndex )
            lowerArch4[newIndex].state = true
        
         }
        

}
const getArchs = () => {
  if(jobs.length>0){
   jobs.forEach(job => {

   let teethArray = [...job.teethSelected]
      
        if(teethArray.length > 0){

            for(let i = 0;i < teethArray.length;i++){
            
            let  toothIndex =   getIndex(teethArray[i])
            let  arch =  getArch(teethArray[i])
            
            
    
            setArch(toothIndex,arch)
    
            }
    
        }
   })
      
  
    
 }
}

const toothSelectionForm = () => {

  
 
    return (
               <div className = 'tooth-container  ' >
               {/* <div className = 'tooth-container border border-secondary my-2' > */}
                         
                 {/* <div className = 'd-flex justify-content-between'>
                     <div> {type}</div>
                     <div className = 'd-inline-flex '>
                       <div className = 'fs-2'>{product}</div> 
                       
                     </div>
                     <div> {productTypeCategory}</div>
                 </div> */}
                 <div className = ' border border-dark  px-2 toothSelector '>                     
                 {/* <div className = ' border border-dark  px-2 toothSelector '>                      */}
                             {/* <div className = 'hr'>Selected Teeth</div> */}
                            
                     
               
                 <div className = "d-flex">
                     <ToothList selectorClass = 'flex-md-row-reverse' 
                                 division = {1} 
                                //  handleSelectTooth = {handleToothSelection}
                                 selectedTeeth = {upperArch1}                              
                                 />
                                     <span className = "divider-vt"></span>
                                     <span> <ToothList division = {2}  
                                                    //    handleSelectTooth = {handleToothSelection}
                                                       selectedTeeth = {upperArch2}  
                                                       /> </span>
                 </div>
                     
                 <div className = 'divider-hz '></div>
   
   
                 <div className = "d-flex">
                     <ToothList selectorClass = 'flex-row-reverse' 
                                 division = {4}   
                                //  handleSelectTooth = {handleToothSelection} 
                                 selectedTeeth = {lowerArch4}  
                                 />
                                     <span className = "divider-vt"></span>
                                     <span> <ToothList division = {3}  
                                                    //    handleSelectTooth = {handleToothSelection}
                                                       selectedTeeth = {lowerArch3}                                                            
                                                       /> </span>
                 </div>
                 </div>
   
                 {/* <div className = 'd-flex flex-row justify-content-between fs-4 m-2 '>
                   <div>
                       <div>Teeth :{teethArray.join()}</div>
                       <div>Units :{units} </div>
                       <div>Unit Rate : <input type = 'number'
                                               className = 'input-group' 
                                               defaultValue = {price}
                                            //    onChange = {handleChange('price')}
                                               />
                                               </div>
                        <div className = "fs-3">Total : {total} </div>                       
                     
                   </div>
                   <div className = 'd-flex flex-column mw-50'>
                            <div className="d-flex flex-row justify-content-between">
                                <div className="col-5">Discount Type:{discount_type === 'a'? 'Amount' : 'Percentage' }</div>
                                
                                <div className = "col-5 ">Discount Amount: {discount}                                               
        
                            </div>
                         
                            </div>
                                            
                               
                               <button className = " btn btn-success fs-4 my-3 w-50 align-self-end "
                                   onClick ={(e)=>{
                                     e.preventDefault() 
                                     onJobDelete(index)
                                       }               
                                         
                                       }
                                   >Delete</button>                      */}
                         
                       
                     
   
                                         
                 </div>
            //    </div>
            //    </div>
             )
   }
   


    return (
        <div>

             {getArchs()}
             {toothSelectionForm()}
        </div>
    );
}

export default JobDisplay;