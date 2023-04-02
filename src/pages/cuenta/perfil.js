import React from 'react';
import PrivateRoute from '@/components/auth/PrivateRoute';
import Layout from '@/components/app/Layout';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Link from 'next/link';
import axios from '../../lib/fetch'

function Perfil(props) {

    const data = props.data;
    console.log(`data profile`, data);

    return (
        <PrivateRoute>
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
                        <div className="container py-3">
                            <div className="row">
                                <div className="col-lg-3">

                                </div>
                                <div className="col-lg-9">
                                    <h1 className='fw-bold text-secondary h2 mb-3'>
                                        Perfil
                                    </h1>
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <label htmlFor="" className='mb-2'>
                                                        Nombre
                                                    </label>
                                                    <span className='text-readonly'>
                                                        {data.nombre_cliente}
                                                    </span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label htmlFor="" className='mb-2'>
                                                        Email
                                                    </label>
                                                    <span className='text-readonly'>
                                                        {data.email}
                                                    </span>
                                                </div>
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
    const me    = await axios.get(`/auth/me`);

    return {
        data: me.data
    }
}

export default Perfil