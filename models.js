const mongoose = require('mongoose')
const schema = mongoose.Schema

const user_schema = new schema({
    "phoneNo":{
        type:String,
        trim:true,
        Length:10,
    },
    "role_ids": {
        type: String,
        enum: ["customer", "deliveryPerson","Admin"],
        required:true,
        default:"customer"
     },
     "salt": {
        type : String,
        required:true,
        trim: true,
    },
    "hash": {
        type : String,
        required:true,
        trim: true,
    }
})


const order_schema = new schema({
    "itemName":{
        type : String,
        required:true,
        trim: true,
    },
    "quantity":{
        type : String,
        required:true,
        trim: true,
    },
    "deliveryPersonId":{
        type : String,
        trim: true,
    },
    "orderStages":{
        type: String,
        enum: ["taskCreated", "reachedStore","itemsPicked","enroute","delivered","canceled"],
        required:true,
     },
    "customerId":{
        type : String,
        required:true,
        trim: true,
    },
    "pickupLocation":{
        type : String,
        required:true,
        trim: true,
    }
})

const catalogue_schema = new schema({
    "productName":{
        type:String
    },
    "Category":{
        type:String
    },
    "Addresses":{
        type:Array
    }
})
user=mongoose.model('User',user_schema)
order=mongoose.model('order',order_schema)
catalogue = mongoose.model('catalogue',catalogue_schema)
module.exports.Usermodel =user
module.exports.orders= order
module.exports.catalogue = catalogue