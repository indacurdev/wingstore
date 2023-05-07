import React, {useState, useEffect} from 'react'
import Layout from '@/components/app/Layout'
import Image from 'next/image'
import Link from 'next/link'

import PublicRoute from '@/components/auth/PublicRoute';
import Head from 'next/head';


function PaymentSuccess() {

    return (
        <PublicRoute>
            <Head>
                <title>Wings - Pago satisfactorio</title>
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
                            <div className="col-lg-8">
                                <div className="card border-0 w-100 shadow py-3">
                                    <div className="card-body">
                                        <div className="text-center">
                                            <div className='mb-3 text-success'>
                                                <i class="fa-regular fa-6x fa-circle-check"></i>
                                            </div>
                                            <p className='h2 mb-3 fw-bold'>
                                                Su pago ha sido realizado exitosamente!
                                            </p>
                                            <p className="h5">
                                                Se le ha enviado un córreo electrónico con 
                                                los detalles de la compra, para acceder a más 
                                                funcionalidades intente iniciar sesión en wings 
                                                para aprovechar todas las caracteristicas de 
                                                nuestra plataforma.
                                            </p>
                                            <Link href={`/`} className='btn btn-secondary mt-3 px-4'>
                                                Volver al inicio
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicRoute>
    );
}

export default PaymentSuccess