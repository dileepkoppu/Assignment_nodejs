const appRoot=require("app-root-path")
const express = require('express')

const mongoose = require('mongoose')
const {router } = require(appRoot+'/router')
const app = express()
const url = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.4mifl.mongodb.net/project?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser :true,useUnifiedTopology: true});
    mongoose.connection
      .once('open',() => {
            console.log('connected')
      })
      .on('error', error=>
            {console.log(error);});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// server

app.use('/',router)
app.listen(9000,() => {
      console.log(`Server started on localhost:9000`)
  }) 