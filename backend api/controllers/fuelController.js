const Fuel = require ('../models/Fuel')


const addFuel = async (req, res) =>{
    try {
        if(!req.body.fuelPrice){
            res.status(400).send({
                status: 0,
                message : "Fuel price is required"
            })
        }
        else if(!req.body.fuelQuantity){
            res.status(400).send({
                status: 0,
                message : "Fuel Quantity is required"
            })
        }
        else if(!req.body.date){
            res.status(400).send({
                status: 0,
                message : "date is required"
            })
        }
        else{
            const fuel = new Fuel()
            fuel.fuelPrice = req.body.fuelPrice
            fuel.fuelQuantity = req.body.fuelQuantity
            fuel.date = req.body.date
            fuel.carId = req.body.carId

            const addFuel = await fuel.save()

            if(addFuel){
                res.status(200).send({
                    status : 1,
                    message : "fuel added Successfully"
                })
            }
            else{
                res.status(400).send({
                    status : 0,
                    message : "fuel didnt added"
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

module.exports = addFuel;