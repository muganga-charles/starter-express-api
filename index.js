const express = require('express');
const cors = require("cors");
const mysql = require("mysql");
const app = express()
app.use(cors())
app.use(express.json())

const database = {
    host: "sql10.freesqldatabase.com",
    user: "sql8632033",
    password: "gtnLbfgucC",
    database: "sql8632033",
};
const pool = mysql.createPool(database);

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.listen(process.env.PORT || 3900)

app.get("/api/data", (req, res) => {
    const query = "SELECT * FROM signup;"; 

    pool.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error retrieving data from database." });
        }
        return res.json(results);
    });
});