import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    countries: [],
    selectedCountry : null
};

const hydrate = createAction(HYDRATE);

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setCountries(state, action) {
            state.countries = action.payload;
        },
        setSelectedCountry(state, action) {
            state.selectedCountry = action.payload;
        }
    },
    extraReducers: {
        [hydrate]: (state, action) => {
            return {
                ...state,
                ...action.payload.app,
            };
        },
    }, 
});

export const { setCountries, setSelectedCountry } = appSlice.actions;
export default appSlice.reducer;