import React from 'react';
import Head from 'next/head';
import PrivateRoute from '@/components/auth/PrivateRoute';
import Layout from '@/components/app/Layout';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Link from 'next/link';
import axios from '../../lib/fetch'
import AccountMenu from '@/components/AccountMenu';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Perfil(props) {

    const data = props.data;
    console.log(`data profile`, data);

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
                                                    <label htmlFor="" className='mb-2'>
                                                        Contraseña
                                                    </label>
                                                    <div className="row">
                                                        <div className="col-lg-10 col-7 mb-2">
                                                            <span className='text-readonly'>
                                                                {!data.profile.nompassword ? `Usted aun no ha configurado una contraseña` : '************'}
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

Perfil.getInitialProps = async ({ req, res }) => {
    const me        = await axios.get(`/auth/me`);
    //const lastSales = await axios.get(`/auth/sales`);

    return {
        data:  me.data,
        //sales: lastSales.data
    }
}

export default Perfil