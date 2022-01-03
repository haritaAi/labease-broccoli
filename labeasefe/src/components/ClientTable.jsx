import React,{useContext,useMemo,useState} from 'react';
import Modal from '../components/Modal';
import {ColumnFilter} from './ColumnFilter';
// import Tooltip from '@material-ui/core/Tooltip';
import Tooltip from '@mui/material/Tooltip';
import ClientContext from '../context/ClientContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTable,useSortBy,useFilters,usePagination,useRowSelect} from 'react-table';
import '../css/table.css'



const  ClientTable = ({onEditClient}) => {
 
  let actionSelected , selected_client_id ;
//   const [actionSelected,setActionSelected] = useState('')
  const clients = useContext(ClientContext)
  const  [clientSelected,setClientSelected] = useState(null) 
  const [rowSelected,setRowSelected] = useState(null)   
  const [isModalOpen,setIsModalOpen] = useState(false)      
      
  const COLUMNS = [
                    {accessor : '_id', Header :'#'},
                    {accessor : 'name',  Header :'Name'},  

                    {accessor : 'phoneO',Header :'O'},
                    {accessor : 'phoneM',Header :'M'},
                    {accessor : 'location',  Header :'City'},
                    {accessor : 'email', Header :'email'},

  ]
  const GROUPED_COLUMNS = [
    {
        accessor : '', 
        Header :'#',      
        disableFilters : true
    },
    {
        accessor : '_id', 
        Header :'_id',             
        disableFilters : true
    },
    {         
        accessor : 'name',  
        Header :'Name'
    },  
    {   columns : [
            {accessor : 'phoneO',Header :'Office'},
            {accessor : 'phoneM',Header :'Mobile'},
                ],  
        Header :'Contact'},  
 
    {
        accessor : 'location',  
        Header :'City'
      },
    {   accessor : 'email', 
        Header :'email'
     },
    {   accessor : '' ,
        Header :' ',
        disableFilters : true,
        Cell : ({cell}) => (
            <div className = "w-100 col-2" >    
                 <Tooltip   title ={<h3 style = {{color:'white'}}>mail</h3>}  placement = 'left-end' arrow >      
                 <span>     
                    <FontAwesomeIcon icon = 'envelope'                             
                                    color="#5c5c5c"
                                    className = 'mx-2'                                   
                                    onClick = {()=>  {
                                                    //    setActionSelected("MAIL_CLIENT")
                                                        actionSelected =  "MAIL_CLIENT"
                                                        console.log("Action selected",actionSelected)
                                                        } }  />
                </span>
                 </Tooltip>
                 <Tooltip title ={<h3 style = {{color:'white'}}>Create Order</h3>}  placement ='top' arrow >      
                    <span>
                        <FontAwesomeIcon icon = 'box'
                                            color = "#5c5c5c"
                                            className = 'mx-2'
                                            onClick = {()=> {
                                                                // setActionSelected("CLIENT_ORDER")
                                                                actionSelected ="CLIENT_ORDER"
                                                                console.log("Action selected",actionSelected)
                                                                } } />  
                    </span>
                  </Tooltip>
                  <Tooltip title ={<h3 style = {{color:'white'}}>Edit Client</h3>}  placement ='right-start' arrow >      
                    <span>
                    
                    <FontAwesomeIcon icon = 'edit'
                                    color = "#5c5c5c"
                                    className = 'mx-2'
                                    onClick = {() => { 
                                                        //  setActionSelected("EDIT_CLIENT")
                                                        actionSelected ="EDIT_CLIENT"
                                                        console.log("Action selected",actionSelected)
                                                       
                                                         }   } />                    
                   </span>
                  </Tooltip>
        </div>                 
        )
        },


  ]
 
  const columns = useMemo(()=> GROUPED_COLUMNS,[])
  const data = useMemo(()=>clients,[]) 

  const defaultColumn = useMemo(()=>{
      return{
          Filter: ColumnFilter        
      }
  },[])
        
    const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            nextPage,
            previousPage,
            canNextPage,
            canPreviousPage,
            pageOptions,
            gotoPage,
            pageCount,
            state,
            prepareRow,
            selectedFlatRows,
                            } = useTable({
                                            columns ,
                                            data ,
                                            defaultColumn
                                           } ,
                                           useFilters,
                                           useSortBy,
                                           usePagination,
                                           useRowSelect,
                                              )

       const {pageIndex}  = state                                     
 const getPageButtons = ()=>{
     let temp = [];
     for(let i =0 ; i<pageCount;i++)
         temp.push(i+1)
    return (

        temp.map(p =><span>
                        <button className = 'btn fs-2 bg-info mx-1 '
                                value = {p-1} 
                                onClick = {(e) => gotoPage(e.target.value)} 
                                        >{' '}{p}{' '}
                        </button>
                 </span> )
    )
 }
const findClient = (id) => {
   
        
         console.log("In clientTable ",id,actionSelected)
         setClientSelected (clients.filter(c => c._id === id)[0])
       
       if(actionSelected === "EDIT_CLIENT") onEditClient(selected_client_id)
 
}


 const showClientDetailModal =()=> {
       
      console.log("Client in Modal:" ,clientSelected)
    const {name,email,phoneO,phoneM,phoneR,address1,address2,location,state} = clientSelected
   return(
       
                <Modal   onClick = {handleModalClose}>            
                                        
                                        <div className = 'row '>
                                            <div className="col-10">
                        
                                            </div>
                                            <div className="col ">
                                                <button  className = 'btn btn-secondary px-5 ' onClick = {handleModalClose}> X </button>      
                                            </div>
                        
                                        </div> 
                                        <div className = 'row'>
                                            <div className="col-3">
                        
                                            </div>
                                            <div className="col">
                                            <strong>Client Detail</strong>
                                            <div className="row">
                                                <div className="col-3">Name :</div>
                                                <div className="col-5">{name}</div>
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-3">email : </div>
                                                <div className="col-5">{email}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">Office :</div>
                                                <div className="col-5">{phoneO}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">Mobile :</div>
                                                <div className="col-5">{phoneM}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">Residence :</div>
                                                <div className="col-5">{phoneR}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-3">Address : </div>
                                                <div className="col-5">{address1}</div>
                                            </div>    
                                            <div className="row">
                                                <div className="col-3"> </div>
                                                <div className="col-5">{address2}</div>
                                            </div>       
                                            <div className="row">
                                                <div className="col-3">Location : </div>
                                                <div className="col-5">{location}</div>
                                            </div>    
                                            <div className="row">
                                                <div className="col-3">State : </div>
                                                <div className="col-5">{state}</div>
                                            </div> 
                                                
                                            </div>
                                                
                                                    
                                        </div>     
                                            
                                
                                    </Modal>
      
   )
 }
 const openModal = (row) => {
     setRowSelected(row)
     console.log("Row values :",row)
 }
 const handleModalClose = ()=> { 
            setRowSelected(null)
            setClientSelected(null) 
        }

    return (
        <div className = "conatiner ">
          {/* {clientSelected &&  showClientDetailModal()} */}
          <table {...getTableProps()}>
            <thead >
                {
                     headerGroups.map(headerGroup => (
                         <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) =>(
                                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        { column.render('Header') }
                                        <span>
                                            {column.isSorted? (column.isSortedDesc ? '▲' : '▼'):''}
                                        </span>
                                        <div>{column.canFilter ? column.render('Filter'):null}</div>
                                    </th>
                                ))
                            }
                         </tr>
                     ))
                }
                
            </thead>
            <tbody {...getTableBodyProps}>
                {
                    page.map(row => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()} onClick = {(e) => {                                                                                               
                                                            // openModal(row.values)
                                                             e.preventDefault()  
                                                            selected_client_id = row.values._id
                                                            setRowSelected(row.values)                                                           
                                                            console.log("Selected Client id :",selected_client_id)
                                                            console.log("ID Collected",row.values)
                                                            console.log("action selected in row function:",actionSelected)
                                                            findClient(row.values._id)
                                                            }}>
                                {
                                    row.cells.map(cell => {
                                        return <td {...cell.getCellProps()} >{
                                             cell.render('Cell')
                                        }</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
                
            </tbody>
          </table>
          <div className = 'text-center my-3'>
              <button className = 'btn fs-2 bg-info '
                      onClick = {() => gotoPage(0)} 
                      disabled = {!canPreviousPage}>{'<<'}
                      </button>
            
              {pageCount > 1 && (  <span>{ getPageButtons()  }  </span>  )     }
            
           

              <button className = 'btn fs-2 bg-info ' 
                      onClick = {() => gotoPage(pageCount -1)} 
                      disabled = {!canNextPage}>{'>>'}
                      </button>
          </div>
          </div>
      
    );
}

export default ClientTable;