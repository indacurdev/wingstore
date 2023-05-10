import React, { useState } from 'react'
import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useAuth } from '@/context/auth';
import Router  from 'next/router';

function UserDropdown() {
    const user = useSelector((state) => state.session.user, shallowEqual);
    const auth = useAuth();

    const [loadingActions, setloadingActions] = useState(false);

    /*
        const handleLogout = () => {
            setloadingActions(true);
            auth.handleLogout();
            if(typeof window !== "undefined"){
                Router.reload();
            }
        }
    */

    return (
        <>
            <Dropdown className='dropdown-user'>
                <Dropdown.Toggle id="dropdown-user">
                    <div className='fw-bold'>
                        <i className="fa-solid fa-coins" />
                        <span className="ms-2">
                            {user.puntos_cliente}
                        </span>
                    </div>
                    <div className="d-none">
                        <i className="fa-regular fa-user text-primary" />
                            <span className="ms-2">
                            {(user.nombre_cliente && user.nombre_cliente !== "") ? user.nombre_cliente : user.correo_cliente}
                        </span>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" className='menu-user-top'>
                <div className="px-3 py-2">
                    
                    <p className="mb-1 h4 fw-bold text-center text-secondary">
                        {(user.nombre_cliente && user.nombre_cliente !== "") ? user.nombre_cliente : user.correo_cliente}
                    </p>

                    {user.nombre_cliente && user.nombre_cliente !== "" ?
                        <p className="mb-4 h6 text-center text-muted">
                            {user.correo_cliente}
                        </p>
                        :
                        <div className='mb-3'></div>
                    }

                    <Link href={`/cuenta/perfil`} className="btn btn-primary fw-bold w-100 mb-3">
                        <i className="fa-regular fa-user text-secondary me-2" />
                        Ver perfil 
                    </Link>
                    <Link href={`/cuenta/canjear-wpoints`} className="btn-outline-secondary mb-3 w-100 fw-bold px-3 btn me-3">
                        <i className="fa-solid fa-bag-shopping me-2" />
                        Comprar wcoins 
                    </Link>
                    <ul className="user-data-list-dropdown">
                        <li>
                            <div className="d-flex align-items-center justify-content-between">
                            <div className="text-left">
                                <i className="fa-solid text-primary fa-coins me-2" />
                                <span>Wpoints</span>
                            </div>
                            <div className="fw-bold text-secondary">
                                <span>{Number(user.puntos_cliente).toFixed(2)}</span>
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
                                <span>{Number(user.wingscoins).toFixed(2)}</span>
                            </div>
                            </div>
                        </li>
                    </ul>
                    <hr />
                    <Link href={`/logout`} className="btn btn-unstyled fw-bold w-100">
                        <>
                            <i className="fa-solid fa-right-from-bracket me-2" />
                            Cerrar sesión
                        </>
                    </Link>
                    {/* 
                        <button 
                            disabled={loadingActions}
                            onClick={() => handleLogout()} 
                            className="btn btn-unstyled fw-bold w-100"
                        >
                            {loadingActions ? 
                                <>
                                    <i className="fa-solid fa-right-from-bracket me-2" />
                                    Cerrar sesión
                                </>
                            : 
                                <>
                                    <i className="fa-solid fa-right-from-bracket me-2" />
                                    Cerrar sesión
                                </>
                            }
                        </button>
                    */}
                </div>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default UserDropdown