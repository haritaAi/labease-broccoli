import React,{Fragment, useState,useEffect} from 'react';
import JobDisplay from './JobDisplay';
import Teethselector from './Teethselector';
import JobSummary from './jobSummary';







const JobSet = ({products,onAddOrderCancel,onConfirmOrder,onJobEdit,onDelete,onEditJob}) =>  {

 const [jobs,setJobs] = useState([])





 const handleJobSave = (jobValues) => { 
    console.log("New job received :",jobValues)
 
   
   setJobs(prev => [...prev,jobValues])

 }

const handleJobDelete = (index) => {
   console.log("index Received",index)
   
    setJobs(jobs.filter((j,i)=>i !== index ))  

}


const handleJobEdit = (index) => {
  console.log("Job Selected after Edit in**** JobSET :",jobs[index])
   
}

 const showJobDetails = () => {
  

  
  
    return(

      <div>
      <div><JobDisplay jobs = {products} /></div>  
      {products.length > 0  && 
                     <div className = ' m-auto fs-4 job-details'>
                      {
                                 products.map((job,index) =>                                  
                                  <JobSummary  job = {job}  
                                               index = {index}  
                                               onJobDelete = {onDelete}
                                               onJobEdit = {handleJobEdit}
                                               onAddOrderCancel = {onAddOrderCancel}                                             
                                               onEditJobClick = {onEditJob}
                                                />
                                           
                                           )}
         
      </div>}
      </div>
    )
  }
  
 useEffect(()=>{
  
  if(products.length>0){
    setJobs(products)
  }
},[])


console.log("Jobs confirmed :",jobs.length)
 
    return (
        <div className = 'd-flex flex-column '>
            {console.log("Products received in JobSet :",products)}
            {jobs.length > 0 && 
                <Fragment>
                        <div>{showJobDetails()}</div>
                         
                        {/* <div className = "btn btn-info text-white fs-3 w-10 mx-auto my-3  "
                            onClick = {()=>onConfirmOrder(jobs)}
                            >Confirm Order</div> */}
                </Fragment>
                }
                
        { jobs.length<1 &&   <Teethselector     onAddOrderCancel = {onAddOrderCancel} 
                               onJobSave = {onConfirmOrder}
                               />   }        
            
        </div>
    );
}

export default JobSet;