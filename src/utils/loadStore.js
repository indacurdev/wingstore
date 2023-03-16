import axios from "axios";
import { API_URL } from "@/config/config";

import { setBanners, setCountries, setPaymentMethods, setSelectedCountry } from "@/store/slices/app";
import { getCookieFromReq } from "./functions";

export const loadInitialFunctions = async (store, req) => {
    const initialstate = store.getState();
    let defaultCountry = null;

    if(initialstate.app.countries.length === 0){

        const countries = await axios.get(`${API_URL}/countries`);
        await store.dispatch(setCountries(countries.data));

        if(countries.data.length > 0){

            const countryByCookies = getCookieFromReq(req, 'country');

            if(countryByCookies){
                defaultCountry = JSON.parse(countryByCookies);
                // console.log('COUNTRY IN COOKIES', defaultCountry);
            }else{
                defaultCountry = countries.data[0];
            }

            if(initialstate.app.selectedCountry === null){
                store.dispatch(setSelectedCountry(defaultCountry));
            }
        }

    }

    if(initialstate.app.paymentMethods.length === 0){
        const methods = await axios.get(`${API_URL}/methods/${defaultCountry.id}`);
        await store.dispatch(setPaymentMethods(methods.data));
    }

    if(initialstate.app.banners.length === 0){
        const banners = await axios.get(`${API_URL}/banners/${defaultCountry.id}`);
        await store.dispatch(setBanners(banners.data));
    }
}