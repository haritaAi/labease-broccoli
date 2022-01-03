import React from 'react';
import '../../css/tooth.css'




const Tooth = ({index,onSelectTooth,state})  => {

   

const currentState = () => {
   
     return  (state)? {backgroundColor : '#0694d1', border: '2px solid #000' } : {backgroundColor : '#aaacad'}
          
}



    return (
        <div>
            <button className = 'btn-tooth'
                    style ={currentState()}                           
                 onClick = {(e) => { 
                     e.preventDefault()   
                     onSelectTooth(index)              
                                         
                 }}    
                     >{index}</button>
            
        </div>
    );
}

export default Tooth;