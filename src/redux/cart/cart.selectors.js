import {createSelector} from 'reselect';

const selectCart = state => state.cart;

//? Get state cart items
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

//? Get state cart hidden
export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

//? Get state total cart items quantity
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumalatedQuantity, cartItem) =>
                accumalatedQuantity + cartItem.quantity,
            0
        )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumalatedQuantity, cartItem) =>
                accumalatedQuantity + cartItem.quantity * cartItem.price,
            0
        )
);
