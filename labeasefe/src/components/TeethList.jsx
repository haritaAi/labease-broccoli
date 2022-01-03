import React  from 'react';
import Tooth from './Tooth'

const TeethList = ({selectorClass,division,handleSelectTooth,selectedTeeth }) =>  {  
 



    return (
        <div className = {`d-flex + m-2 + ${selectorClass}`} division = {division} >
         { selectedTeeth.map(tooth =>  <Tooth    key = {(Math.random(1000)*100)+division} index = {tooth.index} state = {tooth.state} onSelectTooth = {(index) => handleSelectTooth(index,division)} />)
           }  
        </div>
    );
}

export default TeethList;