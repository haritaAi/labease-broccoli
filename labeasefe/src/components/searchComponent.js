import React,{useState} from 'react';
import {getDatePickerFormatDate} from '../components/DateAPI'
const SearchComponent = ({data,onUpdate,searchField}) => {

    const [dateFilter,setDateFilter] = useState(0)     
    const [dateInterval,setDateInterval] = useState({
    startDate :new Date(),
    endDate : new Date()
  })

const filterdata = (startDate,endDate) => {
       let startTime = new Date(startDate).getTime()
       let endTime = new Date(endDate).getTime()
         
      //  console.log(`Start time : ${startTime}, end Time : ${endTime} & searchField is ${searchField}`)
       let newData = data.filter(item => new Date(item[searchField]).getTime() > startTime &&  
                                         new Date(item[searchField]).getTime() < endTime )
        
       onUpdate(newData)
}

const handleDates = name => event => {
  let val = event.target.value
  setDateInterval({...dateInterval,[name]: val})
   if(name === 'startDate'){ 
     let sDate = new Date(new Date(val).getFullYear(),new Date(val).getMonth(),new Date(val).getDate())
     let temp = dateInterval.endDate
     let eDate = new Date(new Date(temp).getFullYear(),new Date(temp).getMonth(),new Date(temp).getDate()+1)
     
       filterdata(sDate,eDate)
        }
   else if(name === 'endDate'){

     let temp = dateInterval.startDate
    let sDate = new Date(new Date(temp).getFullYear(),new Date(temp).getMonth(),new Date(temp).getDate())
    let eDate = new Date(new Date(val).getFullYear(),new Date(val).getMonth(),new Date(val).getDate()+1)
    
    filterdata(sDate,eDate)
   }
  }
const handleSelectedFilter = e => {
    let val = e.target.value  
    
    let today = new Date()
    let start = new Date()
    let end = new Date()
    switch (val) {
      case  '0':{//last 7 days by default 
         start = new Date(today.getFullYear(),today.getMonth(),today.getDate()-7)
         end = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1)
         setDateInterval({startDate : start,endDate : end })  
         filterdata(start,end)
         break;   
       }
       case  '1':{//recent (10days)
        start = new Date(today.getFullYear(),today.getMonth(),today.getDate()-10)
        end = new Date(today.getFullYear(),today.getMonth(),today.getDate()-1)
        setDateInterval({startDate : start, endDate : end })  
        filterdata(start,end)
        break;   
      }
      case '2':{//today
        start = new Date()
        end = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1)
        setDateInterval({startDate: new Date()})
        filterdata(start,end)        
        break;
      }
      case '3':{//yesterday
        start = new Date(today.getFullYear(),today.getMonth(),today.getDate()-2)
        end = new Date(today.getFullYear(),today.getMonth(),today.getDate()-1)
        setDateInterval({startDate: new Date(today.getFullYear(),today.getMonth(),today.getDate()-1)})
        filterdata(start,end)       
        break;
      }
      case '4':{//This Week from Sunday
          let thisday = today.getDay()
          start = new Date(today.getFullYear(),today.getMonth(),today.getDate()-thisday)
          end = new Date()
          setDateInterval({startDate: start,
                            endDate : end
                             })
           filterdata(start,end)        

           break;
      }
      case '5':{//Month to Date    
        let start = new Date()
        start.setDate(1)
        end = new Date()     
        setDateInterval({startDate: start,
                          endDate : end
                           })
        
        filterdata(start,end)        
        
        break;
      }
      case '6':{//Last 7 days
        start = new Date(today.getFullYear(),today.getMonth(),today.getDate()-7)
        end =  new Date()
        setDateInterval({startDate : start,endDate : end  })        
        filterdata(start,end)        
        break;
      }
      case '7':{//Last Full week       
         
        start = new Date(today.getFullYear(),today.getMonth(),(today.getDate()-(7-today.getDay()))-6)
        end = new Date(today.getFullYear(),today.getMonth(),today.getDate()-(7-today.getDay())) // last saturday
        setDateInterval({startDate : start , endDate : end})
        filterdata(start,end)        
        break;
      }
      case '8':{//Last Full Month         
        const days = new Date(today.getFullYear(),today.getMonth()+1,0)   
        start =   new Date(today.getFullYear(),today.getMonth()-1,1)
        end =  new Date(today.getFullYear(),today.getMonth()-1,days.getDate()-1)
        setDateInterval({startDate : start,
                         endDate : end})
        filterdata(start,end)        
        break;
      }
      case '9':{//Last 30 Days
        let start = new Date(today.getFullYear(),today.getMonth(),today.getDate()-30)
        let end = new Date(today.getFullYear(),today.getMonth(),today.getDate())
        setDateInterval({startDate : start,
          endDate : end })
          filterdata(start,end)        
          break;
      }
      case '10':{//Year To Date
        start = new Date(today.getFullYear(),0,1)
        end = new Date(today.getFullYear(),today.getMonth(),today.getDate())
        setDateInterval({startDate : start, endDate : end })
          filterdata(start,end)        
          break;
      }
      case '11':{//Finacial Year To Date
       
        if(today.getMonth() >= 3){
          start = new Date(today.getFullYear(),3,1)
          end = new Date(today.getFullYear(),today.getMonth(),today.getDate())
          setDateInterval({startDate : start,
            endDate : end })
            
        }
        else {
          start = new Date(today.getFullYear()-1,3,1)
          end = new Date(today.getFullYear(),today.getMonth(),today.getDate())
          setDateInterval({startDate : start,
            endDate : end })
        }
        filterdata(start,end)        
        break;
      }
      case '12':{//Last 6 Months
         start = new Date(today.getFullYear(),today.getMonth()-6,today.getDate())
         end = new Date(today.getFullYear(),today.getMonth(),today.getDate())
        setDateInterval({startDate :  start,endDate : end })
          filterdata(start,end)        
          break;
      }
      case '13':{//Last 12 Months
        start = new Date(today.getFullYear()-1,today.getMonth(),today.getDate())
        end = new Date(today.getFullYear(),today.getMonth(),today.getDate())
        setDateInterval({startDate : start, endDate : end })
          filterdata(start,end)        
          break;
      }
      case '14':{//All Dates to yesterday
        let thisDay = new Date()
                 thisDay.setDate(1)
                 thisDay.setMonth(0)
                 thisDay.setYear(2021)   
        start = new Date(thisDay)
        end = new Date(today.getFullYear(),today.getMonth(),today.getDate()-1)
        setDateInterval({startDate: start, endDate:end})
        filterdata(start,end)        
        break;
      }
      case '15':{//All Dates to Today
        let thisDay = new Date()
        thisDay.setDate(1)
        thisDay.setMonth(0)
        thisDay.setYear(2021)   
        start = new Date(thisDay)
        setDateInterval({endDate:new Date(today.getFullYear(),today.getMonth(),today.getDate())})      
        filterdata(start,end)        
        break;
      }
       default:
        setDateInterval({startDate : new Date(),endDate : new Date() })  
  
        filterdata(start,end)        
        break;
     }
     setDateFilter(val)
  } 


    return (
        <div>
            <div className='fs-4'>Search filters</div>
          <select onChange={handleSelectedFilter}
                  className='fs-4 '
                  >
            <option value = {0}>Custom</option> 
            <option value = {1}>Recent</option> 
            <option value = {2}>Today</option> 
            <option value = {3}>yesterday</option> 
            <option value = {4}>This Week from Sunday</option> 
            <option value = {5}>Month To Date</option> 
            <option value = {6}>Last 7 days</option> 
            <option value = {7}>Last Full week</option> 
            <option value = {8}>Last Full Month</option> 
            <option value = {9}>Last 30 Days</option> 
            <option value = {10}>Year To Date</option> 
            <option value = {11}>Finacial Year To Date</option> 
            <option value = {12}>Last 6 Months</option> 
            <option value = {13}>Last 12 Months</option> 
            <option value = {14}>All Dates to yesterday</option> 
            <option value = {15}>All Dates to Today</option> 
          </select>
          {dateFilter>=14 && <div style = {{display:'inline',marginLeft : '10px'}}>Up To</div>}
          <input type = 'date'
                 className='fs-4 mx-3'   
                 disabled = {dateFilter>0?true:false}   
                 style ={{display : (dateFilter>=14)?'none': 'inline' }}
                 value = {getDatePickerFormatDate(dateInterval.startDate)}            
                 onChange = {handleDates('startDate')} 
                  />
          <input type = 'date' 
                 className='fs-4 mx-3' 
                 disabled = {dateFilter>0?true:false}
                 style ={{display : (dateFilter>1&& dateFilter<4)?'none': 'inline' }}
                 value = {getDatePickerFormatDate(dateInterval.endDate)} 
                 onChange = {handleDates('endDate')} 
                  />  
        </div>
    );
}

export default SearchComponent;