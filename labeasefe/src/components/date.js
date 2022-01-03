export const getToDate = () =>{
 
    const ToDate = new Date()
    let day , month, year
    day = ToDate.getDate()
    month = ToDate.getMonth()+1
    year = ToDate.getFullYear() 
    
   return `${year}-${month}-${day}`

}