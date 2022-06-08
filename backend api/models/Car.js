const mongoose = require('mongoose')
const User = require('./User')

const carSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'

    },
    carName : {
        type : String,
        require : true

    },
    carNumber :{
        type : String,
        require : true

    },
    carModel :{
        type : String,
        require : true

    }
},
{timestamps : true})

const Car = mongoose.model("Car", carSchema)

module.exports =Car