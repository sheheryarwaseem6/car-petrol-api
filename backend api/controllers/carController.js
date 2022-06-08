const Car = require ('../models/Car')
const Fuel = require('../models/Fuel')


// add cars

const addCar = async (req , res) =>{
    try{
        if(!req.body.carName){
            res.status(400).send({
                status: 0,
                message : "Car Name is required"
            })
        }
        else if(!req.body.carNumber){
            res.status(400).send({
                status : 0,
                message : "car Number is required"

            })

        }
        else if(!req.body.carModel){
            res.status(400).send({
                status : 0,
                message : "Car Model is required"
            })
        }
        else{
            const car = new Car()
            car.carName = req.body.carName
            car.carNumber = req.body.carNumber
            car.carModel = req.body.carModel
            car.userId = req.user._id

            const addCar = await car.save()

            if(addCar){
                res.status(200).send({
                    status : 1,
                    message : "Car added Successfully"
                })
            }
            else{
                res.status(400).send({
                    status : 0,
                    message : "car didnt added"
                })
            }
        }
    }
    catch(error){
        res.status(400).send({
            status : 0,
            message : error
        })
    }
}

const updateCar = async (req,res) =>{
    try{
        const car = await Car.findById({ _id : req.body._id})

        car.carName = req.body.carName
        car.carNumber = req.body.carNumber
        car.carModel = req.body.carModel
       

        const updatedCar = await car.save()

        if(updatedCar){
            res.status(200).send({
                status : 1,
                message: 'car pdated successfully'

            })

        }
        else{
            res.status(400).send({
                status: 1,
                message : 'something went wrong'
            })
        }

    }
    catch(error){
        res.status(400).send({
            status : 0,
            message: error
        });


    }
}


const deleteCar = async(req,res)=>{
    try{
        const deletecar =await Car.findByIdAndDelete({_id : req.body._id})

        if(deletecar){
            res.status(200).send({
                status: 1,
                message: 'Car deleted successfully.'
            });

        }
        else{
            res.status(404).send({
                status: 0,
                message: 'Car not found.'
            });
        }

    }
    catch (error){
        res.status(400).send({
            status: 0,
            message: error
        })

    }
}

const allCars = async (req , res) =>{
    try {
        const cars = await Car.find({userId : req.userId})
        if(cars){
            res.status(200).send({
                status: 1,
                message: 'Success',
                data: cars
            })
        }
        else{
            res.status(404).send({
                status: 0,
                message: 'no cars found in this user.'
            });
        }

    }
    catch(error){
        res.status(400).send({
            status: 0,
            message: 'No record found'
        });

    }
}

const carDetails = async (req , res)=>{
    try{
        const cardetails = await Car.findById({ _id : req.body._id})
        if(cardetails){
            const fueldetails = await Fuel.find({carId : req.body._id})
            res.status(200).send({
                status : 1,
                data:{
                    cardetails,
                    fueldetails
                }
            })
        }
        else{
            res.status(404).send({
                status: 0,
                message: 'car details not found.'
            });
        }

    }
    catch(error){
        res.status(400).send({
            status : 0,
            message: error
        });

    }

}

module.exports = {
    addCar,
    updateCar,
    deleteCar,
    allCars,
    carDetails
}