import React from 'react';

import'./checkout-item.styles.scss';

const CheckoutItem = ({cartItem: {imageUrl, name, quantity, price }}) => {
    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt=""/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">{quantity}</span>
            <span className="price">{price}</span>
            <span className="remove">&#10005;</span>
        </div>
    );
};

export default CheckoutItem;
