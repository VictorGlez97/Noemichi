import React, { useEffect, useRef, useState } from 'react'

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
import Table from '../components/Cupon/Table';
import api from '../services/noemichi';
import moment from 'moment';

const EditaCupones = () => {
    
    const toast = useRef(null);

    const [idCupon, setIdCupon] = useState(null);
    const [cupon, setCupon] = useState('');
    const [start, setStart] = useState(new Date());
    const [close, setClose] = useState(null);
    const [number, setNumber] = useState(0);
    const [active, setActive] = useState(true);

    const [update, setUpdate] = useState(false);

    const [modalCupons, setModalCupons] = useState(false);

    useEffect(() => {
        getTommorrowDate();
    }, [])

    const getTommorrowDate = () => {
        const today = new Date();
        today.setDate(today.getDate()+1);
        setClose(today);
    }

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
1        })

    }

    const handleCancel = () => {
        setUpdate(false);
        cleanInpts();
    }

    const handleUpdate = async () => {

        const data = {
            text: cupon,
            start,
            close,
            active,
            uses: number
        }

        const response = await api.put(`cupon/${idCupon}`, data);

        console.log(response);
        
        if ( response.data.data === undefined || response.data.data === null ) {
            responseError('No fue posible actualizar el cupon'); 
            return;                       
        }

        if ( response.data.error ) {
            responseError( response.data.msg );
            return;
        }

        responseSuccess( 'Cupón actualizado' );
        cleanInpts();

    }

    const getCupon = async ( idcupon ) => {

        setModalCupons(false);
        setUpdate(true);
        const response = await api.get(`cupon/${idcupon}`);        

        if ( response.data.data === undefined || response.data.data === null ) {
            return;
        }

        const cupons = response.data.data[0];
        console.log( cupons );

        setIdCupon( cupons.idcupon );
        setCupon( cupons.text );
        setStart( new Date(cupons.start) );
        setClose( new Date(cupons.close) );
        setNumber( cupons.uses );
        setActive( cupons.active );

    }

    const handleOpenCupons = () => {
        setModalCupons(true);
    }   

    const responseSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: msg, life: 3000 })
        cleanInpts();
    }

    const responseError = (msg) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: msg, life: 3000 });
    }

    const cleanInpts = () => {
        setIdCupon(null);
        setCupon('');
        setStart(new Date());
        getTommorrowDate();
        setNumber(0);
        setActive(true);
        setUpdate(false);
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
                                        dateFormat='dd/mm/yy'
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
                                        dateFormat='dd/mm/yy'
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
                                    mode='decimal'
                                    showButtons
                                    min={0}
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
                        </div>
                    </div>
                </Card>
            </div>

            <Dialog 
                visible={modalCupons}
                header="Cupones" 
                onHide={() => setModalCupons(false)} 
                style={{ width: '70rem' }}
            >
                <Table getCupon={getCupon} />
            </Dialog>

        </div>
    )
}

export default EditaCupones;