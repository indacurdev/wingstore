import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import {useAuth} from "../../context/auth"
import Loader from '../Loader';

function PublicRoute({ children }) {
  const {auth} = useAuth();
  const router  = useRouter();
  const query   = router.query;

  console.log('auth', auth);

  useEffect(() => {
    if(auth){
      if(query.nextPage && query.nextPage !== ""){
        router.push(query.nextPage);
      }else{
        router.push('/');
      }
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