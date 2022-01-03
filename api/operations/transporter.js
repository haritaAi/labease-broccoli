
const nodemailer = require('nodemailer')

let  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {     
      user: 'haritabiju@gmail.com',
      pass: 'Baltyres123*',      
    },
   });

   