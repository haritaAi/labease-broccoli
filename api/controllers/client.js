const {Client} = require('../models/client')
const CodeCounter = require('../models/codeCounter')


exports.getClientSequence = (req,res) => {
    CodeCounter.findOne({id:'sequencer'})
                .exec((err,seq) => {
                    if(err) return res.status(400).json({message : 'error in reading sequence'})
                    return res.status(200).json(seq)
                })
  }
  exports.getNextClientSequence = (req,res,next) => {
      
      CodeCounter.findOneAndUpdate({id:'sequencer'},{$inc:{sequence_val : 1}},{new : true},(error,sequence)=>{
          if(error) return next(error)
          
     })
     next()
    
      
  }

exports.getClientById = (req,res,next,id) => {
    Client.findById(id)
          .exec((err,client) => {
              if(err)return res.status(400).json(
                  {error : "Client not found"}
              )
              req.profile = client;
              next();
          })
};

exports.createClient = (req,res) => {
    
       
    let client = new Client(req.body);
        client.save((err,client) => {
            if(err)return res.status(400).json(
                {message : `${err}`});
            
               res.status(200).json(client);
        })
        

};

exports.getClient = (req,res)=> {

    return res.json(req.client)
};
exports.deleteClient = (req,res)=> {
    let client = req.client;
    client.remove((err,client)=> {
        if(err) return res.status(400).json(
            {message :"failed to delete the client"})
         res.json({message : "deleted client : ${client"})
        })
}

exports.updateClient = (req,res) => {   
    
    
         Client.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(error,client) => {
            if(error)return res.status(400).json(
               {message : "Could not update client in DB "});
               res.json(client);
        })
      

}

exports.getAllClients = (req,res) => {
 
    let limit = req.query.limit? parseInt(req.query.limit) : 1000;
    let sortBy = req.query.sortBy ? req.query.sortBy : "name";

    Client.find()
          .sort([[sortBy,"asc"]]) 
          .limit({limit})      
          .exec((err,clients) => {
              if(err)return res.status(400).json({message : "Failed to fetch data"})

             res.json(clients);
          })
};

