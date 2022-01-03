import React from 'react';

function AppInput({name,placeholder,value,className,type,...otherProps}) {
    return (
        <input name = {name}
               placeholder = {placeholder}
               value = {value}
               className = {className}
               type = {type}
               {...otherProps}           >
        </input>
    );
}

export default AppInput;