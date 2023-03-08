const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const User = require('../models/user');
const Comment = require('../models/comment');
const Reply = require('../models/reply');
const { QueryTypes } = require('sequelize');