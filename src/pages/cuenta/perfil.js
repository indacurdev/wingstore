import React, {useState} from 'react';
import Head from 'next/head';
import PrivateRoute from '@/components/auth/PrivateRoute';
import Layout from '@/components/app/Layout';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Link from 'next/link';
import axios from '../../lib/fetch'
import AccountMenu from '@/components/AccountMenu';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { toast } from 'react-toastify';
import { useAuth } from '@/context/auth';
import { useSelector } from 'react-redux';

function Perfil(props) {

    const auth      = useAuth();
    const data      = useSelector((state) => state.session);
    console.log(`data profile`, data);

    const [isEdit, setisEdit]           = useState(false);
    const [sending, setsending]         = useState(false);
    const [errors, seterrors]           = useState({});

    const [name, setname]               = useState(data.user.nombre_cliente);
    const [country, setcountry]         = useState(null);

    const wcoinsTooltip = (props) => (
        <Tooltip id="wcoinsTooltip" {...props}>
          Puedes utilizar <span className='fw-bold me-1'>Wcoins</span>
          para comprar productos de la tienda.
        </Tooltip>
    );

    const wpTooltip = (props) => (
        <Tooltip id="wpTooltip" {...props}>
          Puedes canjear <span className='fw-bold me-1'>Wpoints</span>
          por <span className='fw-bold me-1'>Wcoins</span> para comprar productos de la tienda.
        </Tooltip>
    );
    
    const editProfile = (e) => {
        e.preventDefault();
        let errors = {};
        let countErrors = 0;
        seterrors({});


        if(name.trim() === ""){
            errors.name = 'Ingrese su nombre';
            countErrors++;
        }

        if(countErrors > 0){
            toast.error(`Verifique los datos del formulario`);
            seterrors(errors);
            //window.scroll(0, (document.getElementById("cardConfig").offsetTop - 70));
        }else{
            setsending(true);

            let data = {
                nombre_cliente: name,
                pais_id: null
            };

            const url = `/auth/update_profile`;

            axios({
                url,
                method: 'post',
                data
            }).then((res) => {
                const result = res.data;
                console.log(result);

                //formChangeProfile
                if(result.result){
                    toast.success(result.message);
                    setsending(false);
                    toggleProfile();
                    auth.updateUser();
                }else{
                    toast.error(result.message);
                    //window.scroll(0, (document.getElementById("cardConfig").offsetTop - 70));
                    setsending(false);
                }

            }).catch((err) => {
                console.error(err);
                setsending(false);
            });
        }
    }

    const toggleProfile = () => {
        setname(data.user.nombre_cliente);
        setisEdit(!isEdit);
    }

    return (
        <PrivateRoute>
            <Head>
                <title>Wings - perfil</title>
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
                                <Breadcrumb.Item active>Perfil</Breadcrumb.Item>
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
                                        Perfil
                                    </h1>
                                    {!data.profile.completed &&
                                        <div className='alert alert-info'>
                                            <p className="mb-0">
                                                <i className="fa-solid fa-circle-info me-3"></i>
                                                Complete su perfil para acceder a todas las funcionalidades.
                                            </p>
                                        </div>
                                    }
                                    <div className="card border-0 mb-3">
                                        <div className="card-body">
                                            <div className='text-end'>
                                                {!isEdit &&
                                                    <button onClick={() => toggleProfile()} className='btn btn-primary'>
                                                        Editar perfil <i class="ms-2 fa-solid fa-user-pen"></i>
                                                    </button>
                                                }
                                            </div>
                                            {!isEdit &&
                                                <div className="row">
                                                    <div className="col-lg-6 mb-3">
                                                        <label htmlFor="" className='mb-2'>
                                                            Nombre
                                                        </label>
                                                        <span className='text-readonly'>
                                                            {data.user.nombre_cliente && data.user.nombre_cliente !== "" ? data.user.nombre_cliente : "-"}
                                                        </span>
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label htmlFor="" className='mb-2'>
                                                            Email
                                                        </label>
                                                        <span className='text-readonly'>
                                                            {data.user.correo_cliente}
                                                        </span>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <hr />
                                                        <label htmlFor="" className='mb-2'>
                                                            Contraseña
                                                        </label>
                                                        <div className="row">
                                                            <div className="col-lg-10 col-7 mb-2">
                                                                <span className='text-readonly'>
                                                                    {data.profile.nopassword ? `Usted aun no ha configurado una contraseña` : '************'}
                                                                </span>
                                                            </div>
                                                            <div className="col-lg-2 col-5 mb-2">
                                                                <Link 
                                                                    href={`/cuenta/configuracion`} 
                                                                    className='btn fw-bold w-100 btn-secondary'
                                                                >
                                                                    Cambiar
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                            {isEdit &&
                                                <form id='formChangeProfile' onSubmit={(e) => editProfile(e)}>
                                                    <div className="row">
                                                        <div className="col-lg-12 mb-3">
                                                            <label htmlFor="" className='mb-2'>
                                                                Nombre
                                                            </label>
                                                            <input 
                                                                type="text" 
                                                                className='form-control'
                                                                placeholder='Nombre'
                                                                id='name'
                                                                defaultValue={name}
                                                                onChange={(e) => setname(e.target.value)}
                                                            />
                                                            {errors[`name`] &&
                                                                <div className='text-danger fw-bold small py-2 small'>
                                                                    {errors[`name`]}
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>  
                                                    <div className="text-end">
                                                        <button onClick={() => toggleProfile()} type='button' className='btn border-dark fw-bold me-2'>
                                                            Cancelar
                                                        </button>
                                                        <button type='submit' className='btn btn-primary fw-bold'>
                                                            {sending ? <i className="fa-solid fa-spin fa-spinner"></i> : `Editar`}
                                                        </button>
                                                    </div>
                                                </form>  
                                            }
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="card border-0 bg-secondary mb-3">
                                                <div className="card-body">
                                                    <h2 className='h1 fb text-light mb-0 d-flex align-items-center justify-content-between'>
                                                        <div>
                                                            <span className='text-success me-2'>
                                                                {Number(data.user.wingscoins).toFixed(2)}
                                                            </span> 
                                                            <span>Wcoins</span>
                                                        </div>

                                                        <OverlayTrigger
                                                            placement="top"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={wcoinsTooltip}
                                                        >
                                                            <span className='h5 ms-2'>
                                                                <i className="fa-solid fa-circle-info"></i>
                                                            </span>
                                                        </OverlayTrigger>
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card border-0 mb-3">
                                                <div className="card-body">
                                                    <h2 className='h1 fb text-secondary mb-0 d-flex align-items-center justify-content-between'>
                                                        <div>
                                                            <span className='text-primary me-2'>
                                                                {Number(data.user.puntos_cliente).toFixed(2)}
                                                            </span> 
                                                            <span>Wpoints</span>
                                                        </div>
                                                        <OverlayTrigger
                                                            placement="top"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={wpTooltip}
                                                        >
                                                            <span className='h5 ms-2'>
                                                                <i className="fa-solid fa-circle-info"></i>
                                                            </span>
                                                        </OverlayTrigger>
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="text-end">
                                                <Link href={`/cuenta/canjear-wpoints`} className='btn btn-primary fw-bold'>
                                                    Canjear wpoints
                                                </Link>
                                            </div>
                                        </div>
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

export default Perfil