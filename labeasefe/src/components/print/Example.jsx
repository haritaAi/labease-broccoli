import React,{useRef} from 'react';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

const Example = ({myComponent})=> {
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content :()=> componentRef.current,
    }) 

    return (
        <div>
            <div style = {{display :'none'}}>

                           <ComponentToPrint  
                              toPrint = {myComponent} 
                              ref = {componentRef}/>
                </div>
            <div className='btn fs-4' onClick = {handlePrint}>Print</div>
        </div>
    )
}

export default Example