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

const Dish=require('./models/dish');


//ROUTES 
app.use("/", require('./routes/dishRoutes'));

//crud
//create: add a dish to DB via post
// app.post('/add', catchAsync(async(req,res)=>{
//     const dish=new Dish(req.body);
//     console.log(dish);
//     dish.save()
//     .then(data=>{
//         //console.log(data);
//         // return res.status(200).send('dish added successfully');
//         return res.status(200).json({success:true,data:dish});
//     })
//     .catch(err=>{
//         return res.status(500).send({message: err.message || "Some went wrong while saving the dish."});
//     })
// }))

//read-get all the dishes from DB
app.get('/menu',(req,res)=>{
    Dish.find(function(err,itemList){
        if(err){
            console.log(err);
            return res.status(500).send({message: err.message || "Some went wrong while reading all the dishes from DB."});
        }else{
            return res.json(itemList);
        }
    })
})
//update - put request to edit a dish
//destroy- delete request to delete a dish

//custom error handler
app.use((err,req,res,next)=>{
    //giving defaults
    res.status(err.statusCode||500).json({
        success:false, 
        error: err.message || 'Oh No! Something went wrong!' 
    });
})


const port=8010;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})