import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import Head from 'next/head'
import axios from '../../lib/fetch';
import { API_URL } from '@/config/config';

import { useRouter } from 'next/router';

import Layout from '@/components/app/Layout'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getTemplate, slugify, validateEmail } from '@/utils/functions';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { toast } from 'react-toastify';

import { useSelector } from 'react-redux';
import Pay from '@/components/pay/Pay';
import { wrapper } from '@/store/store';

function ViewProduct(props) {

    console.log(props);

    const labels    = false;

    const product   = props.data.product;
    const template  = props.data.template;
    const plans     = props.data.plans;
    const methods   = props.payment_methods;

    // const [plans, setplans] = useState([]);

    const [selectedPlan, setselectedPlan]   = useState(null);
    const [selectedPaymentMethod, setselectedPaymentMethod] = useState(null);

    const [formTemplate, setformTemplate]   = useState([]);
    const [validates,    setvalidates]      = useState([]);
    const [errors, seterrors]               = useState([]);

    const [payData, setpayData]             = useState([]);
    const [accounts, setaccounts]           = useState(null);

    const [sending, setsending]             = useState(false);

    const [count, setcount]                 = useState(0);
    const [pay, setpay]                     = useState(false);

    const [email, setemail]                 = useState('');

    console.log(selectedPaymentMethod);
    // console.log(template);

    let inputs = '';

    const session         = useSelector((state) => state.session);
    const user            = session.user;
    const auth            = session.auth;

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
                }else if(item.name.toLowerCase() === 'email' && !validateEmail(value)){
                    errorsCount++;
                    errorsData[event.target.elements[item.name].name] = "Debe ingresar un email válido";
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

            setsending(true);
            /*
            OLD VALIDATE CODE
            axios.get(`verify_code/${props.id+`/`+selectedPlan.puntos_plan}`)
            .then((res) => {
                const result = res.data;
                console.log('Verify', result);

                if(result.result){
                }else{
                    toast.error(result.message);
                }
            }).catch((err) => {
                console.log(err);
                setsending(false);
            });
            */

            if(selectedPaymentMethod.tipo_pasarela === 'manual'){

                axios.get(`accounts/${selectedPaymentMethod.id_mtp}`)
                .then((res) => {
                    const resultacc = res.data;
                    //console.log('Verify', result);

                    if(resultacc.result){
                        setpayData(data);
                        setsending(false);
                        setaccounts(resultacc.accounts);
                        window.scroll(0, 0);
                        setpay(true);
                    }else{
                        toast.error(result.message);
                    }

                }).catch((err) => {
                    console.log(err);
                    setsending(false);
                });
            }else{
                setsending(false);
                setpayData(data);
                window.scroll(0, 0);
                setpay(true);
            }

               
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
            if(name.toLowerCase() === 'email'){
                setemail(val);
            }

            if(errors[name]){
                let newErrors = errors;
                delete newErrors[name];

                console.log('ERRORS', formProduct);
                seterrors(newErrors);
                setcount(count + 5);
            }
        }
    }

    const changePlan = (item) => {
        setselectedPlan(item);
        setselectedPaymentMethod(null);
    }

    console.log(selectedPlan);

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
                                                                Información del juego
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
                                                                    if(item.available){
                                                                        return(
                                                                            <div className='col-lg-4 col-6 py-2' key={key}>
                                                                                <button 
                                                                                    disabled={!item.available}
                                                                                    type='button' 
                                                                                    onClick={() => changePlan((item === selectedPlan) ? null : item)} 
                                                                                    className={((selectedPlan === item) ? 'active' : '') + ` plan fb`}
                                                                                >
                                                                                    <span className="overlay-plan"></span>
                                                                                    {item.puntos_plan}
                                                                                </button>
                                                                            </div>
                                                                        )
                                                                    }else{
                                                                        return(
                                                                                <OverlayTrigger
                                                                                    key={key}
                                                                                    placement="top"
                                                                                    // delay={{ show: 250, hide: 400 }}
                                                                                    overlay={<Tooltip id={`not-available-${key}`}>No Disponible</Tooltip>}
                                                                                >
                                                                                <div className='col-lg-4 col-6 py-2'>
                                                                                    
                                                                                        <button 
                                                                                            // disabled
                                                                                            type='button' 
                                                                                            className={((selectedPlan === item) ? 'active' : '') + ` plan disabled fb`}
                                                                                        >
                                                                                            <span className="overlay-plan"></span>
                                                                                            {item.puntos_plan}
                                                                                        </button>
                                                                                    
                                                                                </div>
                                                                                </OverlayTrigger>
                                                                            
                                                                        )
                                                                    }
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
                                                                    
                                                                    let precioPlan          = selectedPlan ? Number(selectedPlan.precio_plan) : null;
                                                                    let maxPrice            = item.costo_maximo ? Number(item.costo_maximo) : null; 
                                                                    let minPrice            = item.costo_minimo ? Number(item.costo_minimo) : null; 
                                                                    let isDisabled          = false;
                                                                    let disabledByWcoins    = false;

                                                                    if(precioPlan){
                                                                        if(minPrice && precioPlan < minPrice){
                                                                            isDisabled = true;
                                                                        }

                                                                        if(maxPrice && precioPlan > maxPrice){
                                                                            isDisabled = true;
                                                                        }
                                                                    }

                                                                    if(item.nombre_mtp.toLowerCase() === 'wcoins'){
                                                                        if(auth){
                                                                            if(Number(user.wingscoins) < precioPlan && auth){
                                                                                isDisabled = true;
                                                                            }
                                                                        }else{
                                                                            isDisabled = true;
                                                                        }
                                                                    }
                                                                    
                                                                    if(!isDisabled){
                                                                        return(
                                                                            <div className='col-lg-4 col-6 py-2' key={key}>
                                                                                <button 
                                                                                    type="button" 
                                                                                    onClick={() => setselectedPaymentMethod((item === selectedPaymentMethod) ? null : item)} 
                                                                                    className={((selectedPaymentMethod === item) ? 'active' : '') + ''} 
                                                                                >
                                                                                    {item.imagen && item.imagen !== "" ?
                                                                                        <img
                                                                                            src={item.imagen}
                                                                                            className='payment-method-img'
                                                                                        />
                                                                                    : 
                                                                                        item.nombre_mtp
                                                                                    }
                                                                                </button>
                                                                            </div>
                                                                        )
                                                                    }
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
                                                    {//auth ?
                                                        <button 
                                                            disabled={(selectedPaymentMethod === null || selectedPlan === null || sending)}
                                                            className='btn btn-primary px-4 fw-bold btn-lg'
                                                            type='submit'
                                                        >
                                                            {!sending ? <span className='px-3'>Continuar compra</span> : <i className="fa-solid fa-spin fa-spinner"></i>}
                                                        </button>
                                                        /*
                                                    :
                                                        <Link 
                                                            href={`/login?nextPage=product/${props.slug}`}
                                                            disabled={(selectedPaymentMethod === null || selectedPlan === null)}
                                                            className='btn btn-primary px-4 fw-bold btn-lg'
                                                            type='submit'
                                                        >
                                                            Iniciar sesión
                                                        </Link>
                                                        */
                                                    }
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    :
                                    <Pay email={email} cancel={() => cancelPay()} accounts={accounts} product={product} data={payData} method={selectedPaymentMethod} plan={selectedPlan} />
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

ViewProduct.getInitialProps = wrapper.getInitialPageProps((store) => async ({ req, query }) => {
    const state         = store.getState();
    const pais          = state.app.selectedCountry.id;

    console.log('STATE', state);
    console.log('QUERY', query);

    const { slug }      = query;

    const product       = await axios.get(`/product/${slug}`);
    const idProduct     = product.data.product.id_producto;

    const methods       = await axios.get(`/methods/${pais}/${idProduct}`);

    let productData     = product.data;
    let template        = productData.template;

    if(Array.isArray(template)){
        const emailCampo = {
            descripcion_campo: "Email",
            id_campo: 0,
            nombre: "Email",
            tipo: "email"
        }

        template.push(emailCampo);
        productData.template = template;
    }

    return {
        slug,
        data:   productData,
        id:     idProduct,
        payment_methods: methods.data
    }
});

export default ViewProduct