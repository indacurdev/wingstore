import { configureStore, ThunkAction, Action, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from 'redux-persist'
import {createWrapper, HYDRATE} from "next-redux-wrapper";

//slices
import { appSlice } from "./slices/app";
import { sessionSlice } from "./slices/session";
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
   return {
      getItem(_key) {
         return Promise.resolve(null);
      },
      setItem(_key, value) {
         return Promise.resolve(value);
      },
      removeItem(_key) {
         return Promise.resolve();
      },
   };
};
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['session']
}

const rootReducer = combineReducers({
  session:  sessionSlice.reducer,
  app:      appSlice.reducer
});

const makeConfiguredStore = () => configureStore({
    reducer: rootReducer,
    devTools:   process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    }),
});

export const makeStore = () => {

  const isServer = typeof window === "undefined";
  
  if (isServer) {

    return makeConfiguredStore();

  } else {

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    
    let store = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),
    });

    store.__persistor = persistStore(store); // Nasty hack
    return store;
    
  }
};

export const wrapper = createWrapper(makeStore);