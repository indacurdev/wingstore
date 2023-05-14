import React, {useState} from 'react';
import Head from 'next/head';
import PrivateRoute from '@/components/auth/PrivateRoute';
import Layout from '@/components/app/Layout';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Link from 'next/link';
import axios from '../../lib/fetch'
import AccountMenu from '@/components/AccountMenu';
import { toast } from 'react-toastify';
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux';

function Config(props) {

    const session = useSelector((state) => state.session);
    const nopass = session.profile.nopassword;
    //const distpatch = useDispatch();

    console.log(session);

    const [password, setpassword]                   = useState('');
    const [newPassword, setnewPassword]             = useState('');
    const [confirmPassword, setconfirmPassword]     = useState('');

    const [sending, setsending]                     = useState(false);
    const [errors, seterrors]                       = useState({});


    const data = props.data;
    console.log(`data sales`, data);

    const changePassword = (e) => {
        e.preventDefault();
        let errors = {};
        let countErrors = 0;
        seterrors({});


        if(password.trim() === "" && !nopass){
            errors.password = 'Ingrese su contraseña actual';
            countErrors++;
        }

        if(newPassword.trim() === ""){
            errors.newPassword = 'Debe ingresar su contraseña nueva';
            countErrors++;
        }

        if(!nopass){
            if(confirmPassword.trim() === "" && !nopass){
                errors.confirmPassword = 'Debe confirmar su contraseña';
                countErrors++;
            }else if(confirmPassword.trim() !== newPassword.trim()){
                errors.confirmPassword = 'Las contraseñas deben ser iguales';
                countErrors++;
            }
        }

        if(countErrors > 0){
            toast.error(`Verifique los datos del formulario`);
            seterrors(errors);
            window.scroll(0, (document.getElementById("cardConfig").offsetTop - 70));
        }else{
            setsending(true);

            let data = {};

            if(!nopass){
                data = {
                    password: password,
                    new_password: newPassword
                }
            }else{
                data = {
                    new_password: newPassword
                }
            }

            const url = `/auth/reset_password`;

            axios({
                url,
                method: 'post',
                data
            }).then((res) => {
                const result = res.data;
                console.log(result);

                if(result.result){
                    toast.success(result.message);
                    document.getElementById(`formChangePassword`).reset();
                    window.scroll(0, (document.getElementById("cardConfig").offsetTop - 70));

                    if(nopass){
                        Router.reload(window.location.pathname);
                    }else{
                        setsending(false);
                        setpassword(``);
                        setnewPassword(``);
                        setconfirmPassword(``);
                    }
                }else{
                    toast.error(result.message);
                    window.scroll(0, (document.getElementById("cardConfig").offsetTop - 70));
                    setsending(false);
                }
            }).catch((err) => {
                console.error(err);
                setsending(false);
            });
        }
    }
    
    return (
        <PrivateRoute>
            <Head>
                <title>Wings - Configuración</title>
            </Head>
            <Layout>
                <div className="page-content-wrapper">
                    <div className="content-breadcrumb">
                        <div className="container">
                            <Breadcrumb>
                                <li className='breadcrumb-item'>
                                    <Link href="/">Inicio</Link>
                                </li>
                                <li className='breadcrumb-item'>
                                    <a href="#">cuenta</a>
                                </li>
                                <Breadcrumb.Item active>Configuración</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div style={{ paddingBottom: 100 }}>
                        <div className="container py-4">
                            <div className="row">

                                <div className="col-lg-3">
                                    <div className="card border-0">
                                        <AccountMenu />
                                    </div>
                                </div>

                                <div className="col-lg-9">
                                    <h1 className='fw-bold text-secondary h2 mb-4'>
                                        Configuración
                                    </h1>
                                    
                                    <div className="card border-0" id='cardConfig'>

                                        {!nopass ?
                                            <div className="card-body">
                                                <h4 className='fw-bold h5' id='changePassword'>
                                                    Cambiar contraseña
                                                </h4>

                                                <form id='formChangePassword' onSubmit={(e) => changePassword(e)} action="">
                                                    <div className="row">
                                                        <div className={((errors[`password`]) ? "has-error" : "") + ` col-lg-12 py-2`}>
                                                            <label htmlFor="password" className='mb-2'>
                                                                Contraseña actual
                                                            </label>
                                                            <input 
                                                                type="password" 
                                                                className='form-control'
                                                                placeholder='****'
                                                                id='password'
                                                                onChange={(e) => setpassword(e.target.value)}
                                                            />
                                                            {errors[`password`] &&
                                                                <div className='text-danger fw-bold small py-2 small'>
                                                                    {errors[`password`]}
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className={((errors[`newPassword`]) ? "has-error" : "") + ` col-lg-6 py-2`}>
                                                            <label htmlFor="newPass" className='mb-2'>
                                                                Contraseña nueva
                                                            </label>
                                                            <input 
                                                                type="password" 
                                                                className='form-control'
                                                                placeholder='****'
                                                                id='newPass'
                                                                onChange={(e) => setnewPassword(e.target.value)}
                                                            />
                                                            {errors[`newPassword`] &&
                                                                <div className='text-danger fw-bold small py-2 small'>
                                                                    {errors[`newPassword`]}
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className={((errors[`confirmPassword`]) ? "has-error" : "") + ` col-lg-6 py-2`}>
                                                            <label htmlFor="repeatPass" className='mb-2'>
                                                                Repetir contraseña
                                                            </label>
                                                            <input 
                                                                type="password" 
                                                                className='form-control'
                                                                placeholder='****'
                                                                id='repeatPass'
                                                                onChange={(e) => setconfirmPassword(e.target.value)}
                                                            />
                                                            {errors[`confirmPassword`] &&
                                                                <div className='text-danger fw-bold small py-2 small'>
                                                                    {errors[`confirmPassword`]}
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="text-end mt-2">
                                                        <button 
                                                            type='submit' 
                                                            className='btn btn-primary fw-bold'
                                                            disabled={sending}
                                                        >
                                                            {sending ? <i className="fa-solid fa-spin fa-spinner"></i> : `Cambiar contraseña`}
                                                            
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        :
                                            <div className="card-body">
                                                <h4 className='fw-bold h5' id='changePassword'>
                                                    Crear contraseña
                                                </h4>
                                                <form id='formChangePassword' onSubmit={(e) => changePassword(e)} action="">
                                                    <div className="row">
                                                        <div className={((errors[`newPassword`]) ? "has-error" : "") + ` col-lg-12 py-2`}>
                                                            <label htmlFor="newPass" className='mb-2'>
                                                                Contraseña nueva
                                                            </label>
                                                            <input 
                                                                type="password" 
                                                                className='form-control'
                                                                placeholder='****'
                                                                id='newPass'
                                                                onChange={(e) => setnewPassword(e.target.value)}
                                                            />
                                                            {errors[`newPassword`] &&
                                                                <div className='text-danger fw-bold small py-2 small'>
                                                                    {errors[`newPassword`]}
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="text-end mt-2">
                                                        <button 
                                                            type='submit' 
                                                            className='btn btn-primary fw-bold'
                                                            disabled={sending}
                                                        >
                                                            {sending ? <i className="fa-solid fa-spin fa-spinner"></i> : `Cambiar contraseña`}
                                                            
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </PrivateRoute>
    );
}

Config.getInitialProps = async ({ req, res }) => {
    const lastSales = await axios.get(`/auth/sales`);

    return {
        data:  lastSales.data,
    }
}

export default Config