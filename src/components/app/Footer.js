import React from 'react'
import Image from 'next/image'

function Footer() {
  return (
    <div>
      <footer className='footer' 
        style={{ marginTop: '-100px' }}
      >
          <div className="bg-secondary position-relative">
            <div className="content-shape-footer">
            </div>
            <div className="content-footer pt-4 pb-4">
              <div className="container">
                <div className="row mb-2">
                  <div className="col-lg-3 col-12 py-2">
                    <div className="w-100">
                      
                      <div className="row justify-content-sm-start justify-content-center mb-3 mb-sm-0">
                        <div className="col-lg-5 col-4 col-sm-3">
                          <Image 
                            src="/img/isotipo.png" 
                            width={500}
                            height={500} 
                            alt="" 
                            className='img-fluid' 
                           />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-12 col-sm-6 py-2 text-light">
                    <ul className='list-unstyled list-links'>
                      <li>
                        <a href="/terminos-y-condiciones" className='link-unstyled'>
                          Términos y condiciones
                        </a>
                      </li>
                      <li>
                        <a href="/politica-de-privacidad" className='link-unstyled'>
                          Política de privacidad
                        </a>
                      </li>
                      <li>
                        <a href="/politica-de-reembolso" className='link-unstyled'>
                          Política de reembolso
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-12 col-sm-6 py-2 text-light">
                    <h3 className='fw-bold text-primary h5 mb-3'>Contáctanos</h3>
                    <p className='mb-3'><i className="fa-regular fa-envelope me-2"></i> contact@wng.com </p>
                    <div className="socialist">
                      <ul>
                        <li>
                          <a href="" className='btn btn-outline-primary'>
                            <i className="fa-brands fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="" className='btn btn-success'>
                            <i className="fa-brands fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="" className='btn-secondary btn active'>
                            <i className="fa-brands fa-whatsapp"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-12 mt-5 text-muted small">
                    © 2023 Wings store (Todos los derechos reservados).
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-content-wave"></div>
          </div>
      </footer>
    </div>
  )
}

export default Footer