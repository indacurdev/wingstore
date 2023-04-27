import React from 'react';

import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLIC}`);

function StripeForm({ cancel, amount, onComplete }) {

    const createPayment = async (e) => {
        e.preventDefault();

        let amountData = amount;

        const res = await fetch('/api/payments/stripe', {
            method: 'post',
            body:   JSON.stringify({
                amount:         amountData * 100, // Debe ser especificado en centavos
                description:    'Pago de suscripción'
            })
        });

        const data = await res.json();
        confirmPayment(data.client_secret);
    }

    const elements = useElements();
    const stripe = useStripe();

    const confirmPayment = async (ClientSecret = "") => {

        if(stripe){
            const {token} = await stripe.createToken(elements.getElement(CardElement));
            const result  = await stripe.confirmCardPayment(ClientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: 'Usuario de ejemplo',
                        email:'usuarioDeEjemplo@gmail.com'
                    }
                }
            });

            // console.log(result.paymentIntent.status);
            // console.log(token);
            if(result.paymentIntent.status){
                onComplete(result.paymentIntent.id);
            }
        }

    } 

    return (
        <div>
            <form onSubmit={(e) => createPayment(e)} action="">
                <div className='content-card-stripe form-control py-3'>
                    <CardElement id='card-element-stripe' />
                </div>
                <div className="col-lg-12 text-end pt-3">
                    <button 
                        // disabled={sending}
                        type='button' 
                        onClick={() => cancel()} 
                        className='btn btn-light me-2 border-secondary btn-lg fw-bold'
                    >
                        Cancelar
                    </button>
                    <button type='submit' className='btn btn-primary btn-lg fw-bold'>
                        Pagar con stripe
                    </button>
                </div>
            </form>
        </div>
    )
}

export const ContentStripeForm = ({ children }) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                {children}
            </Elements>
        </div>
    );
}

export default StripeForm