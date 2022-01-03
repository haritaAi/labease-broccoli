export const  getMonthName = monthNumber => {
 
   const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
   return months[monthNumber] 
}

export const getWeekDayName = dayNmber => {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    return days[dayNmber]
}
export const getFormatDate = (dateString) => {
    if(dateString){

    
    let newDate = new Date(dateString)
    let year = newDate.getFullYear()
    let month = getMonthName(newDate.getMonth())
    let date = newDate.getDate()
    
     return `${date} ${month} ${year}`
    }
}
///returns 1 if date1 is greater than date2  (date 1 is  recent )
// returns 0 if both the dates are same
///returns -1 if date1 is less than date2
export const compareDate = (datestring1,datestring2) => {
    let date1 = new Date(datestring1)
    let date2 = new Date(datestring2)
    let year1 = date1.getFullYear() 
    let year2 = date2.getFullYear()
    let month1 = date1.getMonth()
    let month2 = date2.getMonth()
    let dateOfDate1 = date1.getDate()
    let dateOfDate2 = date2.getDate() 


    if(year1 > year2) return 1

    else if (year1 === year2){ 
        if(month1 > month2)return 1
        else if(month1 === month2){
            if(dateOfDate1 > dateOfDate2) return 1
            else if(dateOfDate1 === dateOfDate2) return 0
            else if(dateOfDate1 < dateOfDate2) return -1
        }
       else if(month1 < month2) return -1  
    } 
    
    
}
export const getDatePickerFormatDate = (dateString) => {
    if(dateString){

    
        let newDate = new Date(dateString)
        let year = newDate.getFullYear()
        let month = newDate.getMonth()+1
        let date = newDate.getDate()
        if(date<10)date = '0'+date
        if(month<10)month = '0'+month
         return `${year}-${month}-${date}`
        }
}

export const findDatesInDuration = (dates,minDate,maxDate) => {
    const minTime = new Date(minDate).getTime()
    const maxTime = new Date(maxDate).getTime()

    const newDates = dates.filter(date =>  new Date(date).getTime() <= maxTime && new Date(date).getTime() >= minTime )
    console.log("Filtered dates",newDates)
    return newDates    

}