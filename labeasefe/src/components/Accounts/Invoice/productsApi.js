const getIndex = (tooth) =>{

    return tooth.slice(1)
}

const getArch = (tooth) =>{
   
     return tooth.slice(0,1)
}


export const getTeethArchset = (teethArray) => {
    const teeth = []
    

    if(teethArray.length>0){
          teethArray.forEach((tooth,index) => {
                        let arch =   getArch(tooth)
                        let val = getIndex(tooth)
                           
                       
                        if(arch == '1')
                        {
                            teeth[1] = (teeth[1]?teeth[1] :'') + '' + val
                        }
                        else if(arch == '2') 
                               teeth[2] = (teeth[2]?teeth[2] :'') + ''+ val

                        else if(arch == '3')  
                                teeth[3]  = (teeth[3]?teeth[3] :'') + ''+ val
                        else if(arch == '4')  teeth[4]  = (teeth[4]?teeth[4]:'') + ''+ val
        
                    })        
        
         
    }
    return teeth
}