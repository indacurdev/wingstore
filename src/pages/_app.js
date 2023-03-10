import React, {useEffect} from "react";
import Head from "next/head";
import App from 'next/app';
import Cookies from "js-cookie";

import { Provider, useDispatch, useSelector } from "react-redux";

import { wrapper } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { loadInitialFunctions } from "@/utils/loadStore";

import "../styles/sass/style.scss"

function MyApp({ Component, ...rest }) {

  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  useEffect(() => {
    const initialStoreAfterLoading = store.getState();
    const country = initialStoreAfterLoading.app.selectedCountry;
    
    // console.log(country);

    const countrystr = JSON.stringify(country);
    Cookies.set('country', countrystr);
  }, [store]);
  
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Provider store={store}>
      <PersistGate 
        persistor={store.__persistor} 
        loading={<div>Loading</div>}
      >
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  </>
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (appContext) => {
  await loadInitialFunctions(store, appContext.ctx.req);
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps }
});

export default MyApp;
