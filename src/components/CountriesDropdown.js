import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import { Dropdown } from 'react-bootstrap';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { setSelectedCountry } from '@/store/slices/app';

function CountriesDropdown() {

    const app           = useSelector((state) => state.app, shallowEqual);
    const dispatch      = useDispatch();
    const router        = useRouter();
    const countries     = app.countries;
    const [country, setcountry] = useState(app.selectedCountry);

    const changeCountry = (item) => {
        setcountry(item);
        const countrystr = JSON.stringify(item);
        // console.log(countrystr);
        Cookies.set('country', countrystr);
        // dispatch(setSelectedCountry(item));
        // router.push('/');
        router.reload();
    }

    // console.log(country);

    return (
        <>
            {/* COUNTRY */}
            {countries.length > 0 &&
                <Dropdown className='me-4 me-2 me-md-4 dropdown-countries'>
                    <Dropdown.Toggle 
                    variant="light" 
                    id="dropdown-countries"
                    >
                    {country &&
                        <div className='country-selected d-inline-flex align-items-center'>
                            {country.codigo_iso && country.codigo_iso.toLowerCase() !== "xx" ?
                                <span className={`fi fi-${country.codigo_iso.toLowerCase()} me-2`} />
                            : 
                                <i className="fa-solid text-secondary fa-globe"></i>
                            }
                            <span className='d-md-inline-flex d-none ms-2'>
                                {country.nombre}
                            </span>
                        </div>
                    }
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                        {countries.map((item, key) => {
                            if(country.nombre !== item.nombre){
                                return (
                                    <Dropdown.Item key={key} onClick={() => changeCountry(item)}>
                                        {item.codigo_iso && item.codigo_iso.toLowerCase() !== "xx" ?
                                            <span className={`fi fi-${item.codigo_iso.toLowerCase()} me-2`} />
                                        : 
                                            <span className='global-flag text-secondary me-2'><i className="fa-solid fa-globe"></i></span>
                                        }
                                        <span>{item.nombre}</span>
                                    </Dropdown.Item>
                                )
                            }
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            }
        </>
    )
}

export default CountriesDropdown