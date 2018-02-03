const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = (app)=>{
    app.get('/', (req, res)=>{
        res.render('index',{
            public_key: process.env.STRIPE_PUBLIC_KEY,
            amount: req.body.dataAmount
        });
    })

    app.get('/success', (req, res)=>{
        res.render('success');
    })

    app.post('/charge', (req, res) => {
        const amount = 2500;
        
        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        })
        .then((customer) => stripe.charges.create({
            amount,
            description: 'Web Development Tools',
            currency: 'usd',
            customer: customer.id
        }))
        .then( (charge) => res.render('success'));
    })
}