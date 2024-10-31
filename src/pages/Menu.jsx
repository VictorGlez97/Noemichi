import React, { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Fieldset } from 'primereact/fieldset'

import NoemichiService from '../services/noemichi';
import NoemichiBakery from '../assets/img/noemichis.png';
import axios from 'axios';

export const Menu = () => {
  
    const [products, setProducts] = useState([]);
    const [productOrder, setProductOrder] = useState([]);

    useEffect(() => {
        // NoemichiService.get('product')
        // axios.get('http://localhost:5000/api/v1/product')
        axios.get('https://pruebanode-victorglez97-victorglez97s-projects.vercel.app/api/v1/product')
        .then(res => {
            if ( res.status === 200 ) {
                console.log( res.data );
                setProducts(res.data.data.filter(x => x.seccion === null || x.seccion === 1));
                setProductOrder(res.data.data.filter(x => x.seccion === 2));
            }
        })
        .catch(error => {
            console.log( error );
        })
    }, []);

    return (
        <div>
            <div className='col-12 flex justify-content-center'>
                <img src={NoemichiBakery} alt='Noemichis bakery' style={{ width: '9rem', height: '9rem' }} />
            </div>

            <div className='flex justify-content-center'>
                <Card className='col-8'>
                    <div className='p-grid'>
                        {
                            products.map(product => (
                                <div className='flex justify-content-between' key={ product.idproduct }>
                                    <h4> { product.description } </h4>
                                    <h4> $ { product.price } </h4>
                                </div>
                            ))
                        }
                    </div>
                </Card>
            </div>

            <div className='flex justify-content-center mt-3'>
                <Fieldset legend="Pedidos" className='col-8'>
                <div className='p-grid'>
                        {
                            productOrder.map(product => (
                                <div className='flex justify-content-between' key={ product.idproduct }>
                                    <h4> { product.description } </h4>
                                    <h4> $ { product.price } </h4>
                                </div>
                            ))
                        }
                    </div>
                </Fieldset>
            </div>
        </div>
    )
}