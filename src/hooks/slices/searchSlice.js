import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { db } from '../../configurations/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const initialState = {
    searchValue: '',
    category: 'Electronics',
    subCategory: 'Mobile',
    products: [],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk(
    'search/fetchProducts',
    async (filter) => {
        const q = query(
            collection(db, 'products'),
            where('category', '==', filter.category),
            where('subCategory', '==', filter.subCategory)
        );

        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data()
        }));
        console.log(data);
        return data;
    }
);


const searchSlice = createSlice({
    name: 'search',
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
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
        });
        
    }
});

export const {setSearchValue, setCategory, setSubCategory} = searchSlice.actions;
export default searchSlice.reducer;