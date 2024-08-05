const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schema.js');
const Campground = require('../model/campground');
const expressError = require('../utils/expressError');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { isLoggedIn,isAuthor,validateCampground,storeReturnTo } = require('../middleware');

router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
    .post(upload.array('image'), (req,res) => {
        console.log([req.body, req.files]);
        res.send('files uploaded')
    })

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(isLoggedIn, catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))


router.get('/:id/:edit', isLoggedIn, isAuthor,catchAsync(campgrounds.renderEditForm))

module.exports = router;