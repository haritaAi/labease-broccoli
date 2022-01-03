import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';




const  DropdownMenu = ({title,option1,option2,option3 ,onSelectOption}) =>{


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (option) => {
        setAnchorEl(null);
        onSelectOption(option)
    };


    return (
        <div >
        <Button
          className = "fs-5 text-white"
          id="demo-positioned-button"
          aria-controls="demo-positioned-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {title}
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem  style = {{color : '#5c5c5c' , fontSize : '1.5rem'}} onClick={() => handleClose(option1)}>{option1}</MenuItem>
          <MenuItem  style = {{color : '#5c5c5c' , fontSize : '1.5rem'}} onClick={() => handleClose(option2)}>{option2}</MenuItem>
          <MenuItem  style = {{color : '#5c5c5c' , fontSize : '1.5rem'}} onClick={() => handleClose(option3)}>{option3}</MenuItem>
        </Menu>
      </div>
    );
}

export default DropdownMenu;