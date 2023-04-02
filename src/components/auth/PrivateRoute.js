import React, { useEffect } from 'react';
import { useAuth } from '@/context/auth';
import Router, { useRouter } from 'next/router';
import Loader from '../Loader';

function PrivateRoute({ children }) {
  const {auth} = useAuth();
  const router = useRouter();

  // console.log('auth', auth);

  useEffect(() => {
    let pathname = router.pathname;
    // console.log(`Actual path: ${pathname}`);
  }, [auth]);

  return (
    <>
      {auth ?
        <div>
          {children}
        </div>
      :
        <Loader />
      }
    </>
  )
}

export default PrivateRoute