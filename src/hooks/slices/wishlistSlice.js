import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        active: false,
    },
    reducers: {
        toggleWishlist: (state) => {
            state.active = !state.active;
        },
    },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;