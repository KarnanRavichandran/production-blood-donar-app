const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan')
const cors = require('cors');
const  connectDB  = require('./config/db');
const authrouter = require('./routes/authRoutes');
const inventoryRouter = require('./routes/inventoryRoutes');
const anlysticsRouter = require('./routes/anlysticsRoute');
const adminRouter = require('./routes/adminRoute');
const path = require('path')



dotenv.config({path:'./config/.env'})

// mongodb Connnection
connectDB();

const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/',(req,res,next)=>{
    res.status(200).json({message:"welcome my son"})
})

app.use('/api/v1/auth',authrouter)
app.use('/api/v1/inventory',inventoryRouter)
app.use('/api/v1/anlystics',anlysticsRouter)
app.use('/api/v1/admin',adminRouter)

// static folder
 app.use(express.static(path.join(__dirname,'./frontend/build')))
//  staic routes
app.get('*',function(req,res,next){
    res.sendFile(path.join__dirname,"./frontend/build/index.html")
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Node Server is Runinng ${process.env.DEV_MODE} ModeOn Port  ${PORT}`.bgBlue.white)
})