import React from 'react';

function GenrateSummery(props) {
    return (
        <div className = 'd-flex flex-row h-100'>
            <div className="d-flex    border border-dark w-50 ">
                <div className ='border border-dark m-2 w-100 '>
                <div className="bg-info py-3  "><b className ='px-3 py-5'>Lab Performance Today</b></div>
                    <div className = ''>
                            <div className = 'row px-3 py-2'>
                                <div className="col-8">
                                        New Clients :  
                                </div>
                                <div className="col-4">
                                    0
                                </div>
                                </div>
                                <hr/>
                                <div className = 'row px-3 py-2'>
                                <div className="col-8">
                                        New Orders :  
                                </div>
                                <div className="col-4">
                                    0
                                </div>
                                </div>
                                <hr/>
                                <div className = 'row px-3 py-2'>
                                <div className="col-8">
                                        Invoiced Amount:  
                                </div>
                                <div className="col-4">
                                    0
                                </div>
                                </div>
                                <hr/>
                                <div className = 'row px-3 py-2'>
                                <div className="col-8">
                                        Collections : 
                                </div>
                                <div className="col-4">
                                    0
                                </div>
                                </div>

                                </div>
                </div> 
            </div>

     
        <div className="d-flex flex-column  border border-dark w-50 ">

        <div className ='border border-dark m-2  h-100'>
                <div className="bg-info  py-3 "><b className ='px-3 py-5'>Lab Workflow Summary</b></div>
                    <div className = ''>
                             <b>Order Status</b>
                             <hr/>
                         <div className="row px-3 py-2">
                           <div className="col-8">
                               New 
                            </div> 
                            <div className="col-4">
                                0
                            </div>
                        </div> 
                        <hr/>
                         <div className="row px-3 py-2">
                           <div className="col-8">
                             In Production
                            </div> 
                            <div className="col-4">
                                0
                            </div>
                        </div> 
                        <hr/>
                         <div className="row px-3 py-2">
                           <div className="col-8">
                              Complete
                            </div> 
                            <div className="col-4">
                                0
                            </div>
                        </div> 
                        <hr/>
                         <div className="row px-3 py-2">
                           <div className="col-8">
                              Hold
                            </div> 
                            <div className="col-4">
                                0
                            </div>
                        </div> 
                        <hr/>
                         <div className="row px-3 py-2">
                           <div className="col-8">
                              Try In
                            </div> 
                            <div className="col-4">
                                0
                            </div>
                        </div> 


                    </div>
                </div> 

         </div>

        </div>
    );
}

export default GenrateSummery;