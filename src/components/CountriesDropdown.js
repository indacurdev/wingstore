import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import { Dropdown } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';

function CountriesDropdown() {

    const app           = useSelector((state) => state.app, shallowEqual);
    const router        = useRouter();
    const countries     = app.countries;
    const [country, setcountry] = useState(app.selectedCountry);

    const changeCountry = (item) => {
        setcountry(item);
        const countrystr = JSON.stringify(item);
        // console.log(countrystr);
        Cookies.set('country', countrystr);
        router.reload(window.location.pathname);
    }

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
                        <div className='country-selected'>
                        <span className="fi fi-ve" />
                        <span className='d-lg-inline-flex ms-2'>
                            {country.nombre}
                        </span>
                        </div>
                    }
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                    {countries.map((item, key) => {
                        return (
                        <Dropdown.Item key={key} onClick={() => changeCountry(item)}>
                            <span className="fi fi-us me-2" />
                            <span>{item.nombre}</span>
                        </Dropdown.Item>
                        )
                    })}
                    </Dropdown.Menu>
                </Dropdown>
            }
        </>
    )
}

export default CountriesDropdown