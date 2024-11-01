import React, { useRef, useState, useEffect } from 'react'

import axios from 'axios';

// COMPONENTES PRIMEVUE
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { classNames } from 'primereact/utils';
import { Tag } from 'primereact/tag';

export const EditaMenu = () => {

    const toast = useRef(null);

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [isTypeA, setIsTypeA] = useState(false);
    const [update, setUpdate] = useState(false);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://pruebanode-victorglez97-victorglez97s-projects.vercel.app/api/v1/product')
        .then(res => {
            if ( res.status === 200 ) {
                console.log( res.data );
                setProducts(res.data.data);
            }
        })
        .catch(error => {
            console.log( error );
        })
    }, []);

    const getStatus = (data) => {
        // console.log(data);
        var status = data.seccion === 2 ? <Tag value="Por pedido" severity="Warning" /> : "";
        return status;
    }

    const getBtnEdit = (data) => {
        // console.log(data);
        return <Button icon='pi pi-pencil' size='small' text onClick={() => { getProduct(data.idproduct) }} />
    }

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
                return;
            }

            toast.current.show({ severity: 'error', summary: 'Error', detail: res.data.msg, life: 3000 });
        })
        .catch(error => {
            console.log( error );
            toast.current.show({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
        })

    }

    const getProduct = async ( idProduct ) => {

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
                return;
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

    return (
        <div>

            <Toast ref={toast} />

            <div className='flex justify-content-center'>
                <Card title={ update ? 'Actualiza pancito' : 'Nuevo pancito' } className='sm:col-12 md:col-5'>

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

                        <div className="p-field col-12 mt-2 flex justify-content-end">
                            <Button type="submit" size='small' icon="pi pi-save" className='mr-2' onClick={handleSubmit} visible={!update} />
                            <Button type='submit' size='small' icon='pi pi-times' className='mr-2' onClick={handleCancel} severity='secondary' visible={update} />
                            <Button type='submit' size='small' icon='pi pi-save' className='mr-2' onClick={handleUpdate} visible={update} />
                        </div>
                    </div>
                </Card>
            </div>
            
            <div className='flex justify-content-center col-12'>
                <Card title="Pancito" className='col-12'>
                    <DataTable value={products} size='small'>
                        <Column field='name' header='pancito'></Column>
                        <Column field='description' header='descripción'></Column>
                        <Column field='price' header='precio'></Column>
                        <Column 
                            field='seccion' 
                            header='por pedido'
                            style={{ minWidth: '6rem' }}
                            body={ getStatus }
                        ></Column>
                        <Column 
                            field='idproduct'
                            body={ getBtnEdit }
                        ></Column>
                        {/* <Column 
                            field='idproduct'
                            body={ getBtnDel }
                        ></Column> */}
                    </DataTable>
                </Card>
            </div>

        </div>
    )
}
