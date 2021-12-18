const appRoot = require('app-root-path')
// const { query } = require('express')
const {orders,catalogue} = require(appRoot+"/models")
const {validation}= require(appRoot+"/apps/utils/orderSchema_validation.js")

const createOrder = async(req,res)=>{
    try {
        temp=await catalogue.findOne({productName:req.body.itemName})
        if(temp!==null){
                orderData=req.body
                orderData.orderStages="taskCreated"
                orderData.customerId=req.jwt.id
                temp1=temp.Addresses
                orderData.pickupLocation=temp1[Math.floor(Math.random()*temp1.length)];
                validate = validation(req.body)
                if (!validate.error) {
                    data1 = new orders(req.body)
                    await data1.save()
                                .then((data)=>{
                                    return res.status(201).send({success:true,"message":`order created`})
                                })
                                .catch((error)=>{
                                    return  res.status(400).json({success:false,"message":"something went wrong please try again"})
                                })
                } else {
                    return res.status(422).send({success:false,"message":validate.error.message})
                }
            }else{
                return res.status(200).send({success:false,"message":`sorry,currently item is not available`})
            }
        }
        
     catch (error) {
        return  res.status(400).json({success:false,"message":"something went wrong please try again"})
    }
}


const ordersList = async (req,res)=>{
    try{
        query={}
        if (req.jwt.role==="Admin"){
                query={}
        }else{ 
            if(req.jwt.role==="deliveryPerson"){
                query={"deliveryPersonId":req.jwt.id}
            }else{
                return res.status(403).json({success:false,"message":"you are unauthorized to view this page"})
            }
        }
        await orders.find(query)
                    .then((data)=>{
                        if (data.length===0) {
                            return res.status(200).send({success: true,"message":"currently  orders are not there"})
                        } else {
                            return res.status(200).send({success: true,data:data})   
                        }
                    })
                    .catch((error)=>{
                        return res.status(503).send({success: false,message:"somting went worng please try again"})
                    })
    }catch (error) {
       return  res.status(400).json({success:false,"message":"something went wrong please try again"})
    }
}



const orderDetails = async(req,res)=>{
    try {
        id=req.params.id
        if (id){
            await orders.findOne({_id:id}) 
                                        .then((data)=>{
                                            return res.status(200).send({success:true,data:data})
                                        })
                                        .catch((error)=>{
                                            return res.code(503).send({success:false,"message":"something when wrong please try again or check relogin"})
                                        })
        }else{
            return res.status(503).send({success:false,"message":"something when wrong please try again or check relogin"})
        }
        
    } catch (error) {
        return res.status(503).send({success:false,"message":"something when wrong please try again or check relogin"})
    }
}




const updateorder = async(req,res)=>{
    try {
        id = req.params.id
        // if (!validate.error) {
            temp={}
            if(req.jwt.role==="Admin"){
                if(req.body.deliveryPersonId){
                    temp.deliveryPersonId=req.body.deliveryPersonId
                }
                if(req.body.orderStages){
                    temp.orderStages=req.body.orderStages
                }

            }else if(req.jwt.role==="deliveryPerson"){
                if(req.body.orderStages){
                    temp.orderStages=req.body.orderStages
                }

            }
            
            await orders.updateOne({"_id":id},{$set:temp})
                                            .then((data)=>{
                                                
                                                if (data.modifiedCount>0) {
                                                    return res.status(202).send({success:true,"message":"order successfully updated"})
                                                } else {
                                                    return res.status(200).send({success:false,"message":"order not updated please try again"})
                                                }
                                            })
                                            .catch((error)=>{
                                                return res.status(400).send({success:false,"message":"something when wrong please try again or check relogin"})
                                            })
            
        // } else {
        //     return res.status(422).send({success:false,"message":validate.error.message})            
        // }
        
        
    } catch (error) {
        return res.status(503).send({success:false,"message":"something when wrong please try again or check relogin"})
    }
    
}


module.exports.createOrder=createOrder
module.exports.updateorder=updateorder
module.exports.orderDetails=orderDetails
module.exports.ordersList=ordersList