const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schema.js');
const Campground = require('../model/campground');
const expressError = require('../utils/expressError');
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn,isAuthor,validateCampground,storeReturnTo } = require('../middleware');

router.get('/', catchAsync(campgrounds.index))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

router.get('/:id', isLoggedIn, catchAsync(campgrounds.showCampground));

router.get('/:id/:edit', isLoggedIn, isAuthor,catchAsync(campgrounds.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

module.exports = router;