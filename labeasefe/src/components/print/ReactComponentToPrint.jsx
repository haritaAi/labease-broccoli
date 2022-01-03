import React,{useEffect,useRef} from 'react';
import {Container,Paper} from '@material-ui/core'
import ReactToPrint from 'react-to-print'

const  ReactComponentToPrint = (props) => {
   //component Reference
     let componentRef = useRef(null)


   useEffect(()=>{

   },[])
   
   
    return (
        <div>
            <Container>
                <ReactToPrint 
                       trigger = {()=>
                             <div className = 'fs-4'>
                                 <div>Printng Component Header</div>
                                  <div>Generator</div>
                                  <div className = 'btn btn-info fs-4'>Print Paper</div>
                             </div>
                           }
                           content = {()=> componentRef}
                       />
                       <Paper ref = {el => (componentRef = el)}/>
            </Container>
        </div>
    );
}

export default ReactComponentToPrint;