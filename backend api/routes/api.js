const router = require('express').Router()
const {verifyToken} = require('../middleware/authenticate')
const {login , registration} = require('../controllers/authController')
const { addCar , updateCar, deleteCar, allCars, carDetails } = require('../controllers/carController')
const addFuel = require('../controllers/fuelController')

router.post('/login', login)
router.post('/registration', registration)


router.post('/addCar',verifyToken, addCar)
router.put('/updateCar', verifyToken, updateCar)
router.delete('/deleteCar', verifyToken, deleteCar)
router.get('/allCars', verifyToken, allCars)
router.get('/carDetails', verifyToken, carDetails)


router.post('/addFuel', verifyToken, addFuel)

module.exports = router