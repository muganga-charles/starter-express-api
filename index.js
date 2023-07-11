const express = require('express');
const cors = require("cors");
const mysql = require("mysql");
const app = express()
app.use(cors())
app.use(express.json())

const database = {
    host: "sql8.freesqldatabase.com",
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

// insert data into a table
// API endpoint to insert data into the database when a user signs up
app.post("/api/signup", (req, res) => {
    // Retrieve the data from the signup request
    const values = {
        Access_number: req.body.accessnumber,
        FirstName: req.body.firstname,
        LastName: req.body.lastname,
        Phone: req.body.phonenumber,
        Password: req.body.password,
    };

    // Create the SQL query to insert the data into the table
    const query = "INSERT INTO signup SET ?";
  
    // Execute the query with the data
    pool.query(query, values, function(error, results){
      if (error) {
        console.log('Error inserting data into the database');
        res.send({status: false, message: "Error inserting data into the database", data: error})
      }
      else{
        console.log('Data inserted successfully');
        res.send({status: true, message: "Signed up successfully"})
      }
      
    });
  });

  app.post('/api/login', (req, res) => {
    var values = {
        accessnumber: req.body.accessnumber,
        password: req.body.password
    };
    const query = "SELECT FirstName,LastName,Phone FROM signup WHERE Access_number = ? AND Password = ?";
    pool.query(query, [values.accessnumber, values.password], function(error, result){
        if(error){
            console.log('Error retrieving data')
            res.send({ status: false, message: 'Error retrieving data', data: error})
        }
        else {
            res.send({ status: true, message: 'Signed In successfully', data: result})
        }
    });

});

// Accounts 
app.post("/api/initial", (req, res) => {
    // Retrieve the data from the signup request
    const values = {
        Access_number: req.body.accessnumber,
    };

    // Create the SQL query to insert the data into the table
    const query = "INSERT INTO userdata SET ?";
  
    // Execute the query with the data
    pool.query(query, values, function(error, results){
      if (error) {
        console.log('Error inserting data into the database');
        res.send({status: false, message: "Error inserting data into the database", data: error})
      }
      else{
        console.log('Data inserted successfully');
        res.send({status: true, message: "Accessnumber inserted successfully"})
      }
      
    });
  });
// -- Accounts
app.post('/api/acc', (req, res) =>{
    const data ={
        accessnumber:req.body.accessnumber,
        choice: req.body.choice,
    }
    const query = `UPDATE userdata SET Accounts = '${data.choice}' WHERE Access_number = '${data.accessnumber}'`;
    pool.query(query,data, function(error, result){
        if(error){
            console.log('Error updating data')
            res.send({ status: false, message: 'Error updating data', data: error})
        }
        else {
            res.send({ status: true, message: 'Updated successfully', data: result})
        }
    }
    )
})
//-- other
app.post('/api/other', (req, res) =>{
    const data ={
        accessnumber:req.body.accessnumber,
        Idea: req.body.Idea,
    }
    const query = `UPDATE userdata SET Other = '${data.Idea}' WHERE Access_number = '${data.accessnumber}'`;
    pool.query(query,data, function(error, result){
        if(error){
            console.log('Error updating data')
            res.send({ status: false, message: 'Error updating data', data: error})
        }
        else {
            res.send({ status: true, message: 'Updated successfully', data: result})
        }
    }
    )
})
  
//-Registration
app.post('/api/reg', (req, res) =>{
    const data ={
        accessnumber:req.body.accessnumber,
        choice: req.body.choice,
    }
    const query = `UPDATE userdata SET Registration = '${data.choice}' WHERE Access_number = '${data.accessnumber}'`;
    pool.query(query,data, function(error, result){
        if(error){
            console.log('Error updating data')
            res.send({ status: false, message: 'Error updating data', data: error})
        }
        else {
            res.send({ status: true, message: 'Updated successfully', data: result})
        }
    }
    )
})
app.post('/api/otherreg', (req, res) =>{
    const data ={
        accessnumber:req.body.accessnumber,
        Idea: req.body.Idea,
    }
    const query = `UPDATE userdata SET OtherRegistaration = '${data.Idea}' WHERE Access_number = '${data.accessnumber}'`;
    pool.query(query,data, function(error, result){
        if(error){
            console.log('Error updating data')
            res.send({ status: false, message: 'Error updating data', data: error})
        }
        else {
            res.send({ status: true, message: 'Updated successfully', data: result})
        }
    }
    )
})
