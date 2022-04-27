require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const dbUrl=process.env.DB_URL || 'mongodb://127.0.0.1:27017/order-in';
mongoose.connect(dbUrl,{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log('connection error:',err);
    process.exit(1);
})


//ROUTES 
app.use("/api", require('./routes/dishRoutes'));
app.use("/orders", require('./routes/orderRoutes'));


//custom error handler (called whenever there is an error or when next(error) is encountered)
app.use((err,req,res,next)=>{
    //giving defaults
    return res.status(err.statusCode||500).json({
        success:false, 
        error: err.message || 'Oh No! Something went wrong!' 
    });
})


const port=process.env.PORT || 8010;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})