import React, {useEffect,useContext } from 'react';
import MaterialTable from 'material-table';

import tableIcons from '../icons/MaterialUiIcons';
import {getProducts} from '../admin/clientApi'
import UserContext from '../context/UserContext';
import { useState } from 'react';

function ProductsTable({onProductSelection}) {


   const  columns = [
       { title : "Name", field : "name" ,cellStyle : {fontSize : '1.8rem'}, defaultSort : 'asc'},
       { title : "Type", field : "productType.name", cellStyle : {fontSize : '1.8rem'} },
       { title : "Price", field : "price", cellStyle : {fontSize : '1.8rem'} },
      
   ] 

    const [products,setProducts] = useState([])
    const {user,token} = useContext(UserContext)
    const [values,setValues] = useState([{
        error:'',
        loading:false
    }])

    const fetchProducts = async () => {     
        setValues({error : '',loading:true})

        await getProducts(user._id,token)
                       .then(data => {
                           if(data.error){
                           setValues({error : data.error,loading:false})
                           }
                           else {
                               setProducts(data)
                           setValues({error : '',loading:false})

                           }
                       })
                       .catch(err => { 
                                 setValues({error : err,loading:false})
   
                                           })


}

useEffect(()=>{
  fetchProducts()
},[])

const {loading} = values

    return (
        <div className = 'w-75 m-auto  ' style ={{zIndex : '10'}}>
            {loading && <div className='fs-3 text-secondary text-center'>Loading...</div>}
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