const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require ('cors')

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

const PORT = process.env.PORT || 4003;

dotenv.config()

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useUnifiedTopology : true,
        useNewUrlParser : true
    }, () => console.log('connection success')
)

const apiRoutes = require('./routes/api')
app.use('/api', apiRoutes)

app.listen(PORT , () => console.log('server is runing on ', PORT))