import React from 'react'
import dynamic from 'next/dynamic';

// import { useDispatch, useSelector } from 'react-redux';

const Header = dynamic(() => import('./Header'),{ssr: false});
import Footer from './Footer'

function Layout(props) {
  
  return (
    <div>
        <div className="page-wrapper">
            <Header />
            <div className="page-content">
              {props.children}
            </div>
            <Footer />
        </div>
    </div>
  )
}

export default Layout