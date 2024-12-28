import { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import api from "../services/noemichi";
import { Dropdown } from "primereact/dropdown";

const NewOrders = () => {
    
    const toast = useRef(null);

    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [selectProduct, setSelectProduct] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const dataProducts = await api.get('product');
        console.log( dataProducts );
        setProducts(dataProducts.data.data);
    }

    const handleSubmit = () => {

    }

    return(
        <div className='mt-4'>

            <Toast ref={toast} />

            <div className='flex justify-content-center'>
                <Card title='Pedido' className='sm:col-12 md:col-7'>

                    <div>
                        <div className="p-field col-12">
                            <label htmlFor="name">Nombre de pedido</label>
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
                            <label htmlFor="phone">Teléfono</label>
                            <div>
                                <InputText 
                                    id="phone" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)}
                                    className='md:col-12' 
                                />
                            </div>
                        </div>

                        <div className="p-field col-12">
                            <label htmlFor="description">Nota para el pedido</label>
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

                        <div className="flex gap-2">
                            <div className="col-6">
                                <label htmlFor="product">Producto { orderProducts.lenght + 1 } </label>
                                <div>
                                    <Dropdown 
                                        value={selectProduct} 
                                        onChange={(e) => setSelectProduct(e.value)}
                                        options={products}
                                        optionLabel="name"
                                        className="w-12" 
                                        size='small'
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="amount" className="ml-2">Cantidad { orderProducts.lenght + 1 } </label>
                                <div className="col-5">
                                    <InputNumber 
                                        className="w-12"
                                    />
                                </div>
                            </div>

                            <div>
                                <Button className="mt-5" size="small" label="Agregar" />
                            </div>
                        </div>

                        <div className="p-field col-12 mt-2 flex justify-content-end">
                            <Button type='submit' size='small' label='Enviar' className='mr-2' onClick={handleSubmit} />
                        </div>
                    </div>
                </Card>
            </div>

        </div>
    )
}

export default NewOrders;