import axios from "axios";
import { API_URL } from "@/config/config";

import { setCountries, setSelectedCountry } from "@/store/slices/app";
import { getCookieFromReq } from "./functions";

export const loadInitialFunctions = async (store, req) => {
    const initialstate = store.getState();

    if(initialstate.app.countries.length === 0){
        const countries = await axios.get(`${API_URL}/countries`);
        await store.dispatch(setCountries(countries.data));

        if(countries.data.length > 0){
            let defaultCountry = null;

            const countryByCookies = getCookieFromReq(req, 'country');

            if(countryByCookies){
                defaultCountry = JSON.parse(countryByCookies);
                console.log('COUNTRY IN COOKIES', defaultCountry);
            }else{
                defaultCountry = countries.data[0];
            }

            if(initialstate.app.selectedCountry === null){
                store.dispatch(setSelectedCountry(defaultCountry));
            }
        }
    }
}