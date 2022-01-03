import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../../icons/MaterialUiIcons'
import EditIcon from '@mui/icons-material/Edit';
import {  Tooltip } from '@material-ui/core';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const ProductsTable = ({products,fetchProducts,onEditProduct,onDeleteProduct})  => {

console.log("Products received  in table:",products)
       

const verifyDelete = (product) => {
     
    if(window.confirm("Are You sure you want to delete the Product type ?")){
        onDeleteProduct(product)
    }
    
}





   const columns = [
       {title : 'Product',field : 'name',cellStyle :{
           fontSize:'1.8rem'
       },defaultSort:'asc'},
       
   ]

    return (
        <div className = "container ">
            <MaterialTable columns = {columns}
                           data = {products} 
                           icons = {tableIcons}
                           title = "Products"
                           actions = {[                          
                             {
                             icon:()=><Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Edit Product</div>}>
                                        <EditIcon sx={{fontSize : 30}}/></Tooltip>,
                             onClick:(e,data)=>{ 
                                                 onEditProduct(data)
                                                 }
 
                             },
                             {
                                icon:()=><Tooltip title = {<div style = {{ fontSize : '1.4rem', padding:'0.5rem' }}>Delete Product</div>}>
                                           <DeleteOutlineIcon sx={{fontSize : 30}}/></Tooltip>,
                                onClick:(e,data)=>{ 
                                    verifyDelete(data)
                                                    }
    
                                }
                            ]}
                            options = {{
                                padding:'dense',
                                filtering:true,pageSizeOptions:[10,20,50],
                                paginationType:'stepped',exportAllData:true,
                                exportFileName : 'productdata',actionsColumnIndex:2,
                                
                                headerStyle : {
                                    backgroundColor:'#01579b',
                                    color:'#fff',
                                    fontSize:'1.5rem',                                    
                                },
                                style:{ fontSize : '2rem'}
                            }}
                           >

            </MaterialTable>
        </div>
    );
}

export default ProductsTable;