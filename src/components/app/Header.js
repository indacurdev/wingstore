import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import CountriesDropdown from '../CountriesDropdown';
import SearchTop from '../SearchTop';
import Image from 'next/image'

function Header() {

  return (
    <div>
       <header className="header">
        <div className="content-header">
          <div className="container">
            <div className="row content-header-data align-items-center">

              <div className="col-lg-1 col-3">
                <Link href="/" className="brand">
                  <Image 
                    src="/img/isotipo.png" 
                    width={500}
                    height={500} 
                    alt="" 
                    className='img-fluid' 
                  />
                </Link>
              </div>

              <div className="col-lg-3 d-none d-lg-flex">
                <div className="top-menu-dashboard">
                  <ul>
                    <li>
                      <Link href="/">
                        Partners
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4 d-none d-lg-flex">
                <SearchTop />
              </div>

              {/* Dropdowns */}
              <div className="col-lg-4 col-9 d-flex justify-content-end">

                {/* USER */}
                <Dropdown className='dropdown-user d-none'>
                  <Dropdown.Toggle id="dropdown-user">
                    <div className='fw-bold'>
                      <i className="fa-solid fa-coins" />
                      <span className="ms-2">60.00</span>
                    </div>
                    <div className="d-none">
                      <i className="fa-regular fa-user text-primary" />
                      <span className="ms-2">Renny</span>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end" className='menu-user-top'>
                    <div className="px-3 py-2">
                      <p className="mb-1 h4 fw-bold text-center text-secondary">
                        Renny
                      </p>
                      <p className="mb-4 h6 text-center text-muted">
                        Renny@gmail.com
                      </p>
                      <button className="btn btn-primary fw-bold w-100 mb-3">
                        <i className="fa-regular fa-user text-secondary me-2" />
                        Ver perfil 
                      </button>
                      <button className="btn-outline-secondary mb-3 w-100 fw-bold px-3 btn me-3">
                        <i className="fa-solid fa-bag-shopping me-2" />
                        Comprar wcoins 
                      </button>
                      <ul className="user-data-list-dropdown">
                        <li>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="text-left">
                              <i className="fa-solid text-primary fa-coins me-2" />
                              <span>Wpoints</span>
                            </div>
                            <div className="fw-bold text-secondary">
                              <span>5.00</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="text-left">
                              <i className="fa-solid text-primary fa-coins me-2" />
                              <span>Wcoins</span>
                            </div>
                            <div className="fw-bold text-secondary">
                              <span>60.00</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <hr />
                      <button className="btn btn-unstyled fw-bold w-100">
                        <i className="fa-solid fa-right-from-bracket me-2" />
                        Cerrar sesión
                      </button>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

                <CountriesDropdown />

                <button className='btn btn-primary fw-bold'> 
                  Iniciar sesión
                </button>

              </div>

            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header