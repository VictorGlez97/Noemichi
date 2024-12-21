import React, { useRef, useState } from 'react'

import axios from 'axios';

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

const EditaCupones = () => {
    
    const toast = useRef(null);
    
    const [cupon, setCupon] = useState('');
    const [start, setStart] = useState('');
    const [close, setClose] = useState('');
    const [number, setNumber] = useState(0);
    const [active, setActive] = useState(true);

    const [update, setUpdate] = useState(false);

    const [modalCupons, setModalCupons] = useState(false);

    const headerCard = () => {
        return (
            <div className='flex justify-content-between'>
                <div>
                    { update ? 'Actualiza cupón' : 'Nuevo cupón'  }
                </div>
                <div style={{ marginTop: '-.5rem' }}>
                    <Button label='ver cupones' size='small' onClick={ handleOpenCupons } />
                </div>
            </div>
        )

    }

    const handleSubmit = () => {

        const data = {
            text: cupon,
            start,
            close,
            active,
            uses: number
        }

        console.log( data );

        axios.post('https://pruebanode-victorglez97-victorglez97s-projects.vercel.app/api/v1/cupon', data)
        .then(res => {

            console.log( res );

            if ( res.status === 200 ) {
                responseSuccess('Cupón guardado');
                return;
            }

            responseError(res.data.msg);
        })
        .catch(error => {
            console.log( error );
            responseError(error)
        })

    }

    const handleCancel = () => {

    }

    const handleUpdate = () => {

    }

    const getCupon = () => {

    }

    const handleOpenCupons = () => {

    }

    const responseSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: msg, life: 3000 })
        cleanInpts();
    }

    const responseError = (msg) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: msg, life: 3000 });
    }

    const cleanInpts = () => {
        setCupon('');
        setStart('');
        setClose('');
        setNumber(0);
        setActive(true);
    }

    return(
        <div className='mt-4'>

            <Toast ref={toast} />

            <div className='flex justify-content-center'>
                <Card title={ headerCard } className='sm:col-12 md:col-7'>

                    <div>
                        <div className="p-field col-12">
                            <label htmlFor="name"> Cupón </label>
                            <div>
                                <InputText 
                                    id="name" 
                                    value={cupon} 
                                    onChange={(e) => setCupon(e.target.value)}
                                    className='md:col-12' 
                                />
                            </div>
                        </div>

                        <div className='flex justify-content-between'>

                            <div className="p-field col-6">
                                <label htmlFor="inicio"> Inicio </label>
                                <div>
                                    <Calendar 
                                        id="start" 
                                        value={start} 
                                        onChange={(e) => setStart(e.value)} 
                                        className='md:col-12'
                                    />
                                </div>
                            </div>

                            <div className="p-field col-6">
                                <label htmlFor="fin"> Fin </label>
                                <div>
                                    <Calendar 
                                        id="close" 
                                        value={close} 
                                        onChange={(e) => setClose(e.value)} 
                                        className='md:col-12'
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="p-field col-12">
                            <label htmlFor="number"> # cupones disponibles </label>
                            <div>
                                <InputNumber 
                                    id="number" 
                                    value={number} 
                                    onValueChange={(e) => setNumber(e.value)} 
                                    className='md:col-12' 
                                />
                            </div>
                        </div>

                        <div className="p-field-checkbox col-12">
                            <Checkbox inputId="isTypeA" checked={active} onChange={(e) => setActive(e.checked)} />
                            <label htmlFor="isTypeA"> Activo </label>
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
                visible={modalCupons}
                header="Pancitos" 
                onHide={() => setModalCupons(false)} 
                style={{ width: '50rem' }}
            >
                {/* <Cupons getCupon={getCupon} /> */}
                <div></div>
            </Dialog>

        </div>
    )
}

export default EditaCupones;