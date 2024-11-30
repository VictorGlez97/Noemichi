import React, { useEffect, useState } from 'react'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Fieldset } from 'primereact/fieldset'
import { Tooltip } from 'primereact/tooltip'
import { Dialog } from 'primereact/dialog'

// import NoemichiService from '../services/noemichi';
import NoemichiBakery from '../assets/img/noemichis.png';
import axios from 'axios';

export const Menu = () => {
  
    const [products, setProducts] = useState([]);
    const [productOrder, setProductOrder] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);

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

    const HandleOpenImage = ( img ) => {

        if ( img == null ) {
            return;
        }

        // const imgBuffer = new Buffer(img, 'binary');
        // const base64Img = imgBuffer.toString('base64');
        const base64Img = img.toString('base64');
        setImage(`data:image/jpeg;base64,${base64Img}`);
        setModalVisible(true);
    }

    return (
        <div>
            <div className='col-12 flex justify-content-center'>
                {/* <img src={NoemichiBakery} alt='Noemichis bakery' style={{ width: '9rem', height: '9rem' }} /> */}
            </div>

            <Tooltip target=".custom-target-icon" />

            <div className='flex justify-content-center'>
                <Card className='sm:col-12 md:col-8'>
                    <div className='p-grid'>
                        {
                            products.map(product => (
                                <div 
                                    className='flex justify-content-between custom-target-icon mb-3' 
                                    key={ product.idproduct }
                                    data-pr-tooltip={ product.description }
                                    data-pr-position='top'
                                >
                                    <div 
                                        style={{ lineHeight: '0px' }}
                                        onClick={() => HandleOpenImage(product.image)}
                                    >
                                        <h4> { product.name } </h4>
                                        <span style={{ marginTop: '-1rem' }}> ({ product.description }) { product.image !== null && <i className='pi pi-image' style={{ cursor: 'pointer' }}></i>} </span>
                                    </div>
                                    <div>
                                        <p> $ { product.price } </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Card>
            </div>

            <div className='flex justify-content-center mt-3'>
                <Fieldset legend="Pedidos" className='sm:col-12 md:col-8'>
                <div className='p-grid'>
                        {
                            productOrder.map(product => (
                                <div className='flex justify-content-between' key={ product.idproduct }>
                                    <div style={{ lineHeight: '1px' }}>
                                        <h4> { product.name } </h4>
                                        <span> ({ product.description }) </span>
                                    </div>
                                    <div>
                                        <p> $ { product.price } </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Fieldset>
            </div>

            <Dialog visible={modalVisible} onHide={() => setModalVisible(false)} style={{ width: '25rem' }}>
                <div>
                    { image !== null && <img src={image} width="100%" alt="Imagen pancito"/> }
                </div>
            </Dialog>

        </div>
    )
}
