var validation = (data)=>{
    const Joi = require("joi")
    var schema=Joi.object({
        "phoneNo":Joi.string().length(10).pattern(/^[0-9]+$/).message({'string.pattern.base':'Provide a vaild data'}).required(),
        'role_ids':Joi.any().valid('customer','deliveryPerson','Admin').required(),
        "password":Joi.string()
            .min(8)
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+[a-zA-Z0-9!@#$%^&*]{8,}$"))
            .message({'string.pattern.base':'password must contain Captail letter,small letter,Special character and Number'})
            .required(),
        "conformPassword": Joi.any().valid(Joi.ref('password')).required().messages({ 'any.only': "conformPassword must be same as password" }),
    })
    .with('password', 'conformPassword');
    return schema.validate(data)
    
}
module.exports.validation = validation