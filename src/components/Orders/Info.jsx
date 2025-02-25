import { useEffect, useRef, useState } from "react";

import moment from "moment";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import api from "../../services/noemichi";
import { Toast } from "primereact/toast";

const Info = ({ info, HandleCloseModal }) => {

    const toast =  useRef(null);

    // useEffect(() => {
    //     console.log( info );
    // })

    // const [state, setState] = useState(null);
    const [selectedState, setSelectedState] = useState(info.status);

    const [typeMovs, setTypeMovs] = useState([
        {
            type: 'envoy',
            label: 'solicitado'
        },
        {
            type: 'seen',
            label: 'visto'
        },
        {
            type: 'cooking',
            label: 'cocinando'
        },
        {
            type: 'packaging',
            label: 'enpaquetando'
        },
        {
            type: 'delivered',
            label: 'entregado'
        },
        {
            type: 'cancelled',
            label: 'cancelado'
        }
    ]);

    const SaveStateOrder = async () => {
        
        // console.log( selectedState );
        // console.log( info );
        
        try {
            
            info.status = selectedState;
            const res = await api.put(`order/${info.idorder}`, info);
            // console.log( res );
    
            if ( res.data.msg === 'Ok' ) {
                // console.log( toast );
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Estatus de orden actualizado', life: 3000 });
            } else {
                toast.current.show({ severity: 'warning', summary: 'Advertencia', detail: 'No fue posible modificar el estatus del pedido', life: 3000 });
            }

        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
        }

    }

    return(
        <>
            <Toast ref={toast} />
            <div style={{ marginTop: '-.5rem' }}>
                
                <div className="mb-4">

                    <div className="mt-1 mb-2">
                        <label htmlFor="" className="text-lg"> Nombre pedido: </label>
                        <span className="text-lg font-bold">{ info.title }</span>
                    </div>

                    <div className="mt-1 mb-2">
                        <label htmlFor="" className="text-lg"> Telefono: </label>
                        <span className="text-lg font-bold">{ info.phone }</span>
                    </div>

                    <div className="mt-1 mb-2">
                        <label htmlFor="" className="text-lg"> Día de entrega: </label>
                        <span className="text-lg font-bold">{ moment(info.deliver).format('DD/MM/YYYY') }</span>
                    </div>
                    
                    <div className="mt-1 mb-2">
                        <label htmlFor="" className="text-lg"> Nota: </label>
                        <span className="text-lg font-bold">{ info.text }</span>
                    </div>

                </div>

                {
                    info.products !== undefined && info.products.length > 0
                    ?
                    <div className="flex justify-content-center mb-4">
                        <DataTable
                            value={info.products} 
                            tableStyle={{ minWidth: '50rem' }}
                        >
                            <Column field='name' header='Producto'></Column>
                            <Column field='number' header='No. pancitos'></Column>
                            <Column field='amount' header='Ninero'></Column>
                        </DataTable>
                    </div>
                    : 
                    <></>
                }

                <div className="mb-4">
                    <div className="flex">
                        <div className="p-field col-5">
                            <label htmlFor="type"> Estado de pedido: </label>
                            <div>
                                <Dropdown 
                                    value={selectedState} 
                                    onChange={(e) => setSelectedState(e.value)} 
                                    options={typeMovs} 
                                    optionLabel="label" 
                                    optionValue="type" 
                                    className="w-full" 
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: '1.7rem', }}>
                            <Button severity='secondary' icon='pi pi-save' onClick={SaveStateOrder} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-content-end">
                    <Button label='Cerrar' onClick={HandleCloseModal} />
                </div>
            </div>
        </>
    )
}

export default Info;