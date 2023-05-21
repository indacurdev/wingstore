import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import CountriesDropdown from '../CountriesDropdown';
import SearchTop from '../SearchTop';
import Image from 'next/image'
import { useAuth } from '@/context/auth';
import UserDropdown from '../UserDropdown';

function Header() {
  const auth = useAuth().auth;

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
              <div className="col-lg-4 col-9 d-flex align-items-center justify-content-end">

                {/* LANG DROPDOWN */}
                <CountriesDropdown />

                {/* USER */}
                {auth &&
                  <UserDropdown />
                }

                {!auth &&
                  <Link href={`/login`} className='btn btn-primary fw-bold'> 
                    Iniciar sesión
                  </Link>
                }

              </div>

            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header