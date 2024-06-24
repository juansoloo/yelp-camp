const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use((req,res,next) => {
    req.requestTime = Date.now();
    req.method = 'GET';
    console.log(req.method, req.path);
    next();
})



// morgan('tiny');
// app.use((req,res,next) => {
//     console.log('First middle ware')
//     return next();
//     console.log('This is my first middleware - after calling NEXT')
// })
// app.use((req,res,next) => {
//     console.log('Second middle ware')
//     return next();
// })
// app.use((req,res,next) => {
//     console.log('Third middle ware')
//     return next();
// })

app.get('/', (req,res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE')
})
app.get('/dogs', (req,res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('woof woof')
})


app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})