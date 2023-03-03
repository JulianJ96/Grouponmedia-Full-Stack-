const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
require('dotenv').config();
const mysql = require('mysql');
const sql = require('mssql');
const sequelize = require('./config/db.config2');


//mongoose.connect('mongodb+srv://julianj96:otakuJj9672$@jucluster0.2g5jb2b.mongodb.net/?retryWrites=true&w=majority')

sequelize.authenticate().then(() => {
    console.log('Connection successful!');
}) .catch((err) => {
    console.log('error connecting to database!')
});



app.use((req, res, next)  =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Routes Const


// Uses
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, 'static')));
app.use('', express.static(path.join(__dirname, 'images')));


// Routes


module.exports = app;
