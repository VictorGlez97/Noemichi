import React, { useEffect, useRef, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Fieldset } from 'primereact/fieldset'
import { Tooltip } from 'primereact/tooltip'
import { Dialog } from 'primereact/dialog'
import { Galleria } from 'primereact/galleria'

// import NoemichiService from '../services/noemichi';
import NoemichiBakery from '../assets/img/noemichis.png';
import axios from 'axios';
import api from '../services/noemichi'

import Seccion from '../components/Menu/Seccion';

export const Menu = () => {
  
    const navigate = useNavigate();
    const location = useLocation();
    const galleria = useRef(null);
    
    const { state } = location;

    const [socialMedia, setSocialMedia] = useState([]);
    const [products, setProducts] = useState([]);
    const [productOrder, setProductOrder] = useState([]);
    const [modalCupon, setModalCupon] = useState(false);
    const [images, setImages] = useState(null);
    const [types, setTypes] = useState([]); 
    
    useEffect(() => {

        getProducts();
        getTypes();
        getSocialMedia();

        if (state !== undefined && state !== null && state.cupon !== undefined && state.cupon !== null && state.cupon) {
            setModalCupon(true);
            state.cupon = false;
        }

    }, []);

    const getProducts = async () => {

        const res = await api.get('product/menu');
    
        console.log( res );

        if ( res.status === 200 ) {
            console.log( res.data.data.productos );
            console.log(res.data.data.pedidos);
            setProducts(res.data.data.productos);
            setProductOrder(res.data.data.pedidos);            
            return;
        }
    }

    const getTypes = async () => {
        const response = await api.get('product/types');
        console.log( response );
        if ( response.data.data && response.data.data.length > 0 ) {
            setTypes(response.data.data);
        }
    }

    const getSocialMedia = async () => {

        const response = await api.get('config?type=SOCIALMEDIA');
        if ( response.data.data !== undefined ) {
            console.log( response.data.data );
            setSocialMedia(response.data.data);            
        }

    }

    const HandleOpenImage = ( img ) => {

        if ( img == null ) {
            return;
        }

        galleria.current.show();
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
        const div = document.getElementById('gale');
        div.classList.toggle('p-component-overlay');
        div.classList.toggle('p-component-overlay-enter');
    }

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    }

    const handleCupon = () => {
        navigate('/cupon');
    }

    return (
        <>        
            <div>
                <div className='col-12 flex justify-content-center'>
                    <img src={NoemichiBakery} alt='Noemichis bakery' style={{ width: '9rem', height: '9rem' }} />
                </div>

                <Tooltip target=".custom-target-icon" />
                
                <div className='flex justify-content-center'>
                    <Button 
                        label='Hacer pedido' 
                        icon='pi pi-shopping-cart' 
                        size='small'
                        className='mt-2 mb-2'
                        onClick={() => { navigate('/pedido') }} 
                    />
                </div> 

                <div className='flex justify-content-center mt-3 mb-3 gap-6'>
                    {
                    socialMedia.map(social => (
                        <div className='flex gap-1' style={{ color: '#ee925a' }}>
                            <i className={ social.value2 }></i>
                            <span className='text-base'> { social.value } </span>
                        </div>    
                    ))
                    }
                </div>

                <div className='flex justify-content-center'>
                    <Card className='md:col-8'>
                    {
                        (types !== undefined && types.length > 0) && (products !== undefined && products.length > 0)
                        &&
                        <Seccion types={types} products={products} HandleOpenImage={HandleOpenImage} />
                    }
                    </Card>
                </div>

                <div className='flex justify-content-center mt-3'>
                    <Fieldset legend="Pedidos" className='sm:col-12 md:col-8'>
                    {
                        (types !== undefined && types.length > 0) && (products !== undefined && products.length > 0)
                        &&
                        <Seccion types={types} products={productOrder} HandleOpenImage={HandleOpenImage} />
                    }
                    </Fieldset>
                </div>

            </div>
            <Galleria 
                ref={galleria} value={images} numVisible={9} style={{ maxWidth: '50%' }} id='gale'
                circular fullScreen showItemNavigators showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate} 
            />

            <Dialog visible={modalCupon} onHide={() => setModalCupon(false)} style={{ width: '20rem' }}>
                <div>
                    <div className='flex justify-content-center'>
                        <img 
                            src={NoemichiBakery} 
                            alt='Noemichis bakery' 
                            style={{ width: '6rem', height: '6rem' }} 
                        />
                    </div>
                    <div className='flex justify-content-center'>
                        <h5> ¿ Quieres ganarte un cupon ? </h5>
                    </div>
                    <div className='flex justify-content-center gap-3'>
                        <Button label='no' severity='danger' onClick={ () => { setModalCupon(false) }} />
                        <Button label='si' severity='success' onClick={ handleCupon } />
                    </div>
                </div>
            </Dialog>
        </>
    )
}