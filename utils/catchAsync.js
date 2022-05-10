//to catch errors within async functions that express cannot catch on its own.


function catchAsync(myFunc){
    return function(req,res,next){
      myFunc(req,res,next).catch(e=>next(e)); //next(e) will call the error handler
    }
  }

module.exports= catchAsync;