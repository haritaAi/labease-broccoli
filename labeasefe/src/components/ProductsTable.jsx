import React, { useContext } from 'react';
import MaterialTable from 'material-table';
import ProductsContext from '../context/ProductContext'
import tableIcons from '../icons/MaterialUiIcons';


function ProductsTable({onProductSelection}) {


   const  columns = [
       { title : "Name", field : "name" ,cellStyle : {fontSize : '1.8rem'}, defaultSort : 'asc'},
       { title : "Type", field : "productType.name", cellStyle : {fontSize : '1.8rem'} },
       { title : "Price", field : "price", cellStyle : {fontSize : '1.8rem'} },
      
   ] 

    const {products} = useContext(ProductsContext)
 
    return (
        <div className = 'w-75 m-auto  ' style ={{zIndex : '10'}}>
        <MaterialTable columns = {columns}
                       data = {products}
                       icons = {tableIcons}   
                       title = "Products"
                       onRowClick = {(row,data) => {
                                        onProductSelection(data)
                                    }}
                       options = {{
                           filtering : true,
                           pageSizeOptions:[5,10,20,50,100],
                           padding:'dense',
                           paginationType: 'stepped',
                           headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF',
                            fontSize:'2rem',
                            position:'relative',
                            zIndex:'0'
                          },                           
                         

                       }}
                       > 
        </MaterialTable>
        </div>
    );
}

export default ProductsTable;