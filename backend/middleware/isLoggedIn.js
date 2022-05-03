const myError = require("../utils/myError");

//middleware for authentication before accessing certain protected routes
module.exports.isLoggedIn= (req,res,next)=>{
  if (req.isAuthenticated()){
    next ();
  }
  next(new myError(401,"Please login to access this route!"));
}
