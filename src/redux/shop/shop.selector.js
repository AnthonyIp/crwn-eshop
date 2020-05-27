import {createSelector} from 'reselect';

const selectShop = state => state.shop;

//? get collections
export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
);

// ? get collection of specific category
// ? need part of state(collectionUrlParam)
export const selectCollection = collectionUrlParam => {
    // console.log(collectionUrlParam);
    return createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
    )
};

