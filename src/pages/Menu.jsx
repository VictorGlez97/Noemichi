import React, { useEffect, useRef, useState } from 'react'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Fieldset } from 'primereact/fieldset'
import { Tooltip } from 'primereact/tooltip'
import { Dialog } from 'primereact/dialog'
import { Galleria } from 'primereact/galleria'

// import NoemichiService from '../services/noemichi';
import NoemichiBakery from '../assets/img/noemichis.png';
import axios from 'axios';

export const Menu = () => {
  
    const [products, setProducts] = useState([]);
    const [productOrder, setProductOrder] = useState([]);

    // const [modalVisible, setModalVisible] = useState(false);
    // const [image, setImage] = useState(null);

    const [images, setImages] = useState(null);
    const galleria = useRef(null);

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

        galleria.current.show();

        // const imgBuffer = new Buffer(img, 'binary');
        // const base64Img = imgBuffer.toString('base64');
        
        // CON DIALOG
        // const base64Img = img.toString('base64');
        // setImage(`data:image/jpeg;base64,${base64Img}`);
        // setModalVisible(true);

        setImages(null);

        var imgs = [];

        // CON GALLERIA
        img.map(itm => {
            var base64Img = itm.toString('base64');
            imgs.push({
                itemImageSrc: `data:image/jpeg;base64,${base64Img}`,
                thumbnailImageSrc: `data:image/jpeg;base64,${base64Img}`,
                alt: 'Imagen de pancito',
                title: 'Pancito'
            })
        });

        setImages(imgs);
        console.log(images);

    }

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    }

    return (
        <div>
            <div className='col-12 flex justify-content-center'>
                <img src={NoemichiBakery} alt='Noemichis bakery' style={{ width: '9rem', height: '9rem' }} />
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
                                    <div className='flex'>
                                        <div 
                                            className='mt-4 mr-3'
                                            onClick={() => HandleOpenImage(product.image)}
                                        >
                                            { product.image !== null && <i className='pi pi-image' style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#f0aed1' }}></i>}
                                        </div>
                                        <div>
                                            <div style={{ lineHeight: '0px' }} >
                                                <h4 style={{ color: '#f0aed1' }}> { product.name } </h4>
                                                <span style={{ marginTop: '-1rem' }}> ({ product.description }) </span>
                                            </div>
                                        </div>
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

            <Galleria 
                ref={galleria} value={images} 
                numVisible={9} style={{ maxWidth: '50%' }} 
                circular fullScreen showItemNavigators 
                showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate} 
            />

            {/*<Dialog visible={modalVisible} onHide={() => setModalVisible(false)} style={{ width: '25rem' }}>
                <div>
                    { image !== null && <img src={image} width="100%" alt="Imagen pancito"/> }
                </div>
            </Dialog>*/}

        </div>
    )
}
