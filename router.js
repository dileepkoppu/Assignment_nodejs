const appRoot = require("app-root-path")
const router = require('express').Router()
const {login,signup} = require(appRoot+'/apps/authentication.js')
const {createOrder,updateorder,ordersList,orderDetails} = require(appRoot+'/apps/order.js')
const {checkauth} = require(appRoot+'/middleware')

router.post('/login', login);

router.post('/signup', signup);

router.post('/create',checkauth,createOrder)
router.post('/update/:id',checkauth,updateorder)
router.get('/list',checkauth,ordersList)
router.get('/detail/:id',checkauth,orderDetails)

module.exports.router = router