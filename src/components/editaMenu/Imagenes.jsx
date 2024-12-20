import { useState, useEffect } from "react";

import axios from 'axios';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

const Imagenes = ({ getProduct }) => {

    const [products, setProducts] = useState();

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

    return(
        <>
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
        </>
    )
}

export default Table;