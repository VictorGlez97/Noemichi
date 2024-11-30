import React, { useRef, useState, useEffect } from 'react'

import axios from 'axios';

// COMPONENTES PRIMEVUE
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import Table from '../components/editaMenu/Table';

export const EditaMenu = () => {

    const toast = useRef(null);

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [isTypeA, setIsTypeA] = useState(false);
    const [update, setUpdate] = useState(false);

    const [image, setImage] = useState(null);

    const [products, setProducts] = useState([]);

    const [modalProducts, setModalProducts] = useState(false);

    const handleSubmit = async () => {

        const data = {
            name: name,
            description: description,
            price: price,
            seccion: isTypeA ? 2 : 1
        }

        axios.post('https://pruebanode-victorglez97-victorglez97s-projects.vercel.app/api/v1/product', data)
        .then(res => {

            console.log( res );

            if ( res.status === 200 ) {
                responseSuccess('Producto guardado');

                if ( image !== null ) {
                    handleSubmitImg(res.data.idproduct);
                }

                // return;
            }

            toast.current.show({ severity: 'error', summary: 'Error', detail: res.data.msg, life: 3000 });
        })
        .catch(error => {
            console.log( error );
            toast.current.show({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
        })

    }

    const getProduct = async ( idProduct ) => {

        setModalProducts(false);
        axios.get(`https://pruebanode-victorglez97-victorglez97s-projects.vercel.app/api/v1/product/${idProduct}`)
        .then(res => {

            console.log( res.status );
            console.log( res.data );

            if ( res.status === 200 ) {
                if ( res.data.data.length === 1 ) {

                    const product = res.data.data[0];

                    setId(product.idproduct);
                    setName(product.name);
                    setDescription(product.description);
                    setPrice(product.price);
                    setIsTypeA(product.seccion === 2 ? true : false);
                    setUpdate(true);

                }
            }

        })
        .catch(error => {
            console.log( error );
        })

    }

    const handleUpdate = async () => {

        const data = {
            name: name,
            description: description,
            price: price,
            seccion: isTypeA ? 2 : 1
        }

        axios.put(`https://pruebanode-victorglez97-victorglez97s-projects.vercel.app/api/v1/product/${id}`, data)
        .then(res => {

            if ( res.status === 200 ) {
                responseSuccess('Producto actualizado');
                // return;

                if ( image !== null ) {
                    handleSubmitImg(res.data.idproduct);
                }

            }

        })
        .catch(error => {
            console.log( error );
        })

    }

    const handleCancel = () => {
        setId(0);
        setUpdate(false);
        setUpdate(!update);
        cleanInpts();
    }

    const responseSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: msg, life: 3000 })
        cleanInpts();
    }

    const cleanInpts = () => {
        setName('');
        setDescription('');
        setPrice(0);
        setIsTypeA(false);
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmitImg = async ( idproduct ) => {

        try {
    
            const formData = new FormData();
            formData.append('image', image);
            formData.append('idProduct', idproduct);
    
            console.log( formData );
    
            await axios.post('http://localhost:5000/api/v1/product/img', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                
                console.log( res );

                responseSuccess(res.data)

            })
            .catch(error => {
                console.log( error );
            })

        } catch (error) {
            console.log( error );
        }
    }

    const headerCard = () => {
        return (
            <div className='flex justify-content-between'>
                <div>
                    { update ? 'Actualiza pancito' : 'Nuevo pancito'  }
                </div>
                <div style={{ marginTop: '-.5rem' }}>
                    <Button label='ver pancitos' size='small' onClick={ handleOpenProducts } />
                </div>
            </div>
        )

    }

    const handleOpenProducts = () => {
        setModalProducts(true);
    }

    return (
        <div>

            <Toast ref={toast} />

            <div className='flex justify-content-center'>
                <Card title={ headerCard } className='sm:col-12 md:col-5'>

                    <div>
                        <div className="p-field col-12">
                            <label htmlFor="name">Pancito</label>
                            <div>
                                <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>

                        <div className="p-field col-12">
                            <label htmlFor="price">Precio</label>
                            <div>
                                <InputNumber id="price" value={price} onValueChange={(e) => setPrice(e.value)} mode="currency" currency="USD" locale="en-US" />
                            </div>
                        </div>

                        <div className="p-field col-12">
                            <label htmlFor="description">Descripción</label>
                            <div>
                                <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
                            </div>
                        </div>

                        <div className="p-field-checkbox col-12">
                            <Checkbox inputId="isTypeA" checked={isTypeA} onChange={(e) => setIsTypeA(e.checked)} />
                            <label htmlFor="isTypeA"> Por pedido </label>
                        </div>

                        <div className='p-field col-12'>
                            <input
                                type='file'
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="p-field col-12 mt-2 flex justify-content-end">
                            <Button type="submit" size='small' icon="pi pi-save" className='mr-2' onClick={handleSubmit} visible={!update} />
                            <Button type='submit' size='small' icon='pi pi-times' className='mr-2' onClick={handleCancel} severity='secondary' visible={update} />
                            <Button type='submit' size='small' icon='pi pi-save' className='mr-2' onClick={handleUpdate} visible={update} />
                            {/* <Button type='submit' size='small' icon='pi -pi-image' className='mr-2' onClick={handleSubmitImg} /> */}
                        </div>
                    </div>
                </Card>
            </div>

            <Dialog visible={modalProducts} onHide={() => setModalProducts(false)} style={{ width: '50rem' }}>
                <Table getProduct={getProduct} />
            </Dialog>

        </div>
    )
}
