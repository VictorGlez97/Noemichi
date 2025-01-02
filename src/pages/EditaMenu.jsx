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
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';

import Table from '../components/editaMenu/Table';

export const EditaMenu = () => {

    const toast = useRef(null);
    const fileupd = useRef(null);

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [isTypeA, setIsTypeA] = useState(false);
    const [update, setUpdate] = useState(false);

    // const [image, setImage] = useState(null);
    const [images, setImages] = useState(null);
    const [imgProduct, setImgProduct] = useState(null);

    // const [products, setProducts] = useState([]);

    const [modalProducts, setModalProducts] = useState(false);

    // ARCHIVOS
    // const [totalSize, setTotalSize] = useState(0);
    // const fileUploadRef = useRef(null);
    // ARCHIVOS

    const handleSubmit = async (e) => {

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

                console.log( res.data );
                console.log( res.data.data.idproduct );

                if ( images !== null ) {

                    // handleSubmitImg(res.data.idproduct);
                    images.map(async (itm) => {
                        await handleSubmitImg(res.data.data.idproduct, itm.img);
                    });

                }

                // responseSuccess(res.data.data);
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

        console.log( fileupd );

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

                    setImages(null);
                    setImgProduct(null);
                    fileupd.current.setFiles(null);

                    var count = 0;
                    if (res.data.data[0].image !== undefined && res.data.data[0].image !== null && res.data.data[0].image.length > 0) {
                        res.data.data[0].image.map(itm => {
                            var base64Img = itm.toString('base64');
                            addImageFile(`data:image/jpeg;base64,${base64Img}`, `${count}.jpeg`);
                            count++;
                        });
                    }

                }
            }

        })
        .catch(error => {
            console.log( error );
        })

    }

    const addImageFile = (base64Img, fileName) => {

        const mimeType = "image/jpeg";
        const byteString = atob(base64Img.split(",")[1]);
        const byteArray = new Uint8Array(byteString.length);

        for (let i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(1);
        }

        const blob = new Blob([byteArray], { type: mimeType });

        console.log( blob );

        const newFile = new File([byteArray], fileName, {type: mimeType})
        newFile.objectURL = URL.createObjectURL(blob);

        console.log( newFile );

        fileupd.current.setFiles((prevFiles) => [...prevFiles, newFile])

        if ( !Array.isArray(images) ) {
            setImages([]);
        }

        if ( !Array.isArray(imgProduct) ) {
            setImgProduct([]);
        }

        setImages((prevFiles) => [...prevFiles, { id: fileName.split('.')[0], img: newFile }]);
        setImgProduct((prevFiles) => [...prevFiles, { id: fileName.split('.')[0], img: newFile }]);

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
        setImages(null);
        fileupd.current.setFiles([]);
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

    const handleSubmitImg = async ( idproduct, image ) => {

        try {
    
            const formData = new FormData();
            formData.append('image', image);
            formData.append('idproduct', idproduct);
    
            console.log( formData );
    
            await axios.post('https://pruebanode-victorglez97-victorglez97s-projects.vercel.app/api/v1/product/img', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log( res );
                // responseSuccess();
            })
            .catch(error => {
                console.log( error );
            })

        } catch (error) {
            console.log( error );
        }
    }

    // const InvoiceUploadHandler = ({ files }) => {
    //     try {
            
    //         console.log( files );

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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

    const onUpload = (e) => {

        let files = e.files;
        console.log( files );

    }

    const onSelect = (e) => {

        let files = e.files;
        console.log( files );

        var arrayImages = [];

        var count = 0;
        files.map(itm => {
            // console.log( itm );
            arrayImages.push({ id: count, img: itm })
            count++;
        });

        setImages(arrayImages);
        
    }

    const onRemove = (e) => {
        
        console.log( images );

        console.log( e.file.name );

        // images.map(itm => { console.log(itm.img.name); })

        var arrayImages = images.filter((itm) => itm.img.name !== e.file.name);
        console.log( arrayImages );

        setImages(arrayImages);

    }

    const sendImages = () => {

    }

    return (
        <div className='mt-4'>

            <Toast ref={toast} />

            <div className='flex justify-content-center'>
                <Card title={ headerCard } className='sm:col-12 md:col-7'>

                    <div>
                        <div className="p-field col-12">
                            <label htmlFor="name">Pancito</label>
                            <div>
                                <InputText 
                                    id="name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    className='md:col-12' 
                                />
                            </div>
                        </div>

                        <div className="p-field col-12">
                            <label htmlFor="price">Precio</label>
                            <div>
                                <InputNumber 
                                    id="price" 
                                    value={price} 
                                    onValueChange={(e) => setPrice(e.value)} 
                                    mode="currency" 
                                    currency="USD" locale="en-US"
                                    className='md:col-12' 
                                />
                            </div>
                        </div>

                        <div className="p-field col-12">
                            <label htmlFor="description">Descripción</label>
                            <div>
                                <InputTextarea 
                                    id="description" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    rows={5}
                                    className='md:col-12'
                                />
                            </div>
                        </div>

                        <div className="p-field-checkbox col-12">
                            <Checkbox inputId="isTypeA" checked={isTypeA} onChange={(e) => setIsTypeA(e.checked)} />
                            <label htmlFor="isTypeA"> Por pedido </label>
                        </div>

                        <div className='p-field col-12'>
                            <FileUpload 
                                name='demo[]'
                                ref={fileupd}
                                customUpload
                                multiple
                                accept='image/*'
                                maxFileSize={10000000}
                                emptyTemplate={<p className='m-0'> Selecciona o arrastra las imagenes </p>}
                                onUpload={onUpload}
                                onSelect={onSelect}
                                onRemove={onRemove}
                                chooseLabel='imagenes'
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

            <Dialog 
                visible={modalProducts}
                header="Pancitos" 
                onHide={() => setModalProducts(false)} 
                style={{ width: '50rem' }}
            >
                <Table getProduct={getProduct} />
            </Dialog>

        </div>
    )
}