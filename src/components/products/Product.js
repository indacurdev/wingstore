import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IMAGESURL, PRODUCTSURL } from '@/config/config'

function Product({ name = "", image = "", plans, slug = ""}) {

    return (
        <div className='w-100'>
            <Link href={`/product/${slug}`} className="product-card">
                <div className="product-card-img">
                    <div className="product-card-top-data p-3 text-white d-flex">
                        <div className="me-2 d-none">
                            <i className="fa-solid fa-coins me-2 text-primary"></i>
                            <span>+50</span>
                        </div>
                        <div className="me-2 d-none">
                            <i className="fa-solid fa-tag text-danger"></i>
                            <span>50 %</span>
                        </div>
                    </div>
                    
                    <img src={(image && image !== "") ? `${PRODUCTSURL}/${image}` : '/img/imgproductdefault.svg'}  />
                    
                </div>
                <div className="px-2 py-4 product-card-data-container">
                    <div className="overlay-text">
                        {name}
                    </div>
                    <div className="product-card-data">
                        <div className="text-center">
                            <div>
                                <h3 className="fb d-inline-block h3 mb-0 text-secondary product-title">
                                    {name}
                                </h3>
                            </div>
                            <h6 className="h5 mb-0 fw-bold text-primary mb-2 d-none">
                                {plans.length > 0 
                                    ?
                                    <span>
                                        {plans[0]}$ - {plans[plans.length - 1]}$
                                    </span>
                                    :
                                    <span>
                                        --
                                    </span>
                                }
                            </h6>
                            <div className="content-btn-detail">
                                <button className="btn px-5 btn-primary fw-bold btn-rounded">
                                    Ver más
                                </button>
                            </div>
                        </div>
                    </div>   
                </div>
            </Link>
        </div>
    )
}

export default Product