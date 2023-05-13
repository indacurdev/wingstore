import client from '../../../lib/paypal'
import paypal from '@paypal/checkout-server-sdk'

export default async function handler(req, res) {
    const PaypalClient = client();

    if(req.method === 'POST'){

        const request = await new paypal.orders.OrdersCreateRequest();
        request.headers['prefer'] = 'return=representation';
        const body = req.body;

        //return res.json({data: req.method, body: req.body});

        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: `${body.amount}`,
                    },
                },
            ],
        });

        const response = await PaypalClient.execute(request);

        if (response.statusCode !== 201) {
            res.status(500);
        }

        return res.json({ id: response.result.id });
    }
}