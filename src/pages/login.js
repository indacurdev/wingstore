import React, {useState, useEffect} from 'react'
import Layout from '@/components/app/Layout'
import Image from 'next/image'
import Link from 'next/link'

import axios from 'axios';
import { API_URL } from '@/config/config';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import PublicRoute from '@/components/auth/PublicRoute';

import { useAuth } from '@/context/auth';
import { addToken } from '@/lib/fetch';
import { useRouter } from 'next/router';
import SocialBtn from '@/components/auth/SocialBtn';
import Head from 'next/head';

function Login() {
  const auth = useAuth();
  const router = useRouter();

  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [loading, setloading] = useState(true);
  const [sending, setsending] = useState('');

  const dispatch = useDispatch();
  const session  = useSelector(state => state.session);

  const onLogin = async (e) => {
    e.preventDefault();
    const url = `${API_URL}/auth/login/`

    let data = {
      correo_cliente: email, 
      password: pass
    }

    setsending(true);

    axios({
      method: "post",
      url,
      data
    }).then((res) => {

      let result = res.data;

      if(result.token){
        //login

        console.log(result);
        result.message ? toast.success(result.message) : toast.success(`Bienvenido ${result.client.nombre_cliente}!`);
        addToken(result.token);
        auth.setUser(result.token, result.client);

      }else{

        //error
        toast.error('Por favor verifique sus datos');

      }

      setsending(false);

    }).catch((err) => {

      let res = err.response;
      if(res.data){
        let res = err.response.data;
        console.error(res);
        setsending(false);
      }

    });
  }

  useEffect(() => {
    const {msg} = router.query;
    if(loading) {
      if(msg){
        if(msg === 'tkn'){
          toast.info('Debe iniciar sesión para ver esta sección');
        }else if(msg === 'exp'){
          toast.info('Su sesión ha expirado');
        }
      }

      setloading(false);
    }
  }, []);

  const handleSocialLogin = (user) => {
    console.log(user);
  };
  
  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  return (
    <PublicRoute>
      <Head>
          <title>Wings - Login</title>
      </Head>
      <Layout blank>
          <div className="header-blank">
            <div className='container'>
              <div className="col-lg-1 col-2">
                <div className="w-75">
                  <Link href={`/`}>
                    <Image 
                      src="/img/isotipo.png" 
                      width={500}
                      height={500} 
                      alt="" 
                      className='img-fluid' 
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="content-login">
            <div className="content-form w-100">
              <div className="container">

                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-6">

                    <h1 className='fw-bold text-secondary text-center mb-3'>
                      Inicia sesión en <span className='text-primary'>Wings</span>
                    </h1>

                    <form action="" autoComplete="false" onSubmit={(e) => onLogin(e)}>
                      <div className="card mb-3 border-0 shadow">
                        <div className="card-body py-4 px-4">
                            <div className="content-input">
                              <div className="form-group mb-3">
                                <input 
                                  type="text" 
                                  className="form-control form-control-lg bg-white" 
                                  placeholder='Correo electrónico' 
                                  name='wemail'
                                  onChange={(e) => setemail(e.target.value)}
                                />
                              </div>
                              
                              <div className="form-group mb-3">
                                <input 
                                  type="password" 
                                  name='wpass'
                                  className="form-control form-control-lg bg-white" 
                                  placeholder='Contraseña' 
                                  onChange={(e) => setpass(e.target.value)}
                                />
                              </div>

                              <Link href={'/'} className="mb-3 text-secondary d-inline-flex link-unstyled">
                                ¿Olvidaste tu contraseña?
                              </Link>
                              
                              <div className=''>
                                <button 
                                  disabled={sending}
                                  type="submit"
                                  className='btn btn-primary w-100 btn-lg fw-bold'
                                >
                                  {!sending ? 'Iniciar sesión' : <i className="fa-solid fa-spin fa-spinner"></i>}
                                </button>
                              </div>

                              {/* 
                                <SocialBtn
                                  provider="facebook"
                                  appId={`${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}`}
                                  onLoginSuccess={handleSocialLogin}
                                  onLoginFailure={handleSocialLoginFailure}
                                >
                                  Facebook
                                </SocialBtn>
                              */}

                              
                            </div>
                        </div>
                      </div>
                    </form>

                    <p className='text-left justify-content-center d-flex align-items-center'>
                      ó
                      <Link href={'/'} className="ms-3 btn btn-sm text-secondary fw-bold">
                        Volver al inicio
                      </Link>
                    </p>

                  </div>
                </div>

              </div>
            </div>
          </div>
      </Layout>
    </PublicRoute>
  )
}

export default Login