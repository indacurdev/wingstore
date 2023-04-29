import React, {useState, useEffect} from 'react'
import Layout from '@/components/app/Layout'
import Image from 'next/image'
import Link from 'next/link'

import axios from '../lib/fetch';
import { API_URL } from '@/config/config';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify';
import PublicRoute from '@/components/auth/PublicRoute';

import { useAuth } from '@/context/auth';
import { addToken } from '@/lib/fetch';
import { useRouter } from 'next/router';
import SocialBtn from '@/components/auth/SocialBtn';
import Head from 'next/head';

import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
const FacebookBtn = dynamic(
  () => import('../components/auth/FacebookBtn'),
  { ssr: false }
)

import Loader from '@/components/Loader';

function Register() {
    const auth = useAuth();
    const router = useRouter();

    const [nombre_cliente, setnombre_cliente]   = useState('');
    const [email, setemail]                     = useState('');
    const [pass, setpass]                       = useState('');
    const [repeatpass, setrepeatpass]           = useState('');

    const [loading, setloading] = useState(true);
    const [sending, setsending] = useState('');

    const [success, setsuccess] = useState(false);

    const dispatch = useDispatch();
    const session  = useSelector(state => state.session);

    const onRegister = async (e) => {
        e.preventDefault();
        const url = `/auth/register/`

        let data = {
            nombre_cliente: nombre_cliente,
            correo_cliente: email, 
            password:       pass,
            pais_id:        1
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
            result.message ? toast.success(result.message) : toast.success(`Bienvenido a wings ${result.client.nombre_cliente}!`);
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

    const handleSocialLoginByFacebook = (token) => {
        //console.log(token);
        setsuccess(true);
        axios.post(`/auth/login/facebook`, {
        token: `${token}`
        }).then((res) => {
        const result = res.data;

        if(result.result){
            result.client ? toast.success(`Bienvenido ${result.client.nombre_cliente}!`) : toast.success(result.mesagge);
            addToken(result.token);
            auth.setUser(result.token, result.client);
        }else{
            toast.error('Intente registrarse en wingstore para poder iniciar sesión');
            setsuccess(false);
        }

        }).catch((err) => {
        console.error(err);
        })
    };

    const handleSocialLoginByGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
        console.log(tokenResponse);
        setsuccess(true);
        axios.post(`/auth/login/google`, {
            token: `${tokenResponse.access_token}`
        }).then((res) => {
            const result = res.data;
    
            if(result.result){
            result.client ? toast.success(`Bienvenido ${result.client.nombre_cliente}!`) : toast.success(result.mesagge);
            addToken(result.token);
            auth.setUser(result.token, result.client);
            }else{
            toast.error('Intente registrarse en wingstore para poder iniciar sesión');
            setsuccess(false);
            }
    
        }).catch((err) => {
            console.error(err);
        })
        }
    });
  
    return (
        <PublicRoute>
            <Head>
                <title>Wings - Registro</title>
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
                {success && <Loader />}
                <div className="content-login">
                <div className="content-form w-100">
                    <div className="container">

                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-6">

                        <h1 className='fw-bold text-secondary text-center mb-3 mt-4'>
                            Únete a <span className='text-primary'>Wings</span>
                        </h1>

                        <form action="" autoComplete="false" onSubmit={(e) => onRegister(e)}>
                            <div className="card mb-3 border-0 shadow">
                            <div className="card-body py-4 px-4">
                                {/* Social auth */}
                                <div className="row mb-3">
                                    <div className="col-sm-6 col-6">
                                        <button 
                                        onClick={() => handleSocialLoginByGoogle()} 
                                        type='button'
                                        className='btn btn-lg btn-g w-100'
                                        >
                                        <i className="fa-brands fa-google me-sm-3 me-2"></i>
                                        Google
                                        </button>
                                    </div>
                                    <div className="col-sm-6 col-6">
                                        <FacebookBtn
                                        handleLogin={(token) => handleSocialLoginByFacebook(token)}
                                        />
                                    </div>
                                </div>
                                
                                <div className="content-input">

                                    <div className="form-group mb-3">
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg bg-white" 
                                            placeholder='Nombre' 
                                            name='wname'
                                            onChange={(e) => setnombre_cliente(e.target.value)}
                                        />
                                    </div>

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

                                    <div className="form-group mb-3">
                                        <input 
                                            type="password" 
                                            name='wrepeatpass'
                                            className="form-control form-control-lg bg-white" 
                                            placeholder='Repetir contraseña' 
                                            onChange={(e) => setpass(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div className=''>
                                        <button 
                                            disabled={sending}
                                            type="submit"
                                            className='btn btn-secondary w-100 btn-lg fw-bold'
                                        >
                                            {!sending ? 'Enviar' : <i className="fa-solid fa-spin fa-spinner"></i>}
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                            </div>
                        </form>

                        <p className='text-left justify-content-center d-flex align-items-center'>
                            ¿ya posees una cuenta?
                            <Link href={'/login'} className="ms-3 btn btn-sm text-secondary fw-bold">
                            iniciar sesión
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

export default Register