const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../model/user');
const user = require('../controllers/users')
const { storeReturnTo } = require('../middleware');

router.get('/register', user.renderRegister)

router.post('/register', catchAsync(user.registerUser))

router.get('/login', user.renderLogin)

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.login)

router.get('/logout', user.logout);

module.exports = router; 