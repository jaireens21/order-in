const BaseJoi = require('joi');
const myError=require('./utils/myError');
//html sanitizing
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});
const Joi=BaseJoi.extend(extension);

//middleware for data validation(server-side) while making a new dish/editing dish, using Joi schema
const dishjSchema=Joi.object({
    dish:Joi.object({
        name:Joi.string().required(),
        category:Joi.string().required(),
        description:Joi.string().required(),
        price:Joi.number().required().min(0).max(999),
    }).required()
});

module.exports.validateNewDishData= (req,res,next)=>{
    const {error}=dishjSchema.validate(req.body);
    if(error){
      const msg=error.details.map(e=>e.message).join(',');
      next(new myError(400, msg)); //call error handler with custom error
    }else next();//no error--> go to next function 
};

module.exports.validateEditDishData= (req,res,next)=>{
    const {error}=dishjSchema.validate(req.body);
    if(error){
      const msg=error.details.map(e=>e.message).join(',');
      next(new myError(400, msg)); //call error handler with custom error
    }else next();//no error--> go to next function 
};

//middleware for data validation(server-side) while making a new order/updating order(completed/incomplete), using Joi schema
const orderjSchema=Joi.object({
    dish:Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }).required(),
        phone:Joi.string().required(),
        comments:Joi.string(),//optional
        method:Joi.string().required(),
        date:Joi.date().required(),
        time:Joi.number().required().min(0).max(24),
        total:Joi.number().required().min(0),
        completed:Joi.boolean().required(),
        items:Joi.array().items({
            name:Joi.string(),
            category:Joi.string(),
            description:Joi.string(),
            price:Joi.number().min(0).max(999),
            qty:Joi.number().min(1)}).required(),
    }).required()
});
module.exports.validateNewOrderData= (req,res,next)=>{
    const {error}=orderjSchema.validate(req.body);
    if(error){
      const msg=error.details.map(e=>e.message).join(',');
      next(new myError(400, msg)); //call error handler with custom error
    }else next();//no error--> go to next function 
};

module.exports.validateEditOrderData= (req,res,next)=>{
    const {error}=orderjSchema.validate(req.body);
    if(error){
      const msg=error.details.map(e=>e.message).join(',');
      next(new myError(400, msg)); //call error handler with custom error
    }else next();//no error--> go to next function 
};
