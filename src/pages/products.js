import React from 'react';
import axios from 'axios';

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

import { wrapper } from '@/store/store';
import { API_URL } from '@/config/config';

import Layout from '@/components/app/Layout'
import Product from '@/components/products/Product'

import Breadcrumb from 'react-bootstrap/Breadcrumb';

import 'swiper/css';

function Products(props) {
    const products = props.products;

    return (
        <>
            <Head>
                <title>Wings || products</title>
            </Head>
            <Layout>
                <div className="page-content-wrapper">
                    <div className="content-breadcrumb">
                        <div className="container">
                            <Breadcrumb>
                                <li className='breadcrumb-item'>
                                    <Link href="/">Inicio</Link>
                                </li>
                                <Breadcrumb.Item active>Productos</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <section className="products pt-4 mb-5 pb-5">
                        <div className="container">
                            <div className='mb-4'>
                                <h3 className="h1 fb mb-0 section-title">
                                    Productos
                                </h3>
                            </div>
                            <div className="row">
                                {products.length > 0 && products.map((item, key) => {
                                    let plans = [];

                                    Object.keys(item).map((datakey) => {
                                    if(datakey.includes("plan") && datakey.includes("precio")){
                                        // plans.push(item);
                                        let planData = item[datakey];

                                        if(planData !== "" && Number(planData) > 0){
                                        plans.push(item[datakey]);
                                        }
                                        
                                    }
                                    });

                                    return (
                                    <div key={key} className="col-lg-3 col-6 col-md-4 mb-4">
                                        <Product 
                                            slug={`${item.id_producto}`}
                                            name={item.nombre}
                                            type={item.tipo}
                                            plans={plans}
                                        />
                                    </div>
                                    )
                                })}
                            </div>
                            <div className="text-center">
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}

Products.getInitialProps = wrapper.getInitialPageProps((store) => async () => {
    const state = store.getState();
    const products = await axios.get(`${API_URL}/products/${state.app.selectedCountry.id}/`);
    
    return {
        products: products.data
    }
});

export default Products;
