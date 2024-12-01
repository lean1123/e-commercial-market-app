import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../configurations/firebaseConfig";

const initialState = {
  searchValue: "",
  rangePrice: [0, 1000000],
  rating: 0,
  category: "",
  subCategory: "",
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "search/fetchProducts",
  async ({ searchValue, category, subCategory, rangePrice, rating }) => {
    try {
      const q = query(
        collection(db, "products"),
        orderBy("name"),
        startAt(searchValue || ""),
        endAt(searchValue + "\uf8ff"),
        where("price", ">=", rangePrice[0]),
        where("price", "<=", rangePrice[1]),
        where("rating", ">=", rating),
        where("category", "==", category),
        where("subCategory", "==", subCategory)
      );

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Data: ", data);

      return data;
    } catch (error) {
      console.error("Error fetching products: ", error);
      throw error;
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
    setRangePrice: (state, action) => {
      state.rangePrice = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(action.error.message);
      });
  },
});

export const {
  setSearchValue,
  setCategory,
  setSubCategory,
  setRangePrice,
  setRating,
} = searchSlice.actions;
export default searchSlice.reducer;
