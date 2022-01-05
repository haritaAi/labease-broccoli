import React,{useState,useContext, useEffect} from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../icons/MaterialUiIcons'
import {getClients} from '../admin/clientApi'
import UserContext from '../context/UserContext';

const ClientOrderTable = ({ onClientSelection}) =>  {

 
  const [clients,setClients] = useState([])
  const {user,token} = useContext(UserContext)
 const  [values,setValues] = useState({
   error:'',
   loading:false
 })


  const {error,loading} = values


  
    const columns = [
        {title : 'Name',field : 'name',defaultSort:'asc',cellStyle : {fontSize:'1.8rem'}},      
        {title : 'Mobile',field : 'phoneM',cellStyle : {fontSize:'1.8rem'}},
        {title : 'City',field : 'city',cellStyle : {fontSize:'1.8rem'}},
        
    ]
    const fetchClients =  async () => {
      setValues({error : '',loading : true});
    await  getClients(user._id,token)
        .then(data => {
            if(data.error){
            setValues({error : "Error fetching data",loading : false})       
            window.alert("Failed to Connect to database ")
            }
            else {
                setClients(data)
                setValues({error : '',loading : false})
            }
        })
        .catch(err => {       
                            setValues({error : err,loading: false})
                            window.alert("Failed to Connect to database ")
                          
                            })

} 
useEffect(()=>{
  fetchClients()

},[])

    return (
        <div className = 'container-fluid ' >
          {loading && <div>Loading...</div>}
        <MaterialTable columns = {columns} 
                       data = {clients}   
                       icons = {tableIcons} 
                       title = "Client Data"
                       onRowClick = {(row,data) => {
                        onClientSelection(data)
                       }}
                                           
                       options = {{filtering : true, pageSizeOptions:[10,25,50,100],
                                    pageSize : 25     
                                   ,paginationType:'stepped',exportAllData : true,
                                    padding:'dense',
                                    exportFileName : 'clientdata',addRowPosition:"first",
                                    actionsColumnIndex:6,
                                    columnsButton:true,                                   
                                    headerStyle: {
                                        backgroundColor: '#01579b',
                                        color: '#FFF',
                                        fontSize:'2rem',
                                       
                                      },
                                     style:{
                                     fontSize : '2rem'
                                   } 
                                }}
                                                   
                       />
        </div>
    );
}


export default ClientOrderTable;