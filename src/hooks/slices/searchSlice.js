import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../configurations/firebaseConfig";
import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";

const initialState = {
  searchValue: "",
  rangePrice: [0, 1000000],
  rating: 0,
  category: "Electronics",
  subCategory: "Mobile",
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "search/fetchProducts",
  async (filter) => {
    const q = query(
      collection(db, "products"),
      orderBy("name"),
      startAt(filter.searchValue),
      endAt(filter.searchValue + "\uf8ff"),
      where("price", ">=", filter.rangePrice[0]),
      where("price", "<=", filter.rangePrice[1]),
      where("rating", ">=", filter.rating),
      where("category", "==", filter.category),
      where("subCategory", "==", filter.subCategory)
    );

    const querySnapshot = await getDocs(q);

    console.log();

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
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
