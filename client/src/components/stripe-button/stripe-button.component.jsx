import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_LRjOwcvlSbA6Im8zJZ4zHErj00UxY0jHvB'

    /*Token on successful callback*/
    const onToken = token => {
        // console.log('token stripe payment:', token);
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment was successful')
        }).catch(error => {
            console.log('Payment Error: ', error);
            alert('There was an issue with your payment! Please make sure you use the provided credit card.')
        })
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN STREETWEVR Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
