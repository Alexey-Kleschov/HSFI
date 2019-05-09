const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const viewProfileRouter = express.Router();

viewProfileRouter.post('/viewProfile', async(req, res, next) => {    
    
  
   const user = await User.findOne({ email : req.body.email });
    console.log(user);
    res.json({user : user});

 
});

module.exports = viewProfileRouter;
