const myError = require("../utils/myError");

//middleware for authentication before accessing certain protected routes
module.exports.isLoggedIn= (req,res,next)=>{
  // if (req.user){
  if (req.isAuthenticated()){
    // console.log("logged in");
    next ();
  }else{
    next(new myError(401,"Please login to access this route!"));
  }
  
}
