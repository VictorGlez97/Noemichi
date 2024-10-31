import React, { useRef, useState } from 'react'

import axios from 'axios';

// COMPONENTES PRIMEVUE
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';

export const EditaMenu = () => {

    const toast = useRef(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [isTypeA, setIsTypeA] = useState(false);

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
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Producto guardado', life: 3000 })
                setName('');
                setDescription('');
                setPrice(0);
                setIsTypeA(false);
                return;
            }

            toast.current.show({ severity: 'error', summary: 'Error', detail: res.data.msg, life: 3000 });
        })
        .catch(error => {
            console.log( error );
            toast.current.show({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
        })

    }

    return (
        <div>

            <Toast ref={toast} />

            <div className='flex justify-content-center'>
                <Card title="Nuevo pancito" className='col-5'>

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
                            <Button type="submit" size='small' icon="pi pi-save" onClick={handleSubmit} > Guardar </Button>
                        </div>
                    </div>
                </Card>
            </div>
            {/* </form> */}
            {/* <InputNumber inputId="currency-us" value={precio} onValueChange={(e) => setPrecio(e.value)} mode="currency" currency="USD" locale="en-US" /> */}
        </div>
    )
}
