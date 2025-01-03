import { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Calendar } from 'primereact/calendar';
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import api from "../services/noemichi";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { OrderList } from "primereact/orderlist";

const NewOrders = () => {
    
    const toast = useRef(null);

    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [deliver, setDeliver] = useState(new Date());

    const [selectProduct, setSelectProduct] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);
    const [products, setProducts] = useState([]);

    const [activeNote, setActiveNote] = useState(true);
    const [activeProducts, setActiveProducts] = useState(false);

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

    const templateOrder = ( item ) => {
        return(
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <div className="flex-1 flex flex-column gap-2 xl:mr-0">
                    <span className="font-bold">{ item.product }</span>
                    <div className="flex align-items-center gap-2">
                        {
                            item.pedido
                            ?
                            <>
                                <i className="pi pi-shoping-cart text-sm"></i>
                                <span> Compra </span>
                            </>
                            :
                            <>
                                <i className="pi pi-send text-sm"></i>
                                <span> Sobre predido </span>
                            </>
                        }
                    </div>
                </div>
            </div>
        )
    }

    const addProduct = () => {
        console.log( 'Prueba' );
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
                            <label htmlFor="diaEntrega">dia de entrega</label>
                            <div>
                                <Calendar 
                                    id="dieEntrega" 
                                    value={deliver} 
                                    onChange={(e) => setDeliver(e.value)} 
                                    rows={5}
                                    className='md:col-12'
                                />
                            </div>
                        </div>

                        <div className="p-field col-12">
                            <div className="flex align-items-center">
                                <Checkbox inputId="selProduct" onChange={e => { setActiveNote(!e.checked); }} checked={ !activeNote }></Checkbox>
                                <label htmlFor="selProduct" className="ml-2"> Seleccionar productos </label>
                            </div>
                        </div>

                        {
                            activeNote 
                            ?
                            
                            <div className="p-field col-12" >
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
                            
                            :

                            <>
                                <div className="flex gap-2" >
                                    <div className="col-6">
                                        <label htmlFor="product">Producto { (orderProducts.length + 1) !== NaN ? orderProducts.length + 1 : 0 } </label>
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
                                        <label htmlFor="amount" className="ml-2">Cantidad { (orderProducts.length + 1) !== NaN ? orderProducts.length + 1 : 0 } </label>
                                        <div className="col-5">
                                            <InputNumber 
                                                className="w-12"
                                            />
                                        </div>
                                    </div>
        
                                    <div>
                                        <Button className="mt-5" size="small" label="Agregar" onClick={ addProduct() } />
                                    </div>
                                </div>

                                <div className="orderProducts">
                                    <div className="col-12">
                                        <OrderList
                                            dataKey="id"
                                            value={orderProducts}
                                            // onChange={}
                                            itemTemplate={templateOrder} 
                                            header='Carrito de productos'
                                            filter 
                                            filterBy='product' 
                                            aria-controls=""
                                        ></OrderList>
                                    </div>
                                </div>
                            </>
                        }

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