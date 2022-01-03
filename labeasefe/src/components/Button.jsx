import React from 'react';

function Button({title,classes }) {
    return (      
            <button className = {classes}>{title}</button> 
        
    );
}

export default Button;