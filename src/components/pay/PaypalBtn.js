import React from 'react'
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from 'axios';

const clientId          = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
// const clientSecret   = process.env.PAYPAL_CLIENT_SECRET;

const Button = () => {
    const [{ isPending }] = usePayPalScriptReducer();
    return (
        <div>
            {!isPending ?
                <PayPalButtons 
                    createOrder={async () => {
                        try{

                            const res = await axios({
                                url:    '/api/payments/paypal',
                                method: 'POST',
                                data: {
                                    amount: props.amount
                                },
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
                        //console.log(data);
                        console.log('pago realizado exitosamente');
                        actions.order.capture();
                        props.onComplete(data);

                    }}
                    style={{ layout: "horizontal" }} 
                />
            :
                <i className="fa-solid fa-spin fa-spinner"></i>
            }
        </div>
    )
}

function PaypalBtn(props) {
    return (
        <div>
            <PayPalScriptProvider options={{ "client-id": clientId }}>
                <Button />
            </PayPalScriptProvider>
        </div>
    )
}

export default PaypalBtn