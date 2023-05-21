import React, { useState } from 'react';
import Head from 'next/head';
import PrivateRoute from '@/components/auth/PrivateRoute';
import Layout from '@/components/app/Layout';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Link from 'next/link';
import axios from '../../lib/fetch'
import AccountMenu from '@/components/AccountMenu';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '@/store/slices/session';
import { useRouter } from 'next/router';

function CanjearWpoints(props) {

    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const router = useRouter();

    const [sending, setsending] = useState(false);
    const [errors, seterrors]   = useState({});

    const data = props.data;
    console.log(`data sales`, data);

    const changePoints = (e) => {
        e.preventDefault();

        setsending(true);
        axios.post(`/auth/change_wingscoins`)
        .then((res) => {
            const result = res.data;
            if(result.result){
                let coins = result.wingscoin;
                let userData = {...user};
                toast.success(`Cambio exitoso de ${user.puntos_cliente} Wpoints por ${coins} Wcoins`);
            
                userData.puntos_cliente = "0.00";
                userData.wingscoins = Number(user.wingscoins) + Number(coins);
                dispatch(updateUser(userData));
                router.push('/cuenta/perfil');
            }else{
                setsending(false);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    
    return (
        <PrivateRoute>
            <Head>
                <title>Wings - Canjear wpoints</title>
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
                                <Breadcrumb.Item active>Canjear wpoints</Breadcrumb.Item>
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
                                        Canjear wpoints
                                    </h1>
                                    
                                    <p>
                                        Los <span>Wcoins</span> funcionan como medio de pago dentro
                                        de <span>Wings store</span>, en está sección puede visualizar
                                        los cambios disponibles a <span>Wcoins</span> en base a sus <span>Wpoints.</span>
                                    </p>
                                    
                                    {data.response ?
                                            <form action="" onSubmit={(e) => changePoints(e)}>
                                                <div className="row align-items-center">
                                                    <div className="col-lg-5 h-100 mb-3">
                                                        <div className="card border-0 h-100">
                                                            <div className="card-body text-center">
                                                                <h6 className='fw-bold h5'>
                                                                    Wpoints
                                                                </h6>
                                                                <div className='h1 fb text-secondary'>
                                                                    <i class="fa-solid fa-minus d-none"></i>
                                                                    <span>
                                                                        {user.puntos_cliente}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 h-100 mb-3">
                                                        <div className="card border-0 bg-secondary text-success h-100">
                                                            <div className="card-body text-center">
                                                                <i class="fa-solid fa-arrow-right fa-3x"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-5 h-100 mb-3">
                                                        <div className="card border-0 h-100">
                                                            <div className="card-body text-center">
                                                                <h6 className='fw-bold h5'>
                                                                    Wcoins
                                                                </h6>
                                                                <div className='h1 fb text-secondary'>
                                                                    <i class="fa-solid fa-plus d-none"></i>
                                                                    <span>
                                                                        {data.wingscoin}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-end">
                                                    <button 
                                                        type='submit' 
                                                        className='btn btn-primary fw-bold'
                                                        disabled={sending}
                                                    >
                                                        {sending ? <i className="fa-solid fa-spin px-5 fa-spinner"></i> : `Realizar cambio`}
                                                    </button>
                                                </div>
                                            </form>
                                        :
                                            <div className='alert alert-info'>
                                                No posee <span className='fw-bold'>Wpoints</span> suficientes para realizar un cambio.
                                            </div>
                                    }
                                       
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </PrivateRoute>
    );
}

CanjearWpoints.getInitialProps = async ({ req, res }) => {
    const dataChange = await axios.get(`/auth/change_wingscoins`);

    return {
        data:  dataChange.data,
    }
}

export default CanjearWpoints