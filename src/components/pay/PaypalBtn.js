import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';

const clientId          = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
// const clientSecret   = process.env.PAYPAL_CLIENT_SECRET;

function PaypalBtn() {
    // console.log(clientId);

    return (
        <div>
            <PayPalScriptProvider options={{ "client-id": clientId }}>
                <PayPalButtons 
                    createOrder={async () => {
                        try{

                            const res = await axios({
                                url:    '/api/payments/paypal',
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                            });

                            return res.data.id;

                        } catch (error) {

                            console.log(error);

                        }
                    }}
                    onCancel={(data) => console.log('compra cancelada')}
                    onApprove={(data, actions) => {
                        console.log(data);
                        actions.order.capture();
                    }}
                    style={{ layout: "horizontal" }} 
                />
            </PayPalScriptProvider>
        </div>
    )
}

export default PaypalBtn