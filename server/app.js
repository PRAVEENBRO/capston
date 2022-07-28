const express = require('express')
const app = express();
const port = 4400;
const cors = require('cors');

app.use(cors())
const authrouter = require('./router/authrouter.js')


require("./db/conn");


app.use(express.json());


app.use(authrouter)





module.exports = app