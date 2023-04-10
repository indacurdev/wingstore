import React, {useEffect} from "react";
import Head from "next/head";
import App from 'next/app';
import Cookies from "js-cookie";

import { Provider, useDispatch, useSelector } from "react-redux";

import { wrapper } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { loadInitialFunctions } from "@/utils/loadStore";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../styles/sass/style.scss"

import Router from "next/router";
import NProgress from 'nprogress'
import Loader from "@/components/Loader";
import { AuthProvider } from "@/context/auth";

function MyApp({ Component, ...rest }) {

  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  Router.events.on("routeChangeStart", (url) => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", (url)=>{
    NProgress.done(false);
  });

  Router.events.on("routeChangeError", (url) =>{
    NProgress.done(false);
  });

  useEffect(() => {
    const initialStoreAfterLoading = store.getState();
    const country = initialStoreAfterLoading.app.selectedCountry;

    const countrystr = JSON.stringify(country);
    Cookies.set('country', countrystr);
  }, [store]);
  
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" href="/img/isotipo.png"></link>
    </Head>
    <Provider store={store}>
      <PersistGate 
        persistor={store.__persistor} 
        loading={<Loader />}
      >
        <AuthProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </AuthProvider>
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
