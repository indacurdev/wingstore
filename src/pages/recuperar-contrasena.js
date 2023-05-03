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
import Head from 'next/head';
import { useAuth } from '@/context/auth';

import Loader from '@/components/Loader';

function Login() {

    const auth = useAuth();
    //const router = useRouter();

    const [email,   setemail] = useState('');
    const [loading, setloading] = useState(true);
    const [sending, setsending] = useState('');
    const [success, setsuccess] = useState(false);

    const goToRecoverPassword = (e) => {
        e.preventDefault();

        const url = `/auth/change_password_reset`
        let data = {
            correo_cliente: email
        }

        setsending(true);

        axios({
            method: "post",
            url,
            data
        }).then((res) => {
    
            let result = res.data;
            //console.log(result);

            if(result.result){
                // toast.success(`Se le ha enviado un correo electrónico de recuperación de contraseña, revise su bandeja de entrada`);
                setsuccess(true);
            }else{
                toast.error(`Algo salio mal, por favor revise la información suministrada`);
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

    return (
        <PublicRoute>
            <Head>
                <title>Wings - Recuperar contraseña</title>
            </Head>
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
            <div className="content-login min-w-75">
                <div className="content-form w-100">
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            {!success ?
                            <div className="col-lg-7">
                                <h1 className='fw-bold text-secondary text-center mb-3'>
                                    Recuperar contraseña
                                </h1>
                                <p className='text-center'>
                                    Siga los pasos correspondientes para poder recuperar su contraseña
                                </p>
                                <form action="" autoComplete="false" onSubmit={(e) => goToRecoverPassword(e)}>
                                    <div className="card mb-3 border-0 shadow">
                                        <div className="card-body py-4 px-4">
                                            <div className="row">
                                                <div className="form-group mb-3">
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-lg bg-white" 
                                                        placeholder='Correo electrónico' 
                                                        name='wemail'
                                                        onChange={(e) => setemail(e.target.value)}
                                                    />
                                                </div>
                                                <div className=''>
                                                    <button 
                                                        disabled={sending}
                                                        type="submit"
                                                        className='btn btn-outline-secondary w-100 btn-lg fw-bold'
                                                    >
                                                        {!sending ? <span>Enviar<i class="fa-solid fa-paper-plane ms-3"></i></span> : <i className="fa-solid fa-spin fa-spinner"></i>}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className='text-left justify-content-center d-flex align-items-center'>
                                        ¿ya posees una contraseña? intenta
                                        <Link href={'/login'} className="ms-3 btn btn-sm text-secondary fw-bold">
                                            iniciar sesión
                                        </Link>
                                    </p>
                                </form>
                            </div>
                            :    
                            <div className="col-lg-7">
                                <div className="card border-0 w-100 shadow py-3">
                                    <div className="card-body">
                                        <div className="text-center">
                                            <div className='mb-3 text-success'>
                                                <i class="fa-regular fa-6x fa-circle-check"></i>
                                            </div>
                                            <p className='h5 mb-0'>
                                                Se le ha enviado un correo electrónico de recuperación
                                            </p>
                                            <p className="h5">
                                                revise su bandeja de entrada.
                                            </p>
                                            <Link href={`/`} className='btn btn-secondary mt-3 px-4'>
                                                Volver al inicio
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </PublicRoute>
    );
}

export default Login