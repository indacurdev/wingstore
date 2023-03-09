import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    auth: false
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setAuth(state, action) {
            state.auth = action.payload;
        },

        extraReducers: {
            [HYDRATE]: (state, action) => {
              return {
                ...state,
                ...action.payload.auth,
              };
            },
        },
    }  
});

export const { setAuth } = sessionSlice.actions;
export const selectAuthState = (state) => state.session.auth;

export default sessionSlice.reducer;