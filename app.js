const express = require('express');
const dotenv = require('dotenv');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const hbs = require('hbs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 2000;
const app = express();
const routers = require('./routers/router')

//View Engine Middleware
app.set('view options', {layout: 'main'});
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Static Folder
app.use(express.static(`${__dirname}/public`));

//Routing
const router = routers(app);

//Listening to Server
app.listen(port, ()=>{
    console.log('Stripe Connect Successfully');
})