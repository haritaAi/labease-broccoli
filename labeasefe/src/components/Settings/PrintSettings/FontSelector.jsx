import React,{useState} from 'react';
import './fontSelector.css'


const FontSelector = ({title ,onSelect}) => {

       const [values,setValues] = useState({
           title:'',
           font:'',
           size:'',
       })

const handleChange = name => event => {
    let val = event.target.value
    setValues({...values,[name]:val})
    onSelect({...values,[name]:val})
}


    return (
        <div className='d-flex flex-row w-100 '>
            <div className='w-25'>{title}</div>
            <select className='w-50' onChange={handleChange('font')}>
                <option  className = 'arialBlack' value = 'Arial Black' >Arial Black</option>
                <option  className = 'arial' value = 'Arial' selected>Arial</option>
                <option  className = 'helvetica' value = 'Helvetica'>Helvetica</option>
                <option  className = 'impact' value = 'Impact'>Impact</option>
                <option  className = 'timesRoman' value = 'Times New Roman'>Times New Roman</option>
                <option  className = 'georgia' value = 'Georgia'>Georgia</option>
                <option  className = 'bookAntiqua' value = 'Book Antiqua'>Book Antiqua</option>
                <option  className = 'palaLine' value = 'Palatino Linotype'>Palatino Linotype</option>
                <option  className = 'courierNew' value = 'Courier New'>Courier New</option>
                <option  className = 'lucida' value = 'Lucida Console'>Lucida Console</option>
                <option  className = 'garmond' value = 'Garamond'>Garamond</option>
                <option  className = 'verdana' value = 'Veradana'>Veradana</option>
                <option  className = 'tahoma' value = 'Tahoma'>Tahoma</option>                
            </select>
            <select className='w-25' onChange={handleChange('size')}>
                <option value = '50'>50</option>
                <option value = '75'>75</option>
                <option value = '80'>80</option>
                <option value = '85'>85</option>
                <option value = '90'>90</option>
                <option value = '95'>95</option>
                <option value = '100' selected>100</option>
                <option value = '105'>105</option>
                <option value = '110'>110</option>
            </select>
        </div>
    );
}

export default FontSelector;