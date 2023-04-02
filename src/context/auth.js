import React, { useState, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import cookie from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { logout, setAuth } from "@/store/slices/session";

const AuthContext  = React.createContext(null);
// const { Provider } = AuthContext;

export const AuthProvider = ({ children }) => {
    const dispatch          = useDispatch();
    const session           = useSelector(state => state.session);
    const auth              = session.auth;

    const setUser = async (token, user) => {
        cookie.set('wtoken', token);
        await dispatch(setAuth(user));
    }

    const handleLogout = async () => {
        cookie.remove('wtoken');
        await dispatch(logout());
    }

    return (
        // Using the provider so that ANY component in our application can 
        // use the values that we are sending.

        <AuthContext.Provider value={{ auth, setUser, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);