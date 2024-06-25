const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use((req,res,next) => {
    req. requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req,res,next) => {
    console.log('I love dogs')
    next();
})

app.use((req,res,next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next()
    }
    res.send('SORRY YOU NEED A PASSORD')
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
    console.log(`REQUEST TIME: ${req.requestTime}`)
    res.send('HOME PAGE')
})


app.get('/dogs', (req,res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('woof woof')
})

app.get('/secret', (req,res) => {
    res.send('MY SECRET IS: Sometimes i wear headphones in public so i dont have to speak to anyone')
})

app.use((req,res) => {
    res.status(404).send('NOT FOUND!')
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})