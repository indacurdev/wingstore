import Stripe from 'stripe';

const stripe = new Stripe(`${process.env.STRIPE_KEY_SECRET}`, {
    apiVersion: "2022-11-15"
});

export default async function handler(req, res){
    if(req.method === 'POST'){
        try{

            const body = JSON.parse(req.body);
            const paymentIntent = await stripe.paymentIntents.create({
                amount:                 body.amount,
                currency:               "usd",
                payment_method_types:   ["card"],
                description:            body.description,
            });

            res.status(200).json(paymentIntent);

        } catch (error) {
            return res.status(error?.statusCode).json(error);
        }
    }
}

