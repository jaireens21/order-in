require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');//since frontend & backend are running on diff ports

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:'http://localhost:3000', //to allow server to accept requests from a different origin (the frontend server)
    credentials:true //to allow the session cookie from the browser(front-end) to pass through
}));

//connecting to DB
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

//express-session config----to stay authenticated after logging in
const session= require('express-session');
const MongoDBStore=require('connect-mongo');//using mongo session store
const secret=process.env.SECRET;
const sessionConfig={
//   store:MongoDBStore.create({ 
//     mongoUrl:dbUrl, 
//     touchAfter: 24*60*60, //Lazy session update , time in seconds
//   }),
  name:'parleg', //changing name of the session ID cookie (default name: connect.ssid)
  secret, //used to sign the session ID cookie
  resave: false, //don't save session if unmodified
  saveUninitialized: true,//non-compliant with laws that require permission before setting a cookie
  cookie: { //Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
    httpOnly:true,// helps mitigate the risk of client-side-scripting by preventing access to the cookie
    //secure:true, //use when deploying //httpS will be reqd to set cookies
    maxAge: 1000*60*60*24*7,   //a week (in milliseconds)  
  }
}
app.use(session(sessionConfig));

const User=require("./models/user");
const catchAsync=require('./utils/catchAsync');

//passport config
const passport=require('passport'); 
const LocalStrategy=require('passport-local');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//ROUTES 
app.use("/api", require('./routes/dishRoutes'));
app.use("/orders", require('./routes/orderRoutes'));



//create a new owner account
app.post('/owner/register', catchAsync(async(req,res,next)=>{
    //add middleware to validate email & password before submission
    const {email,password}=req.body;
    const foundUser= await User.findOne({email});
    if(foundUser){
        return res.json({
            success:false, //redirect in react based on this
            message: "Looks like you already have an account with us! Please sign in.",
            data:foundUser
        });
    }else{
        const username=email;//we are using email id as the username
        const user=new User({email,username});
        const newUser= await User.register(user,password);
        req.login(newUser, err=>{ 
            if (err) {
            return next(err);}
        });
        return res.status(201).json({
            success:true, //redirect in react based on this
            message:"registered & logged in",
            user:newUser,
        });
    }
     
}));

//login the owner
app.post("/owner/login", passport.authenticate('local'),(req,res)=>{
    //when authentication succeeds, the req.user property is set to the authenticated user, a session is established, and the next function in the stack is called. 
    return res.status(201).json({
        success: true,
        message:"logged in",
        user:req.user,
    });
})

//logout the user
app.get('/owner/logout',(req,res)=>{
    req.logout();
    // req.session.destroy(); // clear the session data
    return res.status(201).json({
        success:true,
        message:"logged out"
    });
})

//custom error handler (called whenever there is an error or whenever next(error) is encountered)
app.use((err,req,res,next)=>{
           
    return res.status(err.statusCode||500).json({
        success:false, 
        error: err.message|| "Oh No! Something went wrong!"
    });
})


const port=process.env.PORT || 8010;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})