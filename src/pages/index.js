import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Layout from '@/components/app/Layout'
import Product from '@/components/products/Product'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Particles from '@/components/Particles';
import { wrapper } from '@/store/store';
import { setCountries, setSelectedCountry } from '@/store/slices/app';
import axios from 'axios';
import { API_URL, IMAGESURL } from '@/config/config';
import { loadInitialFunctions } from '@/utils/loadStore';
import Loader from '@/components/Loader'
import { useSelector } from 'react-redux'

function Home(props) {
  const products = !props.products ? [] : props.products.data;
  // const banners  = useSelector((state) => state.app.banners);
  const banners = [];

  console.log(banners);

  return (
    <>
      <Head>
        <title>Wings || store</title>
      </Head>
      <Layout>
        <section className="top-slider">
          
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              // onSlideChange={() => console.log('slide change')}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {Array.isArray(banners) && banners.length > 0 ?
                <>
                  {banners.map((item, key) => {
                    return (
                      <SwiperSlide key={key}>
                        <div className="min-vh-100 d-flex align-items-center position-relative">
                            <div className='img-full'>
                              <Image fill
                                src={`${IMAGESURL}/${item.imagen}`} 
                                alt={`${item.nombre}`} 
                              />
                            </div>
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </>
              :
                <>
                  <SwiperSlide>
                    <div className="min-vh-100 d-flex align-items-center">
                      <Particles />
                      <div className='overlay-slider'></div>
                      <div className="content-overlay bg-one">
                      </div>
                      <div className="container content-slider text-light">
                        <h2 className='text-big mb-0 fb'>Wings store</h2>
                        <h3 className='text-big fb'>Creado por gamers para gamers</h3>
                        <p className='mb-5 h5'>
                          Ofrecemos el mejor servicio en recargas en tus juegos favoritos
                        </p>
                        <Link href="/products" className='btn btn-lg btn-primary btn-rounded fw-bold px-4 shadow'>
                          ¡Explora nuestro catalogo!
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="min-vh-100 d-flex align-items-center bg-primary">
                      <div className="container">
                        <h2 className='text-big fb text-secondary'>
                          Disfruta de nuestras promociones
                        </h2>
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              }
              
            </Swiper>
        </section>
        
        <div className="position-relative pt-5">
          <div className="bg-olverlay bg-primary"></div>
          <div className="container bg-container">
              <div className="card border-0 bg-secondary wave-bg shadow">
                  <div className="wave d-none">
                      <Image fill src="./img/wavebg.svg" alt="" />
                  </div>
                  <div className="card-body wave-content py-4">
                      <div className="row">
                          <div className="col-12 col-md-7 col-lg-6 col-xl-6">
                              <h3 className="text-big fb text-primary mb-0">
                                  ¡Gana Wpoints!
                              </h3>
                              <h5 className="fw-bold text-success mb-1">
                                  Al recargar en tus juegos favoritos.
                              </h5>
                              <p className="text-light mb-0">
                                  los Wpoints se intercambian por productos de la tienda.
                              </p>
                          </div>
                          <div className="d-none d-md-flex col-md-1 col-lg-2">
                              <div className="content-img-float">
                                  <div className="content-img center">
                                      <span className="content-game-data">
                                          Clash Royale
                                      </span>
                                      <Image
                                          fill 
                                          src="/img/products/games/cr.jpg" 
                                          alt=""
                                          className="center"
                                      />
                                  </div>
                              </div>
                          </div>
                          <div className="d-none d-md-flex col-md-2 col-lg-2">
                              <div className="content-img-float">
                                  <div className="content-img big bottom">
                                      <span className="content-game-data">
                                          League of legends
                                      </span>
                                      <Image
                                          fill 
                                          src="/img/products/games/lol.jpg" 
                                          alt=""
                                          className="big bottom"
                                      />
                                  </div>
                              </div>
                          </div>
                          <div className="d-none col-2 col-md-1 col-lg-2">
                              <div className="content-img-float">
                                  <div className="content-img top mobile">
                                      <span className="content-game-data">
                                          Free fire
                                      </span>
                                      <Image
                                          fill 
                                          src="/img/products/games/ff.jpg" 
                                          alt=""
                                          className="top"
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <section className="products py-5">
            <div className="container pt-5">
                <div className="mb-4">
                    <h3 className="h1 fb mb-0 section-title">
                        Nuestro catálogo
                    </h3>
                </div>
                <div className="row pb-3">
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
                              slug={item.slug}
                              name={item.nombre}
                              type={item.tipo}
                              plans={plans}
                            />
                        </div>
                      )
                    })}
                </div>
                <div className="text-center">
                  <Link href="/products" className='btn btn-lg btn-outline-secondary fw-bold px-5 shadow'>
                    Ver más ..
                  </Link>
                </div>
            </div>
        </section>
        <div className="bg-white">
          <picture>
            <img src="/img/shapebottomgris.svg" alt="" />
          </picture>
        </div>
        <section className="pb-5 bg-white">
          <div className="position-relative pb-5">
            <div className="w-100">
              <div className="row w-100 mx-auto">
                <div className="col-lg-3 col-md-5 d-none d-md-flex">
                  <picture>
                    <img src="/img/bg/cr.png" alt="" className='img-fluid' />
                  </picture>
                </div>
                <div className="col-lg-8 col-md-7">
                  <div className="row mb-3 mb-md-0">
                    <div className="col-12 col-md-12">
                      <h3 className='fb text-big mb-0 text-secondary'>Wings store</h3>
                      <h4 className='fb h1 text-secondary'>Hace de las recargas otra parte del juego.</h4>
                    </div>
                  </div>
                  <p className='h6 mb-4'>
                    Te proporcionamos la mejor experiencia en recargas para tus juegos favoritos,  
                    contamos con transparencia y soporte 24/7, diversos métodos de pago, 
                    y la mejor seguridad para tí.
                  </p>
                  
                  <div className="row">
                    <div className="col-lg-4 col-md-12 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="h1 mb-2 text-center text-success">
                            <i className="fa-solid fa-money-bill-transfer"></i>
                          </div>
                          <h5 className='text-center fw-bold h6'>
                            Retorno de saldo por cash
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="card bg-secondary">
                        <div className="card-body">
                          <div className="h1 mb-2 text-center text-success">
                            <i className="fa-solid fa-clock-rotate-left"></i>
                          </div>
                          <h5 className='text-center text-light fw-bold h6'>
                            Entrega inmediata
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="h1 mb-2 text-center text-success">
                            <i className="fa-solid fa-shield-halved"></i>
                          </div>
                          <h5 className='text-center fw-bold h6'>
                            Seguridad garantizada
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=''>
                    <button className='btn btn-lg btn-primary px-5 fw-bold shadow'>
                      Inicia sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

Home.getInitialProps = wrapper.getInitialPageProps((store) => async ({ req }) => {

  const state = store.getState();
  const products = await axios.get(`${API_URL}/products/${state.app.selectedCountry.id}/8`);

  return {
    products: products.data
  }
  
});


export default Home;
