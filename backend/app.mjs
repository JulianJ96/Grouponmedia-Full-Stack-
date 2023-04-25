import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql';
import sql from 'mssql';
import sequelize from './config/db.config2';
import cors from 'cors';

const app = express();

dotenv.config();

// Connect to Sequelize database
sequelize.authenticate().then(() => {
    console.log('Connection successful!');
}) .catch((err) => {
    console.log('error connecting to database!')
});

// Sync Sequelize models
try{
    sequelize.sync({force:false})
} catch(error){
    console.log(error)
}

app.use((req, res, next)  =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Routes
import userRoutes from './routes/user.mjs';
import replyRoutes from './routes/reply.js';
import commentRoutes from './routes/comment.js';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, 'static')));
app.use('', express.static(path.join(__dirname, 'images')));
app.use(cors({ origin: 'http://localhost:5173'}));
app.use('/api/auth', userRoutes);
app.use('/api/reply', replyRoutes);
app.use('/api/comment', commentRoutes);

export default app;

