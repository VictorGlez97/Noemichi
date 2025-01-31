import { useEffect, useState } from "react";

import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import api from "../services/noemichi";
import { Dropdown } from "primereact/dropdown";
import moment from "moment";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import Info from "../components/Orders/Info";

const Orders = () => {
    
    const [status, setStatus] = useState(null);
    const [date, setDate] = useState(null);
    const [orders, setOrders] = useState([]);
    const [infoOrder, setInfoOrder] = useState(null);
    const [modalInfo, setModalInfo] = useState(false);

    const [selectStatus, setSelectStatus] = useState(null);

    useEffect(() => {
        searchOrders();

        setStatus([
            {
                value: 'envoy',
                value2: 'Solicitado'
            },
            {
                value: 'seen',
                value2: 'Visto'
            },
            {
                value: 'cooking',
                value2: 'Cocinando'
            },
            {
                value: 'packaging',
                value2: 'Empaquetado'
            },
            {
                value: 'delivered',
                value2: 'Enrtregado'
            }
        ]);

    },[]);

    const searchOrders = async () => {

        var dataDate = `${moment().add(1, 'days').format('YYYY-MM-DD')} 23:59:00`;

        if ( date === null ) {
            const today = new Date();
            await today.setDate(today.getDate()+1);
            setDate(today);
        }

        if ( selectStatus === null ) {
            setSelectStatus('envoy');
        }

        var dataStatus = status === null || status === undefined ? '' : selectStatus;
        dataDate = date === null || date === undefined ? dataDate : `${moment(date).format('YYYY-MM-DD')} 23:59:00`;

        const response = await api.get(`order?status=${dataStatus}&date=${dataDate}`);

        if ( response.data.data && response.data.data.length > 0 ) {
            setOrders(response.data.data);
        }
    }

    const getStatus = (data) => {
        // var status = data.active ? <Tag value="Activo" severity="Success" /> : <Tag value="Inactivo" severity="Danger" />;
        var status = '';

        switch ( data.status ) {
            case 'envoy':
                status = <Tag value='Solicitado' severity='secondary' icon='pi pi-envelope' />
                break;
        
            case 'seen':
                status = <Tag value='Visto' severity='info' icon='pi pi-eye' />
                break;

            case 'cooking':
                status = <Tag value='Cocinando' severity='contrast' icon='pi pi-bullseye' />
                break;

            case 'packaging':
                status = <Tag value='Empaquetando' severity='warning' icon='pi pi-gift' />
                break;

            case 'delivered':
                status = <Tag value='Entregado' severity='success' icon='pi pi-face-smile' />
                break;

            default:
                break;
        }
        
        return status;
    }

    const formatDate = ( data ) => {
        return moment(data.date).format('DD/MM/YYYY');
    } 

    const getInfoOrder = ( data ) => {
        return <Button icon='pi pi-book' size='small' onClick={() => getDataOrder(data.idorder)} />
    }

    const getDataOrder = async ( idOrder ) => {
        //console.log( idOrder );
        const response = await api.get(`order/${idOrder}`);
        //console.log( response );

        if ( !response.data.data ) {
            return;
        }

        setInfoOrder(response.data.data);
        setModalInfo(true);
    }

    const HandleCloseModal= () => {
        setModalInfo(false);
    }

    return(
        <>
            <div className="flex justify-content-center mt-4">
                <Card title='Pedidos' className="col-11">
                    <div className="flex justify-content-between" style={{ marginTop: '-1rem' }}>
                        <div className="col-5">
                            <label htmlFor=""> Fecha inicio </label>
                            <div>
                                <Calendar 
                                    value={date}
                                    onChange={(e) => setDate(e.value)}
                                    dateFormat="dd/mm/yy"
                                    readOnlyInput
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="col-5">
                            <label htmlFor=""> Estatus </label>
                            <div>
                                <Dropdown 
                                    value={selectStatus}
                                    onChange={(e) => setSelectStatus(e.value)}
                                    options={status}
                                    optionLabel="value2"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="col-2 mt-4">
                            <Button 
                                icon='pi pi-search' 
                                size="small" 
                                onClick={searchOrders}
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <DataTable value={orders} tableStyle={{ minWidth: '50rem' }}>
                            {/* <Column field='date' header='Fecha entrega'></Column> */}
                            <Column 
                                field='date'
                                header='Fecha entrega'
                                body={ formatDate } 
                                style={{ minWidth: '2rem' }}
                            ></Column>
                            <Column field='title' header='Nombre'></Column>
                            <Column 
                                field='active' 
                                header='Estatus'
                                style={{ minWidth: '7rem' }}
                                body={ getStatus }
                            ></Column>
                            <Column field='phone' header='Telefono'></Column>
                            <Column field='total' header='Costo'></Column>
                            <Column 
                                field='idcupon'
                                body={ getInfoOrder }
                            ></Column>
                        </DataTable>
                    </div>
                </Card>
            </div>

            <Dialog 
                visible={modalInfo}
                header="Orden" 
                onHide={() => setModalInfo(false)} 
                style={{ width: '55rem' }}
            >
                <Info info={infoOrder} HandleCloseModal={HandleCloseModal} />
            </Dialog>
        </>
    )
}

export default Orders;