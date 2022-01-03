const staff = require('../models/staff')
const Staff = require('../models/staff')

exports.getStaffById = (req,res,next,id) => {
    staff.findById(id)
         .populate('address')
         .exec((err,client) => {
                if(err)return res.status(400).json(
                    {error : "Client not found"}
                )
                req.profile = client;
                next();
            })
}
exports.createStaff = (req,res) => {    
       
    let staff = new Staff(req.body);
        staff.save((err,staff) => {
            if(err)return res.status(400).json(
                {message : `${err}`});
            
               res.status(200).json(staff);
        })        

};
exports.deleteStaff = (req,res)=> {
    let staff = req.staff;
    Staff.remove((err,staff)=> {
        if(err) return res.status(400).json(
            {message :"failed to delete the staff"})
         res.json({message : "deleted staff : ${staff"})
        })
}
exports.updateStaff = (req,res) => {   
    
    Staff.findOneAndUpdate({_id : req.body._id},{...req.body},{new : true},(error,staff) => {
       if(error)return res.status(400).json(
          {message : "Could not update staff in DB "});
          res.json(staff);
   })
}
exports.getAllStaff = (req,res) => { 
   

    Staff.find()
         .populate('address')                 
          .exec((err,staff) => {
              if(err)return res.status(400).json({message : "Failed to fetch data"})

             res.json(staff);
          })
};