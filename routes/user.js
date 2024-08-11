const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
// const User = require('../model/user');
const user = require('../controllers/users')
const { storeReturnTo } = require('../middleware');

router.route('/register')
    .get(user.renderRegister)
    .post(catchAsync(user.registerUser))

router.route('/login')
    .get(user.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.login)

router.get('/logout', user.logout);

module.exports = router; 