import {createSlice} from "@reduxjs/toolkit";

const userRedux = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        error: false,
        errorMessage: null
    },
    reducers: {
        processStart: (state) => {
            state.errorMessage = null;
            state.error = false;
        },
        processSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.errorMessage = null;
            state.error = false;
        },
        processFailure: (state, action) => {
            state.errorMessage = action.payload;
            state.error = true;
        },
        processLogout: (state) => {
            state.currentUser = null;
            state.errorMessage = null;
            state.error = false;
        }
    }
});

export const {processStart, processSuccess, processFailure, processLogout} = userRedux.actions;
export default userRedux.reducer;