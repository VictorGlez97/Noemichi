import { useState, useEffect } from "react";

import axios from 'axios';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

import api from "../../services/noemichi";
import moment from "moment";

const Table = ({ getCupon }) => {

    const [cupones, setCupones] = useState(null);

    useEffect(() => {
        getCupones();
    }, []);

    const getCupones = async () => {

        const response = await api.get('/cupon');
        if ( response.data.data ) {
            setCupones(response.data.data);
        } 

    }

    const getStatus = (data) => {
        var status = data.active ? <Tag value="Activo" severity="Success" /> : <Tag value="Inactivo" severity="Danger" />;
        return status;
    }

    const getBtnEdit = (data) => {
        return <Button icon='pi pi-pencil' size='small' text onClick={() => { getCupon(data.idcupon) }} />
    }

    const formatInitDate = (data) => {
        const date = moment(data.start).format('DD/MM/YYYY HH:mm');
        //console.log(date);
        
        return date;
    }

    const formatEndDate = (data) => {
        const date = moment(data.close).format('DD/MM/YYYY HH:mm');
        return date; 
    }

    return(
        <>
            <div className='flex justify-content-center col-12'>
                <Card className='col-12'>
                    <DataTable value={cupones} size='small'>
                        <Column field='text' header='cupon'></Column>
                        <Column 
                            field='start' 
                            header='fecha inicio'
                            body={ formatInitDate }
                            style={{ minWidth: '10rem' }}
                        ></Column>
                        <Column 
                            field='close'
                            header='fecha fin'
                            body={ formatEndDate } 
                            style={{ minWidth: '2rem' }}
                        ></Column>
                        <Column 
                            field='active' 
                            header='estatus'
                            style={{ minWidth: '6rem' }}
                            body={ getStatus }
                        ></Column>
                        <Column field='uses' header='usos'></Column>
                        <Column 
                            field='idcupon'
                            body={ getBtnEdit }
                        ></Column>
                    </DataTable>
                </Card>
            </div>
        </>
    )
}

export default Table;