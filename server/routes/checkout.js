var stripe = require('stripe')('sk_test_4SFQVsDF6slgLM3BFQ1f6OEd');

module.exports = function(mongoose) {

    function processPayment(req,res){

        var stripeToken = req.body.stripeToken;

        var charge = stripe.charges.create({
            amount: 100,
            currency: 'gbp',
            card: stripeToken,
            description: 'Test payment'
        }, function(err,charge) {

            if (err){
                console.log('card has been declined: ', err);
                res.send(err);
            } 

            console.log('charged');
            res.send('Your payment has been processed sucessfully');
        });

        console.log(req.body);
    }

    function processCancellation(req,res){

    }

    function processRefund(req,res){

    }

    return {
        processPayment: processPayment,
        processCancellation: processCancellation,
        processRefund: processRefund
    };
};