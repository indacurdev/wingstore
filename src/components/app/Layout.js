import React from 'react'
import dynamic from 'next/dynamic';

// import { useDispatch, useSelector } from 'react-redux';

const Header = dynamic(() => import('./Header'),{ssr: false});
import Footer from './Footer'

function Layout(props) {
  
  return (
    <div>
        <div className="page-wrapper">
            {!props.blank &&
              <Header />
            }
            <div className="page-content">
              {props.children}
            </div>
            {!props.blank &&
              <Footer />
            }
        </div>
    </div>
  )
  
}

export default Layout