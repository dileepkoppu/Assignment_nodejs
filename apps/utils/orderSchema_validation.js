var validation = (data)=>{
    const Joi = require("joi")
    var schema=Joi.object({
        "itemName":Joi.string().min(3).required(),
        "quantity":Joi.number().required(),
        "deliveryPersonId":Joi.string().min(3),
        'orderStages':Joi.any().valid("taskCreated", "reachedStore","itemsPicked","enroute","delivered","canceled").required(),
        "customerId":Joi.string().min(3).required(),
        "pickupLocation":Joi.string().min(3).required(),
    });
    return schema.validate(data)
    
}
module.exports.validation = validation