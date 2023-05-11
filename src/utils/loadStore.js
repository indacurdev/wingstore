import {verify} from 'jsonwebtoken'
import axios, { addToken, removeToken } from "@/lib/fetch";
import { setBanners, setCountries, setPaymentMethods, setSelectedCountry } from "@/store/slices/app";
import { getCookieFromReq } from "./functions";
import { logout, setAuth } from "@/store/slices/session";

export const loadInitialFunctions = async (store, req) => {
    const initialstate = store.getState();
    let defaultCountry = null;
    // console.log(initialstate);

    // si existe un token en las cookies
    if(initialstate.app.countries.length === 0){

        const token = getCookieFromReq(req, 'wtoken');
        console.log('token', token);

        if(token && token !== ""){
            try {
                var decoded = verify(token, process.env.JWT_SECRET);
                console.log(decoded);
                await addToken(token);
                
                const me = await axios.get(`/auth/me`);
                console.log(me.data);
                await store.dispatch(setAuth(me.data));
                
            } catch(err) {
                await removeToken(token);
                await store.dispatch(logout());
                console.log('token no valido');
            }
        }

        const countries = await axios.get(`/countries`);
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
                await store.dispatch(setSelectedCountry(defaultCountry));
            }
        }

        if(initialstate.app.paymentMethods.length === 0){
            // const methods = await axios.get(`/methods/${defaultCountry.id}`);
            // await store.dispatch(setPaymentMethods(methods.data));
        }
    
        if(initialstate.app.banners.length === 0){
            //console.log(defaultCountry);
            const banners = await axios.get(`/banners/${defaultCountry.id}`);
            await store.dispatch(setBanners(banners.data));
        }
    }
}