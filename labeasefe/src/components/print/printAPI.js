

export const addToPrint = (invoice) => {
 
    if(typeof window !== undefined){
              localStorage.setItem("invoice",JSON.stringify(invoice));
            
    }

}

export const getToPrint = () => {
   let invoice = {}
    if(typeof window !== undefined){
                invoice =  JSON.parse(localStorage.getItem('invoice'))
                localStorage.removeItem('invoice')
                 return invoice
            }
}

export const addToPrintReceipt = (receipt) => {
    if(typeof window !== undefined){
        localStorage.setItem("receipt",JSON.stringify(receipt));
      
}
}
export const getToPrintReceipt = () => {
    let receipt = {}
     if(typeof window !== undefined){
                 receipt =  JSON.parse(localStorage.getItem('receipt'))
                //  localStorage.removeItem('receipt')
                  return receipt
             }
 }