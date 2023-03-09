const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const User = require('../models/user');
const Comment = require('../models/comment');
const Reply = require('../models/reply');
const { QueryTypes } = require('sequelize');
const script = require('../js/script');


/* FUNCTION TO SIGNUP A USER! */
exports.signup = async (req, res, next) => {
    const value = script.checkPassword(req.body.password);
    let user;
    if(value.conditional === true){
        try {
            const hash = await bcrypt.hash(req.body.password, 10);
            try{
                user = await User.findOne({ where: { email: req.body.email } });
            } catch(error){
                return res.status(402).send({message: "Something went wrong!"});
            }
            if(!user){
                try{
                    user = new User({
                        email: req.body.email,
                        lastname: req.body.lastname,
                        firstname: req.body.firstname,
                        phonenumber: req.body.phonenumber,
                        password: hash,
                    });
                    const user2 = await user.save();
                    const token = jwt.sign({userId: user.idUser}, 'RANDOM_TOKEN_SECRET', { expiresIn: '24H'});
                        res.status(201).send({
                            email: user.email,
                            userId: user.idUser,
                            token: token,
                            firstname: user.firstname,
                            lastname: user.lastname
                        });
                } catch(error){
                    res.status(500).send({message: error});
                }
            } else{
                return res.status(402).send({
                    message: "User already exists"
                });
            }
        } catch(error){
            res.status(500).send({message: "error"});
        }
    } else{
        res.status(500).send({message: value.message})
    }
}


/* FUNCTION TO LOGIN A USER!*/