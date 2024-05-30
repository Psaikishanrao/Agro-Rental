const express = require('express');
const stripe = require('stripe')('sk_test_51Om15sSAdmYRJwvSyOGhEOgnTVqpd1XioYOh4ddieWDR0dUjhN4JTuhnOsI4kQn5vu6bMUyv9S5jr4L8bYEcuy5b00X2TMJaQn');
const {v4:uuid}=require('uuid');
const router=express.Router();
router.post("/pay",(req,res,next)=>{
    console.log(req.body.token);
    const{token,amount}=req.body;
    const idempotencykey = uuidv4();
    return stripe.customers.create({
        email: token.email, source: token
    }).then(customer=>{
        stripe.charges.create({
            amount: amount * 100,
            currency: 'usd', 
            customer: customer.id,
            receipt_email: token.email
        }, {idempotencykey})
}).then(result=>{
    res.status(200).json(result)
    }).catch(err=>{
        console.log(err);
    });
});
module.exports=router;