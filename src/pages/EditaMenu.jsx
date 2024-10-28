import React, { useState } from 'react'

// COMPONENTES PRIMEVUE
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

export const EditaMenu = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [isTypeA, setIsTypeA] = useState(false);

    const handleSubmit = async () => {
        
        const data = {
            nombre: name,
            descripcion: description,
            precio: price,
            seccion: isTypeA ? 2 : 1
        }

    }

    return (
        <div className='mt-3'>
            <form onSubmit={handleSubmit}>
                <div className="p-field p-col-12">
                    <label htmlFor="name">Nombre</label>
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="p-field p-col-12">
                    <label htmlFor="price">Precio</label>
                    <InputNumber id="price" value={price} onValueChange={(e) => setPrice(e.value)} mode="currency" currency="USD" locale="en-US" />
                </div>

                <div className="p-field p-col-12">
                    <label htmlFor="description">Descripción</label>
                    <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
                </div>

                <div className="p-field-checkbox p-col-12">
                    <Checkbox inputId="isTypeA" checked={isTypeA} onChange={(e) => setIsTypeA(e.checked)} />
                    <label htmlFor="isTypeA"> Por pedido </label>
                </div>

                <div className="p-field p-col-12">
                    <Button label="Enviar" type="submit" />
                </div>
            </form>

            {/* <InputNumber inputId="currency-us" value={precio} onValueChange={(e) => setPrecio(e.value)} mode="currency" currency="USD" locale="en-US" /> */}
        </div>
    )
}
