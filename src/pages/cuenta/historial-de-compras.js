import React from 'react';
import Head from 'next/head';
import PrivateRoute from '@/components/auth/PrivateRoute';
import Layout from '@/components/app/Layout';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Link from 'next/link';
import axios from '../../lib/fetch'
import AccountMenu from '@/components/AccountMenu';

function History(props) {

    const data = props.data;
    console.log(`data sales`, data);
    
    return (
        <PrivateRoute>
            <Head>
                <title>Wings - historial de compras</title>
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
                                <Breadcrumb.Item active>Historial de compras</Breadcrumb.Item>
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
                                        Historial de compras
                                    </h1>
                                    
                                    <div className="card border-0">
                                        <div className="card-body">
                                            {data.length > 0 
                                            ?
                                                <div></div>
                                            :
                                                <div className='alert alert-info'>
                                                    Todavia no ha realizado ninguna compra en 
                                                    <span className='fw-bold mx-1'>Wings Store.</span>
                                                    <div className='d-none'>
                                                        puede hacerlo explorando nuestro <Link href={`/products`}>Catálogo de productos</Link>
                                                    </div>
                                                </div>
                                            }
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

History.getInitialProps = async ({ req, res }) => {
    const lastSales = await axios.get(`/auth/sales`);

    return {
        data:  lastSales.data,
    }
}

export default History