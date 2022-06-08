const mongoose = require('mongoose')
const Car = require ('./Car')

const fuelSchema = new mongoose.Schema({
    fuelPrice :{
        type : Number,
        required : true
    },
    fuelQuantity:{
        type: Number,
        required : true

    },
    date:{
        type : Date
    },
    carId:{
        type : String

    }


},
{timestamps : true})

const Fuel = mongoose.model('Fuel' , fuelSchema)

module.exports = Fuel