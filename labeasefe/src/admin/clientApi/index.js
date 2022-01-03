import {API} from '../../backend'





export const createClient = (userId,token,client) => {

    console.log("Client received in API :",JSON.stringify(client))
       
      return  fetch(`${API}/clients/create/${userId}`,{
            method : "POST",
            headers : {
                     
                "content-Type" : "application/json",             
                Authorization : `Bearer ${token}`
            },
            body:JSON.stringify(client) 
          }).then(response => {
                
                return response;
            })
            .catch(err =>{
              
                return (err)
            } )
         
};

export const getClients = (userId,token) => {
    
    
    return fetch(`${API}/clients/${userId}`,{
        method : 'GET',
        headers:{
            'Content-Type' : 'application/json',
            Authorization : `Bearer ${token}`

        }

    }).then(response => {
                return response.json()
            })
      .catch(err => {return(err)})
}

export const updateClient = (userId,token,client) => {

   
       return fetch(`${API}/update/clients/${userId}`,{
           method: "PUT",
           headers : {
               Accept : 'application/json',
               "content-Type" : "application/json",  
               Authorization : `Bearer ${token}`
           },
           body : JSON.stringify(client)
       }).then(response => {return response})
         .catch(err => {return(err)})
}

export const deleteClient = (clientId,userId,token) => {
 
   return fetch(`${API}/clients/${userId}`,{
       method:"DELETE",
       headers :{
           Authorization : `Bearer ${token}`
       }
   }).then(response => {return response.json()})
     .catch(err=> console.log(err))
}

export const getNextOrderSequence = () => {
    return fetch(`${API}/ordercounter`,{
        method : 'GET',
        headers:{
            'Content-Type' : 'application/json',
            
        }

    }).then(response => {
                return response.json()
            })
      .catch(err => {return(err)})

} 
export const getNextClientSequence = () => {
    return fetch(`${API}/clientcounter`,{
        method : 'GET',
        headers:{
            'Content-Type' : 'application/json',
            
        }

    }).then(response => {
                return response.json()
            })
      .catch(err => {return(err)})

} 
export const getNextInvoiceSequence = () => {

    return fetch(`${API}/invoicecounter`,{
        method : 'GET',
        headers:{
            'Content-Type' : 'application/json',
            
        }

    }).then(response => {
                return response.json()
            })
      .catch(err => {return(err)})

} 
export const getNextReceiptSequence = () => {

    return fetch(`${API}/receiptcounter`,{
        method : 'GET',
        headers:{
            'Content-Type' : 'application/json',
            
        }

    }).then(response => {
                return response.json()
            })
      .catch(err => {return(err)})

} 
export const getNextAdjustmentSequence = () => {
    
    return fetch(`${API}/adjustmentcounter`,{
        method : 'GET',
        headers:{
            'Content-Type' : 'application/json',
        }
    }).then( response => {       
            return response.json()
        })
       .catch(err=>{return(err)}) 
   
}

export const createOrder = (userId,token,order) => {
    console.log("Order received in api :",order)
       
    return  fetch(`${API}/orders/create/${userId}`,{
          method : "POST",
          headers : {
              Accept : 'application/json',           
              "content-Type" : "application/json",             
              Authorization : `Bearer ${token}`
          },
          body:JSON.stringify(order) 
        }).then(response => {
              
              return response;
          })
          .catch(err =>{
            
              return (err)
          } )
       
};

export const updateOrder = (userId,token,order) => {

   
    return fetch(`${API}/update/orders/${userId}`,{
        method: "PUT",
        headers : {
            Accept : 'application/json',
            "content-Type" : "application/json",  
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(order)
    }).then(response => {return response})
      .catch(err => {return(err)})
}

export const getOrders = (userId,token) => {
    
    return fetch(`${API}/orders`,{
        method : 'GET',
        headers:{
            Authorization : `Bearer ${token}`

        }

    }).then(response => {
                return response.json()
            })
      .catch(err => {return(err)})
}
export const deleteOrder = (orderId,userId,token) => {
 
    return fetch(`${API}/orders/${userId}`,{
        method:"DELETE",
        headers :{
            Authorization : `Bearer ${token}`
        }
    }).then(response => {return response.json()})
      .catch(err=> console.log(err))
 }
 





export const  createProductType  = (userId,token,productType) => {
  
       
    return  fetch(`${API}/producttypes/create/${userId}`,{
          method : "POST",
          headers : {
                   
              "content-Type" : "application/json",             
              Authorization : `Bearer ${token}`
          },
          body:JSON.stringify(productType) 
        }).then(response => {
              
              return response;
          })
          .catch(err =>{
            
              return (err)
          } )
}

export const getProductTypes = () => {


    return fetch(`${API}/producttypes`,{
        method : 'GET',
        // headers:{
        //     'Content-Type' : 'application/json',
        //     }

    }).then(response => {
                return response.json()
            })
      .catch(err => {return(err)})
}

export const updateProductType = (userId,token,productType) => {

    // console.log("Product in index : ",productType)
    return fetch(`${API}/producttypes/update/${userId}`,{
        method: "PUT",
        headers : {
            Accept : 'application/json',
            "content-Type" : "application/json",  
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(productType)
    }).then(response => {return response})
      .catch(err => {return(err)})
}

export const deleteProductType = (productType,userId,token) => {
    
 
    return fetch(`${API}/producttypes/delete/${userId}`,{
        method:"DELETE",
        headers :{
            Accept : 'application/json',
            "content-Type" : "application/json", 
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(productType)
    }).then(response => {return response.json()})
      .catch(err=> console.log(err))
 }
 
 export const createProduct = (userId,token,product) => {
     console.log("Product Received in index to save ",product)

     return  fetch(`${API}/products/create/${userId}`,{
        method : "POST",
        headers : {
                 
            "content-Type" : "application/json",             
            Authorization : `Bearer ${token}`
        },
        body:JSON.stringify(product) 
      }).then(response => {
            
            return response;
        })
        .catch(err =>{
          
            return (err)
        } )

 }
 export const getProducts = (userId,token) => {
 
     return fetch(`${API}/products/${userId}`,{
         method : 'GET',
         headers:{
             'Content-Type' : 'application/json',
             Authorization : `Bearer ${token}`
 
         }
 
     }).then(response => {
                 return response.json()
             })
       .catch(err => {return(err)})
     
  }
 
export const updateProduct = (userId,token,product) => {
    

    return  fetch(`${API}/products/update/${userId}`,{
       method : "PUT",
       headers : {
            Accept : 'application/json',                
           "content-Type" : "application/json",             
           Authorization : `Bearer ${token}`
       },
       body:JSON.stringify(product) 
     }).then(response => {
           
           return response;
       })
       .catch(err =>{
         
           return (err)
       } )
    }

    export const deleteProduct = (userId,token,product) => {
        console.log("In API Deleteproduct call")

        return fetch(`${API}/products/delete/${userId}`,{
            method:"DELETE",
            headers :{
                Accept : 'application/json',
                "content-Type" : "application/json", 
                Authorization : `Bearer ${token}`
            },
            body : JSON.stringify(product)
        }).then(response => {return response.json()})
          .catch(err=> console.log(err))

    }



    export const getCategories = () => {
        return fetch(`${API}/category`,{
            method : 'GET',
            // headers:{
            //     'Content-Type' : 'application/json',
            //     }
    
        }).then(response => {
                    return response.json()
                })
          .catch(err => {return(err)})
    } 
    export const createCategory = (userId,token,category) => {
       
   
        return  fetch(`${API}/category/create`,{
           method : "POST",
           headers : {
                    
               "content-Type" : "application/json",             
               Authorization : `Bearer ${token}`
           },
           body:JSON.stringify(category) 
         }).then(response => {
               
               return response;
           })
           .catch(err =>{
             
               return (err)
           } )
   
    }
    /////////////////////INVOICES

    export const createInvoice = (userId,token,invoice) => {
        console.log("Order received in api :",invoice)
           
        return  fetch(`${API}/invoices/create/${userId}`,{
              method : "POST",
              headers : {
                  Accept : 'application/json',           
                  "content-Type" : "application/json",             
                  Authorization : `Bearer ${token}`
              },
              body:JSON.stringify(invoice) 
            }).then(response => {
                  
                  return response;
              })
              .catch(err =>{
                
                  return (err)
              } )
           
    };
    
    export const getInvoices = () => {

        return fetch(`${API}/invoices`,{
            method : 'GET',           
    
        }).then(response => {
                    return response.json()
                })
          .catch(err => {return(err)})
    }
    export const getInvoicesByClientId = (clientId) => {

        return fetch(`${API}/invoices/${clientId}`,{
            method : 'GET',           
                               
    
        }).then(response => {
                    return response.json()
                })
          .catch(err => {return(err)})

    }
   export const updateInvoice = (userId,token,invoice) => {
       console.log("invoice to ne updates in api :",invoice)
    return  fetch(`${API}/update/invoices/${userId}`,{
        method : "PUT",
        headers : {
             Accept : 'application/json',                
            "content-Type" : "application/json",             
            Authorization : `Bearer ${token}`
        },
        body:JSON.stringify(invoice) 
      }).then(response => {
            
            return response;
        })
        .catch(err =>{
          
            return (err)
        } )

   } 

    export const getUnpaidInvoices = () => {
        return fetch(`${API}/invoices/unpaid`,{
            method : 'GET',           
    
        }).then(response => {
                    return response.json()
                })
          .catch(err => {return(err)})
    }
export const getPaidInvoices = () => {
        return fetch(`${API}/invoices/paid`,{
            method : 'GET',           
    
        }).then(response => {
                    return response.json()
                })
          .catch(err => {return(err)})
    }
export const getCancelledInvoices = () => {
        return fetch(`${API}/invoices/cancelled`,{
            method : 'GET',           
    
        }).then(response => {
                    return response.json()
                })
          .catch(err => {return(err)})
    }

/////////////////////////////////////////////////RECEIPTS

    export const getAllReceipts = () => {

        return fetch(`${API}/receipts`,{
            method : 'GET',           
    
        }).then(response => {
                    return response.json()
                })
          .catch(err => {return(err)})
    }


    export const createReceipt = (userId,token,receipt) => {
        console.log("Receipt received in api :",receipt)
           
        return  fetch(`${API}/receipts/create/${userId}`,{
              method : "POST",
              headers : {
                  Accept : 'application/json',           
                  "content-Type" : "application/json",             
                  Authorization : `Bearer ${token}`
              },
              body:JSON.stringify(receipt) 
            }).then(response => {
                  
                  return response;
              })
              .catch(err =>{
                
                  return (err)
              } )           
    };
    export const updateReceipt = (userId,token,receipt) => {
        return  fetch(`${API}/receipt/update/${userId}`,{
            method : "PUT",
            headers : {
                 Accept : 'application/json',                
                "content-Type" : "application/json",             
                Authorization : `Bearer ${token}`
            },
            body:JSON.stringify(receipt) 
          }).then(response => {
                
                return response;
            })
            .catch(err =>{
              
                return (err)
            } )
    
       } 

       export const deleteReceipt = (userId,token,receipt) => {
        

        return fetch(`${API}/receipts/delete/${userId}`,{
            method:"DELETE",
            headers :{
                Accept : 'application/json',
                "content-Type" : "application/json", 
                Authorization : `Bearer ${token}`
            },
            body : JSON.stringify(receipt)
        }).then(response => {return response.json()})
          .catch(err=> {  return(err)})

    }

    /////ADJUSTMENTS/////////////////////////////////////
    
    export const createAdjustment = (userId,token,adjustment) => {
        console.log("Receipt received in api :",adjustment)
           
        return  fetch(`${API}/adjustments/create/${userId}`,{
              method : "POST",
              headers : {
                  Accept : 'application/json',           
                  "content-Type" : "application/json",             
                  Authorization : `Bearer ${token}`
              },
              body:JSON.stringify(adjustment) 
            }).then(response => {
                  
                  return response;
              })
              .catch(err =>{
                
                  return (err)
              } )           
    };
export const getAdjustmentByNumber = (adjustmentNo) => {
    return fetch(`${API}/adjusment/:${adjustmentNo}`,{
          method : 'GET',
    }).then(response =>{
        return response.json()
    })
    .catch(err => {return(err)})
}

  export const getAllAdjustments =  () => {

        return fetch(`${API}/adjustments`,{
            method : 'GET',           
    
        }).then(response => {
                    return response.json()
                })
          .catch(err => {return(err)})
    }

    export const deleteAdjustment = async (userId,token,adjustment) => {
        

        return  await fetch(`${API}/adjustments/delete/${userId}`,{
            method:"DELETE",
            headers :{
                Accept : 'application/json',
                "content-Type" : "application/json", 
                Authorization : `Bearer ${token}`
            },
            body : JSON.stringify(adjustment)
        }).then(response => {return response.json()})
          .catch(err=> {  return(err)})

    }
    ///enclosures
    export const createEnclosure = async  (userId,token,enclosure) => {
        
           
        return  await fetch(`${API}/enclosures/create/${userId}`,{
              method : "POST",
              headers : {
                  Accept : 'application/json',           
                  "content-Type" : "application/json",             
                  Authorization : `Bearer ${token}`
              },
              body:JSON.stringify(enclosure) 
            }).then(response => {
                  
                  return response;
              })
              .catch(err =>{
                
                  return (err)
              } )           
    };
    export const updateEnclosure = async (userId,token,enclosure) => {
        return await fetch(`${API}/enclosures/update/${userId}`,{
            method : "PUT",
            headers : {
                 Accept : 'application/json',                
                "content-Type" : "application/json",             
                Authorization : `Bearer ${token}`
            },
            body:JSON.stringify(enclosure) 
          }).then(response => {
                
                return response;
            })
            .catch(err =>{
              
                return (err)
            } )
    
       } 
       export const getAllEnclosures =  () => {

        return fetch(`${API}/enclosures`,{
            method : 'GET',           
    
        }).then(response => {
                    return response.json()
                })
          .catch(err => {return(err)})
    }
    export const deleteEnclosure = async (userId,token,enclosure) => {
        return await fetch(`${API}/enclosures/delete/${userId}`,{
            method : 'DELETE',
            headers : {
                Accept : 'applicaiton/json',
                "content-Type":'application/json',
                Authorization :`Bearer ${token}`
            },
           body : JSON.stringify(enclosure)
        }).then(response => {
            return response
        }).catch(err => {
            return (err)
        })
            
  }
     ///priorities
     export const createPriority = async  (userId,token,priority) => {
      
           
        return  await fetch(`${API}/priorities/create/${userId}`,{
              method : "POST",
              headers : {
                  Accept : 'application/json',           
                  "content-Type" : "application/json",             
                  Authorization : `Bearer ${token}`
              },
              body:JSON.stringify(priority) 
            }).then(response => {
                  
                  return response;
              })
              .catch(err =>{
                
                  return (err)
              } )           
    };
    export const updatePriority = async (userId,token,priority) => {
        return await fetch(`${API}/priorities/update/${userId}`,{
            method : "PUT",
            headers : {
                 Accept : 'application/json',                
                "content-Type" : "application/json",             
                Authorization : `Bearer ${token}`
            },
            body:JSON.stringify(priority) 
          }).then(response => {
                
                return response;
            })
            .catch(err =>{
              
                return (err)
            } )
    
       } 
       export const getAllPriorities =  () => {

        return fetch(`${API}/priorities`,{
            method : 'GET',           
    
        }).then(response => {
                    return response.json()
                })
          .catch(err => {return(err)})
    }
    export const deletePriority = async (userId,token,priority) => {
        return await fetch(`${API}/priorities/delete/${userId}`,{
            method : 'DELETE',
            headers : {
                Accept : 'applicaiton/json',
                "content-Type":'application/json',
                Authorization :`Bearer ${token}`
            },
           body : JSON.stringify(priority)
        }).then(response => {
            return response
        }).catch(err => {
            return (err)
        })
            
  }
     ///categories//client categories
     export const createClientCategory = async  (userId,token,category) => {
       
           
        return  await fetch(`${API}/clientcategories/create/${userId}`,{
              method : "POST",
              headers : {
                  Accept : 'application/json',           
                  "content-Type" : "application/json",             
                  Authorization : `Bearer ${token}`
              },
              body:JSON.stringify(category) 
            }).then(response => {
                  
                  return response;
              })
              .catch(err =>{
                
                  return (err)
              } )           
    };
    export const updateClientCategory = async (userId,token,category) => {
        return await fetch(`${API}/clientcategories/update/${userId}`,{
            method : "PUT",
            headers : {
                 Accept : 'application/json',                
                "content-Type" : "application/json",             
                Authorization : `Bearer ${token}`
            },
            body:JSON.stringify(category) 
          }).then(response => {
                
                return response;
            })
            .catch(err =>{
              
                return (err)
            } )
    
       } 
       export const getAllClientCategories =  () => {

        return fetch(`${API}/clientcategories`,{
            method : 'GET',           
    
        }).then(response => {
                    return response.json()
                })
          .catch(err => {return(err)})
    }
    export const deleteClientCategory = async (userId,token,category) => {
        return await fetch(`${API}/clientcategories/delete/${userId}`,{
            method : 'DELETE',
            headers : {
                Accept : 'applicaiton/json',
                "content-Type":'application/json',
                Authorization :`Bearer ${token}`
            },
           body : JSON.stringify(category)
        }).then(response => {
            return response
        }).catch(err => {
            return (err)
        })
            
  }

     ///client Price Bands
     export const createPriceband = async  (userId,token,priceband) => {
       
           
        return  await fetch(`${API}/pricebands/create/${userId}`,{
              method : "POST",
              headers : {
                  Accept : 'application/json',           
                  "content-Type" : "application/json",             
                  Authorization : `Bearer ${token}`
              },
              body:JSON.stringify(priceband) 
            }).then(response => {
                  
                  return response;
              })
              .catch(err =>{
                
                  return (err)
              } )           
    };
    export const updatePriceband = async (userId,token,priceband) => {
        return await fetch(`${API}/pricebands/update/${userId}`,{
            method : "PUT",
            headers : {
                 Accept : 'application/json',                
                "content-Type" : "application/json",             
                Authorization : `Bearer ${token}`
            },
            body:JSON.stringify(priceband) 
          }).then(response => {
                
                return response;
            })
            .catch(err =>{
              
                return (err)
            } )
    
       } 
       export const getAllPricebands =  () => {

        return fetch(`${API}/pricebands`,{
            method : 'GET',           
    
        }).then(response => {
                    return response.json()
                })
          .catch(err => {return(err)})
    }

    export const deletePriceband = async (userId,token,priceband) => {
          return await fetch(`${API}/pricebands/delete/${userId}`,{
              method : 'DELETE',
              headers : {
                  Accept : 'applicaiton/json',
                  "content-Type":'application/json',
                  Authorization :`Bearer ${token}`
              },
              body : JSON.stringify(priceband)      
          }).then(response => {
              return response
          }).catch(err => {
              return (err)
          })
              
    }

    ///////////////////Payment Mode
    export const createPaymentMode =  async (userId,token,mode) => {
      return await fetch(`${API}/paymentmodes/create/${userId}`,{
            method : 'POST',
            headers : {
            Accept : 'application/json',           
            "content-Type" : "application/json",             
            Authorization : `Bearer ${token}`
            },
            body : JSON.stringify(mode)
      })
      .then(response => {
                  
        return response;
    })
    .catch(err =>{
      
        return (err)
    } )          
         
    }
    export const updatePaymentMode = async (userId,token,mode) => {
        return await fetch(`${API}/paymentmodes/update/${userId}`,{
            method : "PUT",
            headers : {
                 Accept : 'application/json',                
                "content-Type" : "application/json",             
                Authorization : `Bearer ${token}`
            },
            body:JSON.stringify(mode) 
          }).then(response => {
                
                return response;
            })
            .catch(err =>{
              
                return (err)
            } )
    
       } 
    export const deletePaymentMode = async (userId,token,mode) => {
        return await fetch(`${API}/paymentmodes/delete/${userId}`,{
            method : 'DELETE',
            headers : {
                Accept : 'applicaiton/json',
                "content-Type":'application/json',
                Authorization :`Bearer ${token}`
            },
            body : JSON.stringify(mode)      
        }).then(response => {
            return response
        }).catch(err => {
            return (err)
        })
            
  }
  export const getAllPaymentModes =  () => {

    return fetch(`${API}/paymentmodes`,{
        method : 'GET',           

    }).then(response => {
                return response.json()
            })
      .catch(err => {return(err)})
}
//////UPI settings
export const getAllUPI =  () => {

    return fetch(`${API}/upi`,{
        method : 'GET',           

    }).then(response => {
                return response.json()
            })
      .catch(err => {return(err)})
}
export const createUPI =  async (userId,token,upi) => {
    return await fetch(`${API}/upi/create/${userId}`,{
          method : 'POST',
          headers : {
          Accept : 'application/json',           
          "content-Type" : "application/json",             
          Authorization : `Bearer ${token}`
          },
          body : JSON.stringify(upi)
    })
    .then(response => {
                
      return response;
  })
  .catch(err =>{
    
      return (err)
  } )          
       
  }
  export const updateUPI = async (userId,token,upi) => {
    return await fetch(`${API}/upi/update/${userId}`,{
        method : "PUT",
        headers : {
             Accept : 'application/json',                
            "content-Type" : "application/json",             
            Authorization : `Bearer ${token}`
        },
        body:JSON.stringify(upi) 
      }).then(response => {
            
            return response;
        })
        .catch(err =>{
          
            return (err)
        } )

   } 

   ////////////////Staff 

   export const createStaff = async  (userId,token,staff) => {
      
           
    return  await fetch(`${API}/staff/create/${userId}`,{
          method : "POST",
          headers : {
              Accept : 'application/json',           
              "content-Type" : "application/json",             
              Authorization : `Bearer ${token}`
          },
          body:JSON.stringify(staff) 
        }).then(response => {
              
              return response;
          })
          .catch(err =>{
            
              return (err)
          } )           
};
export const updateStaff = async (userId,token,staff) => {
    return await fetch(`${API}/staff/update/${userId}`,{
        method : "PUT",
        headers : {
             Accept : 'application/json',                
            "content-Type" : "application/json",             
            Authorization : `Bearer ${token}`
        },
        body:JSON.stringify(staff) 
      }).then(response => {
            
            return response;
        })
        .catch(err =>{
          
            return (err)
        } )

   } 
   export const getAllStaff =  () => {

    return fetch(`${API}/staff`,{
        method : 'GET',           

    }).then(response => {
                return response.json()
            })
      .catch(err => {return(err)})
}
export const deleteStaff = async (userId,token,staff) => {
    return await fetch(`${API}/staff/delete/${userId}`,{
        method : 'DELETE',
        headers : {
            Accept : 'applicaiton/json',
            "content-Type":'application/json',
            Authorization :`Bearer ${token}`
        },
       body : JSON.stringify(staff)
    }).then(response => {
        return response
    }).catch(err => {
        return (err)
    })
        
}