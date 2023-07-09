const express = require('express');
const cors = require("cors");
const mysql = require("mysql");
const app = express()
app.use(cors())
app.use(express.json())

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.listen(process.env.PORT || 3900)
