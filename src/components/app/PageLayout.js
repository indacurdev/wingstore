import React from 'react'
import Footer from './Footer'
import Link from 'next/link'
import Image from 'next/image'

function PageLayout(props) {
  return (
    <div>
        <div className="page-wrapper">
            {!props.blank &&
                <div className="header-blank">
                    <div className='container'>
                        <div className="col-lg-1 col-2">
                        <div className="w-75">
                            <Link href={`/`}>
                            <Image 
                                src="/img/isotipo.png" 
                                width={500}
                                height={500} 
                                alt="" 
                                className='img-fluid' 
                            />
                            </Link>
                        </div>
                        </div>
                    </div>
                </div>
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

export default PageLayout