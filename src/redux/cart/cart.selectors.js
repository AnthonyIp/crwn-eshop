import {createSelector} from 'reselect';

const selectCart = state => state.cart;

//? Get state cart items
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

//? Get state total cart items quantity
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
            0
        )
);
