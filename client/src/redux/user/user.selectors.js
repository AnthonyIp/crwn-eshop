import {createSelector} from 'reselect';

const selectUser = state => state.user;

//? Get state current user
export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);
