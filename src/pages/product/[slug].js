import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import Head from 'next/head'
import axios from 'axios';
import { API_URL } from '@/config/config';

import { useRouter } from 'next/router';

import Layout from '@/components/app/Layout'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getTemplate, slugify } from '@/utils/functions';

import { toast } from 'react-toastify';

import { useSelector } from 'react-redux';
import Pay from '@/components/pay/Pay';

function ViewProduct(props) {

    const labels = false;

    const product   = props.data.product;
    const template  = props.data.template;
    const plans     = props.data.plans;

    const methods  = useSelector((state) => state.app.paymentMethods);
    // const [plans, setplans] = useState([]);

    const [selectedPlan, setselectedPlan]   = useState(null);
    const [selectedPaymentMethod, setselectedPaymentMethod] = useState(null);

    const [formTemplate, setformTemplate]   = useState([]);
    const [validates,    setvalidates]      = useState([]);
    const [errors, seterrors]               = useState([]);

    const [payData, setpayData]             = useState([]);

    const [count, setcount] = useState(0);
    const [pay, setpay] = useState(false);

    // console.log(props);
    // console.log(template);

    let inputs = '';

    useEffect(() => {

        /*
            let newplans = [];
            Object.keys(product).map((datakey) => {
                if(datakey.includes("plan") && !datakey.includes("precio")){
                let planData = product[datakey];

                if(planData !== "" && Number(planData) > 0){
                    newplans.push(product[datakey]);
                }
                }
            });
        */

        if(template.length > 0){
            let items = [];
            let newValidates = [];

            template.map((item) => {
                let newItem = {
                    id:             slugify(item.nombre),
                    name:           slugify(item.nombre),
                    key:            item.nombre,
                    keyId:          item.id_campo,
                    placeholder:    item.nombre,
                    type:           'text',
                    required:       true,
                    value:          ''
                }

                newValidates.push(slugify(item.nombre));
                items.push(newItem);
            });

            setvalidates(newValidates);
            setformTemplate(items);
        }

        // setplans(newplans);

    }, [product]);

    // console.log(props.data);
    // console.log(methods);

    const proccedToPay = (e) => {
        e.preventDefault();

        let errorsCount = 0;
        let errorsData = {};
        let data = [];

        if(formTemplate.length > 0){
            formTemplate.map((item) => {
                const value = event.target.elements[item.name].value;
                if(value === ""){
                    errorsCount++;
                    errorsData[event.target.elements[item.name].name] = "Debe llenar este campo";
                }else{
                    // console.log(item);
                    data.push({
                        id_campo:       item.keyId,
                        nombre_campo:   item.key,
                        value:          value
                    });
                }
            });
        }

        if(errorsCount > 0){
            seterrors(errorsData);
            toast.error('Debe completar los datos presentados en el formulario');
            window.scroll(0, (document.getElementById("dataProduct").offsetTop - 70));
        }else{
            window.scroll(0, (document.getElementById("dataProduct").offsetTop - 70));
            setpayData(data);
            setpay(true);
        }
    }

    const cancelPay = () => {
        window.scroll(0, (document.getElementById("dataProduct").offsetTop - 70));
        setpay(false);
        setpayData(null);
    }

    if(formTemplate.length > 0){
        inputs = getTemplate(formTemplate);
    }

    const handleChangeInputTemplate = (val, name) => {
        if(val !== ""){
            if(errors[name]){
                let newErrors = errors;
                delete newErrors[name];

                console.log('ERRORS', formProduct);
                seterrors(newErrors);
                setcount(count + 5);
            }
        }
    }

    return (
        <>
            <Head>
                <title>Wings - {product.nombre}</title>
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
                                    {product.nombre}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <section className="product mb-5 pb-5" id='dataProduct'>
                        <div className="content-banner-page bg-secondary" />
                        <div className="container">
                            <div className="card-info-product pb-5">

                                {!pay ?
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
                                            <form id="formProduct" action="" onSubmit={(e) => proccedToPay(e)}>

                                                {(formTemplate.length > 0) &&
                                                    <div className="card border-0 w-100 shadow mb-4">
                                                        <div className="card-header py-3 bg-primary">
                                                            <h5 className='fw-bold fb h4 mb-0 text-secondary'>
                                                                Información del usuario
                                                            </h5>
                                                        </div>
                                                        <div className="card-body py-4">
                                                            <div className="row">
                                                                {formTemplate.map((item, key) => {
                                                                        return (
                                                                            <div key={key} className={((errors[item.name]) ? "has-error" : "") + ` col-lg-6 py-2`}>
                                                                                <div>
                                                                                    <label htmlFor={item.id} className="mb-2 h6">
                                                                                        {item.placeholder} <span className="text-danger">*</span>
                                                                                    </label>
                                                                                    {getTemplate(item, (val) => handleChangeInputTemplate(val, item.name))}
                                                                                </div>
                                                                                {errors[item.name] &&
                                                                                    <div className='text-danger fw-bold small py-2 small'>
                                                                                        {errors[item.name]}
                                                                                    </div>
                                                                                }
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
                                                                Seleccionar plan
                                                            </h5>
                                                        </div>
                                                        <div className="card-body py-4">
                                                            <div className="row">
                                                                {plans.length > 0 && plans.map((item, key) => {
                                                                    return(
                                                                        <div className='col-lg-4 col-6 py-2' key={key}>
                                                                            <button type='button' onClick={() => setselectedPlan((item === selectedPlan) ? null : item)} className={((selectedPlan === item) ? 'active' : '') + ` plan fb`}>
                                                                                <span className="overlay-plan"></span>
                                                                                {item.puntos_plan}
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
                                                                            <button type="button" onClick={() => setselectedPaymentMethod((item === selectedPaymentMethod) ? null : item)} className={((selectedPaymentMethod === item) ? 'active' : '') + ''} >
                                                                                {item.nombre_mtp}
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                }

                                                {/* 
                                                    <div className="card border-0 w-100 shadow mb-4">
                                                        <div className="card-header py-3 bg-primary">
                                                            <h5 className='fw-bold fb h4 mb-0 text-secondary'>
                                                                Código promocional
                                                            </h5>
                                                        </div>
                                                        <div className="card-body py-4">
                                                            <div className="row">
                                                                <div className="col-lg-9 py-2">
                                                                    <input 
                                                                        type="text" 
                                                                        className="form-control" 
                                                                        placeholder='Ingrese el código' 
                                                                    />
                                                                </div>
                                                                <div className="col-lg-3 py-2">
                                                                    <button 
                                                                        disabled
                                                                        className='btn w-100 btn-secondary'
                                                                    >
                                                                        Aplicar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                */}

                                                <div className='text-end'>
                                                    <button 
                                                        disabled={(selectedPaymentMethod === null || selectedPlan === null)}
                                                        className='btn btn-primary px-4 fw-bold btn-lg'
                                                        type='submit'
                                                    >
                                                        Continuar compra
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    :
                                    <Pay cancel={() => cancelPay()} product={product} data={payData} method={selectedPaymentMethod} plan={selectedPlan} />
                                }

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