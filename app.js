const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');

const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

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
}

app.use(session(secretConfig))

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:_id/reviews', reviews)

app.get('/',(req,res) => {
    res.render('home')
})


app.all('*', (req,res,next) => {
    next(new expressError('Page Not Found', 404))
})

app.use((err,req,res,next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render('errors', { err });
})

app.listen(3000, () => {
    console.log('serving on port 3000')
});