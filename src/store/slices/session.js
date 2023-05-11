import { createSlice, createAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    auth: false,
    user: null,
    profile: null
};

const hydrate = createAction(HYDRATE);

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setAuth(state, action) {
            state.auth = true;
            state.user = action.payload.user;
            state.profile = action.payload.profile;
        },
        logout(state, action) {
            state.auth      = false;
            state.user      = null;
            state.profile   = null;
        },
        updateUser(state, action) {
            state.user = action.payload;
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

export const { setAuth, logout, updateUser } = sessionSlice.actions;
export const selectAuthState = (state) => state.session.auth;

export default sessionSlice.reducer;