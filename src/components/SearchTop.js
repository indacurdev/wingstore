import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/config/config';
import { shallowEqual, useSelector } from 'react-redux';
import Link from 'next/link';

function SearchTop() {

    const app             = useSelector((state) => state.app, shallowEqual);
    const country         = app.selectedCountry;

    const [text, settext] = useState("");
    const [lista, setlista] = useState([]);

    const searchByText = (val = "") => {
        settext(val);

        if(val.length > 2){
            axios.get(`${API_URL}/products_search/${country.id}/${val}`)
            .then((res) => {
                const results = res.data;
                console.log(results);

                if(results.length > 0){
                    setlista(results);
                }else{
                    setlista([]);
                }

            }).catch((err) => {
                console.log(err);
            });
        }else{
            setlista([]);
        }
    }

    const goToProducts = () => {

    }

    const clean = () => {
        setlista([]);
    }

    return (
        <>
            <form 
                onSubmit={() => goToProducts()} className='form-searchform' 
                // onBlur={() => clean()}
            >
                <div className="input-group searchform">
                    <input 
                        type="text" 
                        className="form-control border-0" 
                        placeholder="Buscar juegos" 
                        onChange={(e) => searchByText(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button type="submit" className="btn border-0 bg-light text-secondary btn-outline-secondary">
                            <i className="fa-solid fa-magnifying-glass" />
                        </button>
                    </div>
                </div>

                {lista.length > 0 &&
                    <div className='content-top-results'>
                        <ul>
                            {lista.map((item, key) => {
                                return (
                                    <li key={key}>
                                        <Link href={`/product/${item.slug}`} onClick={() => clean()}>
                                            <i className="fa-solid fa-magnifying-glass me-2 d-none"></i> 
                                            <span>
                                                <i className="me-3 fa-solid fa-arrow-up-right-from-square"></i> {item.nombre}
                                            </span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                }
            </form>
        </>
    );
}

export default SearchTop