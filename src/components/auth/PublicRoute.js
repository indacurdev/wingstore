import React, { useEffect } from 'react'
import Router from 'next/router'
import {useAuth} from "../../context/auth"
import Loader from '../Loader';

function PublicRoute({ children }) {
  const {auth} = useAuth();
  console.log('auth', auth);

  useEffect(() => {
    if(auth){
      Router.push('/');
    }
  }, [auth]);

  return (
    <>
      {!auth ?
        <div>
          {children}
        </div>
      :
        <Loader />
      }
    </>
  )
}

export default PublicRoute