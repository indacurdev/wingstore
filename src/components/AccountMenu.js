import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

const menu = [
    {
        title: 'Perfil',
        icon:  'fa-regular fa-user',
        url:   '/cuenta/perfil'
    },
    {
        title: 'Historial de compras',
        icon:  'fa-solid fa-money-check-dollar',
        url:   '/cuenta/historial-de-compras'
    },
    {
        title: 'Canjear wpoints',
        icon:  'fa-solid fa-money-bill-transfer',
        url:   '/cuenta/canjear-wpoints'
    },
    {
        title: 'Configuración',
        icon:  'fa-solid fa-gears',
        url:   '/cuenta/configuracion'
    },
];

function AccountMenu() {

    const router = useRouter();
    const path   = router.pathname;

    console.log('pathname', path);

    return (
        <div className='accountMenu'>
            <div className="card-body">
                <h4 className='h5 text-secondary fw-bold mb-2'>
                    Menú
                </h4>
                <ul className="nav flex-column">
                    {menu.map((item, key) => {
                        
                        return (
                            <li key={key} className="nav-item">
                                <Link 
                                    className={`${path.includes(item.url) ? 'active' : ''}  nav-link`} 
                                    href={item.url}
                                >
                                    <i className={`${item.icon} ${path.includes(item.url) ? 'text-white' : 'text-secondary'} me-2`}></i>
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}

                </ul>
            </div>
        </div>
    )
}

export default AccountMenu