import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import Head from 'next/head'
import axios from 'axios';
import { API_URL } from '@/config/config';

import { useRouter } from 'next/router';

import Layout from '@/components/app/Layout'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getTemplate } from '@/utils/functions';

import { useSelector } from 'react-redux';

function ViewProduct(props) {

    const labels = false;

    const product  = props.data.product;
    const template = props.data.template;
    const inputs   = getTemplate(props.data.template);

    const methods  = useSelector((state) => state.app.paymentMethods);
    const [plans, setplans] = useState([]);


    const [selectedPlan, setselectedPlan] = useState(null);
    const [selectedPaymentMethod, setselectedPaymentMethod] = useState(null);

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

    // console.log(props.data);
    console.log(methods);

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
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7">

                                        {(template.length > 0) &&
                                            <div className="card border-0 w-100 shadow mb-4">
                                                <div className="card-header py-3 bg-primary">
                                                    <h5 className='fw-bold fb h4 mb-0 text-secondary'>
                                                        Información del usuario
                                                    </h5>
                                                </div>
                                                <div className="card-body py-4">
                                                    <div className="row">
                                                        {inputs.map((item, key) => {
                                                                return (
                                                                    <div key={key} className="col-lg-6 py-2">
                                                                        {item}
                                                                    </div>
                                                                )
                                                            }) 
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {plans.length > 0 &&
                                            <div className="card border-0 w-100 shadow mb-4">
                                                <div className="card-header py-3 bg-primary">
                                                    <h5 className='fw-bold fb h4 mb-0 text-secondary'>
                                                        Seleccionar tipo de recarga
                                                    </h5>
                                                </div>
                                                <div className="card-body py-4">
                                                    <div className="row">
                                                        {plans.length > 0 && plans.map((item, key) => {
                                                            return(
                                                                <div className='col-lg-4 col-6 py-2' key={key}>
                                                                    <button onClick={() => setselectedPlan((item === selectedPlan) ? null : item)} className={((selectedPlan === item) ? 'active' : '') + ` plan fb`}>
                                                                        <span className="overlay-plan"></span>
                                                                        {item}
                                                                    </button>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {methods.length > 0 &&
                                            <div className="card border-0 w-100 shadow mb-4">
                                                <div className="card-header py-3 bg-primary">
                                                    <h5 className='fw-bold fb h4 mb-0 text-secondary'>
                                                        Seleccione el método de pago
                                                    </h5>
                                                </div>
                                                <div className="card-body py-4">
                                                    <div className="row payment-methods">
                                                        {methods.length > 0 && methods.map((item, key) => {
                                                            return(
                                                                <div className='col-lg-4 col-6 py-2' key={key}>
                                                                    <button onClick={() => setselectedPaymentMethod((item === selectedPaymentMethod) ? null : item)} className={((selectedPaymentMethod === item) ? 'active' : '') + ''} >
                                                                        {item.nombre_mtp}
                                                                    </button>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        <div>
                                            <button 
                                                disabled={(selectedPaymentMethod === null || selectedPlan === null)}
                                                className='btn btn-primary px-4 fw-bold btn-lg'
                                            >
                                                Confirmar el pago
                                            </button>
                                        </div>

                                        {/* 
                                            <div>
                                                <button className='btn btn-primary px-4 fw-bold btn-lg'>
                                                    Completar orden
                                                </button>
                                            </div>
                                        */}
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

{/* 
    <div className="col-lg-6">
        {labels &&
            <label htmlFor="nombre" className='fw-bold mb-2'>
                Nombre
            </label>
        }
        <input 
            placeholder='Nombre'
            type="text" 
            className="form-control" 
            id="nombre"
            name="nombre"
        />
*/}

ViewProduct.getInitialProps = async ({ query }) => {
    const { slug } = query;
    const product = await axios.get(`${API_URL}/product/${slug}`);

    return {
        slug,
        data: product.data
    }
}

export default ViewProduct