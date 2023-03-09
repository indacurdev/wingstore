import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import axios from 'axios';
import { API_URL } from '@/config/config';

import { useRouter } from 'next/router';

import Layout from '@/components/app/Layout'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Link from 'next/link';

function ViewProduct(props) {

    const product = props.data;
    const [plans, setplans] = useState([]);

    useEffect(() => {

        let newplans = [];
        Object.keys(product).map((datakey) => {
            if(datakey.includes("plan") && !datakey.includes("precio")){
              let planData = product[datakey];

              if(planData !== "" && Number(planData) > 0){
                newplans.push(product[datakey]);
              }
            }
        });

        setplans(newplans);

    }, [product]);

    console.log(product);
    console.log(plans);

    return (
        <>
            <Head>
                <title>Wings || product</title>
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
                                    <Link href="/products">Productos</Link>
                                </li>
                                <Breadcrumb.Item active>
                                    {props.id}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <section className="product mb-5 pb-5">
                        <div className="content-banner-page bg-secondary" />
                        <div className="container">
                            <div className="card-info-product pb-5">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <div className="card border-0 w-100 shadow mb-4">
                                            <div className="card-body py-4">
                                                <div className="text-center">
                                                    <h1 className='fb text-center text-secondary section-title mb-4'>
                                                        {product.nombre}
                                                    </h1>
                                                </div>

                                                <h5 className='fw-bold h6'>
                                                    Descripción:
                                                </h5>
                                                <p>
                                                    {product.descripcion}
                                                </p>

                                                <h5 className='fw-bold h6'>
                                                    Tipo:
                                                </h5>
                                                <p>
                                                    {product.tipo}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="card border-0 w-100 shadow mb-4">
                                            <div className="card-header py-3 bg-primary">
                                                <h5 className='fw-bold h6 mb-0 text-secondary'>
                                                    Información del usuario
                                                </h5>
                                            </div>
                                            <div className="card-body py-4">
                                                <h4 className='h5 mb-1 fw-bold'>
                                                    Introduzca correo electrónico
                                                </h4>
                                                <p>
                                                    Se notificará a su dirección de correo electrónico después de la compra exitosa.
                                                </p>
                                                <input 
                                                    type="text" 
                                                    className='form-control' 
                                                    placeholder='Correo electrónico'
                                                />
                                            </div>
                                        </div>

                                        {plans.length > 0 &&
                                            <div className="card border-0 w-100 shadow mb-4">
                                                <div className="card-header py-3 bg-primary">
                                                    <h5 className='fw-bold h6 mb-0 text-secondary'>
                                                        Seleccionar cantidad
                                                    </h5>
                                                </div>
                                                <div className="card-body py-4">
                                                    <div className="row">
                                                        {plans.length > 0 && plans.map((item, key) => {
                                                            return(
                                                                <div className='col-lg-4 col-6 py-2' key={key}>
                                                                    <div className='plan fb'>
                                                                        <span className="overlay-plan"></span>
                                                                        {item}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}

ViewProduct.getInitialProps = async ({ query }) => {
    const { id } = query;
    const product = await axios.get(`${API_URL}/product/${id}/`);

    return {
        id,
        data: product.data
    }
}

export default ViewProduct