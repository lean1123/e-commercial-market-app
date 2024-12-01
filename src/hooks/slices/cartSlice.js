import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../configurations/firebaseConfig";

export const fetchNumOfItemsInCart = createAsyncThunk(
  "cart/fetchNumOfItemsInCart",
  async (filter) => {
    console.log("Filter: ", filter);

    const q = query(
      collection(db, "carts"),
      where("userId", "==", filter.userId),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return 0;
    }
    const data = querySnapshot.docs[0].data();
    return data.cartDetails.length;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    numOfItemsInCart: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNumOfItemsInCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNumOfItemsInCart.fulfilled, (state, action) => {
        state.numOfItemsInCart = action.payload;
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(fetchNumOfItemsInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
