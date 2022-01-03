import {API} from '../backend';


export const signup = user => {
    
    return  fetch(`${API}/signup`,{
        method:"POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
  
    return  fetch(`${API}/signin`,{
        method:"POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const authenticate = (data,next) => {
    if(typeof window !== "undefined"){
         localStorage.setItem("jwt",JSON.stringify(data));
         next();
    }
};


export const signout = next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        
        next();
     return fetch(`${API}/signout`,{
            method : "GET"
        })
        .then(response => {
            return response.status(200).json("Signed out successfully")
        })
        .catch(err => {return err});
   }
};
export const isAuthenticated = () => {
       if(typeof window == "undefined")
            return false;

        if(localStorage.getItem("jwt"))
            return JSON.parse(localStorage.getItem("jwt"));
            
         else return false;
};    
export const resetpswd = email => {
    
   return fetch(`${API}/resetpswd`,{
        method : 'POST',
        headers:{
             Accept : "application/json",
            "Content-Type" : "application/json"
    
    },
    body: JSON.stringify(email)
       })
       .then(response => {
             if(response.status === 400) window.alert("this email does not exist")
             return response.json({error : "error"})
         })
        .catch(err => {
            console.log("Error :",err)
            return err
        });
            
}
export  const setNewPassword = async (id,token,values) => {
    
  return await fetch(`${API}/resetpswd/${id}/${token}`,{
            method: 'POST',
            headers:{
                Accept : "application/json",
                "Content-Type" : "application/json" 
            },
            body:JSON.stringify(values)
    })
    .then( response => {
        
        return response.status
    })
    .catch(err => {
        return err
    })
}