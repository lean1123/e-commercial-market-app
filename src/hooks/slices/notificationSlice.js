import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configurations/firebaseConfig";

export const fetchNumOfUnreadNotifications = createAsyncThunk(
    "notification/fetchNumOfUnreadNotifications",
    async (filter) => {
        const q = query(
            collection(db, "notifications"),
            where("userId", "==", filter.userId),
            where("read", "==", false)
        );

        const querySnapshot = await getDocs(q);
        console.log("Unread Notifications:", querySnapshot.size);

        return querySnapshot.size;
    }
);

const initialState = {
    numOfUnreadNotifications: 0,
    loading: false,
    error: null,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNumOfUnreadNotifications.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchNumOfUnreadNotifications.fulfilled, (state, action) => {
            state.numOfUnreadNotifications = action.payload;
            state.loading = false;
        })
        .addCase(fetchNumOfUnreadNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default notificationSlice.reducer;