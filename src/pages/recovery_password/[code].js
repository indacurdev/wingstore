import React, {useState, useEffect} from 'react'
import Layout from '@/components/app/Layout'
import Image from 'next/image'
import Link from 'next/link'

import axios from '../../lib/fetch';
import { API_URL } from '@/config/config';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify';
import PublicRoute from '@/components/auth/PublicRoute';
import Head from 'next/head';
import { useAuth } from '@/context/auth';
import Loader from '@/components/Loader';
import {useRouter} from 'next/router'

function RecoveryPasswordByCode() {
    const [loading, setloading] = useState(true);
    const [sending, setsending] = useState('');
    const [success, setsuccess] = useState(false);
    const router = useRouter();
    const query  = router.query;

    const code_confirmation = query.code;
    const [new_password, setnew_password] = useState('');
    const [passwordconfirmation, setpasswordconfirmation] = useState('');

    const [errors, seterrors] = useState({});

    const changePassword = (e) => {
        e.preventDefault();
        let errors = {};
        let countErrors = 0;
        seterrors({});

        if(new_password.trim() === ""){
            errors.new_password = 'Debe ingresar su contraseña nueva';
            countErrors++;
        }

        if(passwordconfirmation.trim() === ""){
            errors.passwordconfirmation = 'Debe confirmar su contraseña';
            countErrors++;
        }else if(passwordconfirmation.trim() !== new_password.trim()){
            errors.passwordconfirmation = 'Las contraseñas deben ser iguales';
            countErrors++;
        }

        if(countErrors > 0){
            toast.error(`Verifique los datos del formulario`);
            seterrors(errors);
            window.scroll(0, (document.getElementById("form-recovery").offsetTop - 70));
        }else{

            setsending(true);

            let data = {
                code_confirmation: code_confirmation,
                new_password: new_password
            }

            const url = `/change_password_final`;
            console.log(data);

            axios({
                url,
                method: 'post',
                data: data
            }).then((res) => {
                const result = res.data;
                console.log(result);

                if(result.result){
                    toast.success(result.message);
                    setsending(false);

                    setnew_password(``);
                    setpasswordconfirmation(``);

                    document.getElementById(`form-recovery`).reset();
                    router.push('/login');
                }else{
                    toast.error(result.message);
                    window.scroll(0, (document.getElementById("form-recovery").offsetTop - 70));
                    setsending(false);
                }
            }).catch((err) => {
                console.error(err);
                setsending(false);
            });
        }
    }

    return (
        <PublicRoute>
            <Head>
                <title>Wings - Restaurar contraseña</title>
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
                <div className="container">
                    <div>
                        <h1 className='fw-bold text-secondary text-center mb-3'>
                            Restaurar contraseña
                        </h1>
                        <p className='text-center'>
                            Ahora puede ingresar una nueva contraseña con 
                            la que podrá iniciar sesión con 
                            su cuenta en <span className='fw-bold text-primary'>Wings</span>
                        </p>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-7">
                            <div className="content-form w-100">
                                <div className="container">
                                    <form 
                                        action="" 
                                        autoComplete="false" 
                                        onSubmit={(e) => changePassword(e)}
                                        id='form-recovery'
                                    >
                                        <div className="card mb-3 border-0 shadow">
                                            <div className="card-body py-4 px-4">
                                                <div className="row">
                                                    <div className="form-group mb-3">
                                                        <input 
                                                            type="password" 
                                                            className="form-control form-control-lg bg-white" 
                                                            placeholder='Contraseña' 
                                                            name='wpassword'
                                                            onChange={(e) => setnew_password(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group mb-3">
                                                        <input 
                                                            type="password" 
                                                            className="form-control form-control-lg bg-white" 
                                                            placeholder='Repetir contraseña' 
                                                            name='wpasswordconfirmation'
                                                            onChange={(e) => setpasswordconfirmation(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className=''>
                                                        <button 
                                                            disabled={sending}
                                                            type="submit"
                                                            className='btn btn-outline-secondary w-100 btn-lg fw-bold'
                                                        >
                                                            {!sending ? <span>Restaurar contraseña</span> : <i className="fa-solid fa-spin fa-spinner"></i>}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicRoute>
    )
}

export default RecoveryPasswordByCode