import { createSlice, createAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    auth: false,
    user: null
};

const hydrate = createAction(HYDRATE);

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setAuth(state, action) {
            state.auth = true;
            state.user = action.payload;
        },
        logout(state, action) {
            state.auth = false;
            state.user = null;
        }
    },
    extraReducers: {
        [hydrate]: (state, action) => {
            return {
                ...state,
                ...action.payload.session,
            };
        }
    }
});

export const { setAuth, logout } = sessionSlice.actions;
export const selectAuthState = (state) => state.session.auth;

export default sessionSlice.reducer;