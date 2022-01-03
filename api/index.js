require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser= require('body-parser')
const cookieParser= require('cookie-parser')


//add my routes here
const authRoutes  = require('./routes/auth')
const clientRoutes = require('./routes/client')
const orderRoutes = require('./routes/order')
const productRoutes = require('./routes/product')
const invoiceRoutes  = require('./routes/invoice')
const productTypeRoutes = require('./routes/producttype')
const categoryRoutes = require('./routes/category')
const orderSequenceRoutes = require('./routes/ordercounter')
const codeSequenceRoutes  = require('./routes/codecounter')
const invoiceSequenceRoutes = require('./routes/invoiceCounter')
const receiptRoutes = require('./routes/receipt')
const receiptSequenceRoutes = require('./routes/receiptCounter')
const adjustmentRoutes = require('./routes/adjustment')
const adjustmentSequenceRoutes = require('./routes/adjustmentCounter')
const enclosureRoutes = require('./routes/enclosure')
const priorityRoutes = require('./routes/priority')
const clientCategoryRoutes = require('./routes/clientCategories')
const pricebandRoutes  = require('./routes/priceband')
const paymentmodeRoutes = require('./routes/paymentmode')
const upiRoutes = require('./routes/upi')
const resetRoutes = require('./routes/pswdReset')
const staffRoutes = require('./routes/staff')

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(cookieParser())

mongoose.connect(process.env.DATABASE,{
               useNewUrlParser : true,
               useUnifiedTopology : true,                     
               
}).then( console.log("DB Connected......."))
  .catch(err => console.log("DB connection error : ",err));


  const port = process.env.PORT || 9000;

  //Routes
//Routes
app.use("/api",authRoutes);
app.use("/api",clientRoutes);
app.use("/api",orderRoutes);
app.use("/api",productRoutes);
app.use("/api",productTypeRoutes);
app.use("/api",categoryRoutes);
app.use("/api",invoiceRoutes);
app.use("/api",invoiceSequenceRoutes);
app.use("/api",orderSequenceRoutes);
app.use("/api",codeSequenceRoutes);
app.use("/api",receiptRoutes);
app.use("/api",receiptSequenceRoutes)
app.use("/api",adjustmentRoutes)
app.use("/api",adjustmentSequenceRoutes)
app.use("/api",enclosureRoutes)
app.use("/api",priorityRoutes)
app.use("/api",clientCategoryRoutes)
app.use("/api",pricebandRoutes)
app.use("/api",paymentmodeRoutes)
app.use("/api",upiRoutes)
app.use("/api",resetRoutes)
app.use("/api",staffRoutes)


app.get('/',(req,res) => res.status(200).send("hello world ! new server is ready"))
app.get('/resetpswd/:id/:token',(req,res) => {
   res.status(200).send(req.params)
})

//printing route

app.post('/print',express.raw({type:'application/pdf'}),async(req,res)=>{
  const options ={}
  if(req.query.printer){
    options.printer = req.query.printer;
  }
  const tempFilePath = path.join(`./tmp/${Math.random().toString(36).substr(7)}.pdf`);
  fs.writeFileSync(tempFilePath,req.body,'binary');
  await ptp.print(tempFilePath,options);
  fs.unlinkSync(tempFilePath)

  res.status(204);
  res.send();
})

  //starting server
app.listen(port , ()=> {
      console.log(`app is running at ${port}`)
  })

 