import React, { useEffect, useState } from 'react'

import NoemichiService from '../services/noemichi';
import NoemichiBakery from '../assets/img/noemichis.png';

export const Menu = () => {
  
    const [products, setProducts] = useState([]);

    useEffect(() => {
        NoemichiService.get('product')
        .then(res => {
            setProducts(res.data)
        })
        .catch(error => {
            console.log( error );
        })
    }, []);

    return (
        <div>
            <div className='col-12 flex'>
                <div className='justify-content-center'>
                    <img src={NoemichiBakery} alt='Noemichis bakery' style={{ width: '5rem', height: '5rem' }} />
                </div>

                <div>
                    <pre>
                        {{ products }}
                    </pre>
                </div>

            </div>
        </div>
    )
}
