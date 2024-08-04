const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./model/user');

const userRoutes = require('./routes/user')
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

const expressError = require('./utils/expressError');
mongoose.connect('mongodb://localhost:27017/yelpcamp');

const db = mongoose.connection; 
db.on("error", console.error.bind(console, "connection, error"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname)));

const secretConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        exprires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
};

app.use(session(secretConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes); 
app.use('/campgrounds/:_id/reviews', reviewRoutes);

app.get('/',(req,res) => {
    res.render('home')
})

app.all('*', (req,res,next) => {
    next(new expressError('Page Not Found', 404))
})

app.use((err,req,res,next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Something went wrong' 
    res.status(statusCode).render('errors', { err });
})

app.listen(3000, () => {
    console.log('serving on port 3000')
});