const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://trittgo:trittgo@cluster0.turww.mongodb.net/test' , {useNewUrlParser : true , useUnifiedTopology : true})

const connection = mongoose.connection

connection.on('error', err => console.log(err))

connection.on('connected' , () => console.log('Mongo DB Connection Successfull'))
