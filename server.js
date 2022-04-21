const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const dbUrl='mongodb://127.0.0.1:27017/order-in';
mongoose.connect(dbUrl,{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log('connection error:',err);
    process.exit(1);
})
const port=8010;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})