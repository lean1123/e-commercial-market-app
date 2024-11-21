import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';
import wishlistSlice from './slices/wishlistSlice';
import notificationSlice from './slices/notificationSlice';



const store = configureStore({
    reducer: {
        search: searchSlice,
        wishlist: wishlistSlice,
        notification: notificationSlice,
    }
});

export default store;