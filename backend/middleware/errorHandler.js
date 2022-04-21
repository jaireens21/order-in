//delete this file


const errorHandler=(err,req,res,next)=>{

    let error={ ...err };
    
    if (err.name === "CastError") {
        error = new myError(404, "Resource not found");
    }

    return res.status(err.statusCode || 500).json({
        success:false,
        error:err.message || 'Oh No! Something went wrong',
    });
}
module.exports=errorHandler;
