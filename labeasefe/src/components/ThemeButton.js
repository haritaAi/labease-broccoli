import React,{useContext} from 'react';
import ThemeContext from '../context/ThemeContext';

function ThemeButton(props) {
    const theme = useContext(ThemeContext);
    return (      
  
      <button style={{ background: theme.background, color: theme.foreground }}>
        I am styled by theme context!
      </button>
 
        
    );
}

export default ThemeButton;

