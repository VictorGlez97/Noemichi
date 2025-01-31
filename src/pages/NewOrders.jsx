import { useEffect, useRef, useState } from "react";
import moment from "moment";

import { Button } from "primereact/button";
import { Calendar } from 'primereact/calendar';
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { OrderList } from "primereact/orderlist";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Tag } from "primereact/tag";

import api from "../services/noemichi";
import { Dialog } from "primereact/dialog";
import axios from "axios";

const NewOrders = () => {
    
    const toast = useRef(null);

    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [deliver, setDeliver] = useState(new Date());

    const [selectProduct, setSelectProduct] = useState(null);
    const [amountProduct, setAmountProduct] = useState(0);
    const [orderProducts, setOrderProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [cupons, setCupons] = useState([]);

    const [activeNote, setActiveNote] = useState(true);
    const [activeProducts, setActiveProducts] = useState(false);
    const [validateOrder, setValidateOrder] = useState(false);

    const [selectCupon, setSelectCupon] = useState(null);

    useEffect(() => {
        getProducts();
        getCupons();
    }, []);

    // useEffect(() => {
    //     //console.log(orderProducts);
    // }, [orderProducts])

    const getProducts = async () => {
        const dataProducts = await api.get('product');
        //console.log( dataProducts );
        setProducts(dataProducts.data.data);
    }

    const getCupons = async () => {

        await axios.get('https://api.ipify.org?format=json')
        .then(async (res) => {
            const response = await api.post('cupon/device', { ipDevice: res.data.ip });
            if ( response.data.data && response.data.data.length > 0 ) {
                setCupons(response.data.data);
            } 
        })
        .catch(error => {
            // navigate('/menu');
            toast.current.show({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
        });

    }

    const handleSubmit = async () => {

        var dataProducts = [];
        var total = 0;

        orderProducts.map(prod => {
        
            total = prod.amount + total;

            dataProducts.push({  
                idproduct: prod.idproduct,
                number: prod.number,
                amount: prod.amount
            })
        })

        const data = {
            title: name,
            text: description,
            total: total,
            date: moment(deliver).format('YYYY-MM-DD HH:mm:ss'),
            discount: 0.0,
            cupon: selectCupon !== null && selectCupon !== undefined ? selectCupon.idcupon : null,
            status: 'envoy',
            phone: phone,
            products: dataProducts
        };

        const response = await api.post('order', data);
        //console.log( response );
        
        if ( !response.data.data || response.data.data.length <= 0 ) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No fue posible crear el pedido', life: 3000 });
            return;
        }

        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Se ha creado el pedido', life: 3000 });
        cleanInpts();

    }

    const cleanInpts = () => {
        setDescription('');
        setName('');
        setPhone('');
        setDeliver(new Date());
        setSelectProduct(null);
        setAmountProduct(0);
        setOrderProducts([]);
        setProducts([]);
        setActiveNote(true);
        setValidateOrder(false);
        setSelectCupon(null);
    }

    const templateOrder = ( item, index ) => {
        //console.log( item );
        //console.log( index );
        
        const deleteProduct = ( index ) => {
            //console.log( index );
            //console.log( orderProducts );
            orderProducts.splice( index );
        }

        return(
            <div className="flex justify-content-around p-2 align-items-center gap-3" key={item.idproduct}>
                <div className="col-6">
                    <span className="font-bold">{ item.product }</span>
                </div>
                <div className="col-4">
                    <div className="flex align-items-center gap-2">
                        {
                            item.pedido
                            ?
                            <Tag className='mr-2' icon='pi pi-shopping-cart' value='Compra' />
                            :
                            <Tag className='mr-2' icon='pi pi-send' value='Sobre pedido' />
                        }
                    </div>
                </div>
                <div className="col-3 align-items-center">
                    {
                        item.number > 1 
                        ?
                        <span className="font-bold"> {item.number} Piezas </span> 
                        :
                        <span className="font-bold"> { item.number } Pieza </span>
                    }
                </div>
                <div className="col-1 font-bold">
                    ${ item.amount }
                </div>
                <div className="col-1">
                    <Button icon='pi pi-times' severity='danger' size='small' onClick={() => { deleteProduct( index ) }} />
                </div>
            </div>
        )
    }

    const addProduct = () => {
        
        if ( selectProduct === null || selectProduct === undefined ) {
            toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Seleccione un pancito', life: 3000 });
            return;
        }

        if ( amountProduct <= 0 ) {
            toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Cantidad de pancitos no permitida', life: 3000 });
            return;
        }

        //console.log( selectProduct );

        orderProducts.push({ 
            index: orderProducts.length,
            idproduct: selectProduct.idproduct,
            product: selectProduct.name,
            number: amountProduct,
            amount: (selectProduct.price * amountProduct),
            pedido: selectProduct.seccion === 1 ? true : false
        });

        setSelectProduct(null);
        setAmountProduct(0);

        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Pancito agregado al carrito', life: 3000 });
    }

    const deleteProduct = ( index ) => {
        //console.log( index );
        //console.log( orderProducts );
        // const oProducts = orderProducts.splice( index );
        // setOrderProducts(oProducts);

        setOrderProducts((prevProducts) => 
            prevProducts.filter((_, i) => i !== index)
        );

    }

    const listOrderTemplate = (items) => {
        if (!items || items.length === 0) return null;
        
        // let list = items.map((product, index) => {
        //     return templateOrder(product, index);
        // })

        const deleteProduct = ( index ) => {
            //console.log( index );
            //console.log( orderProducts );
            orderProducts.splice( index );
        }

        return( 
            <Card title='Carrito' className="mt-2">
                <div className="grid grid-nogutter">
                    {/* {list} */}
                    {
                        items.map((item, index) => (
                            <div className="flex justify-content-around p-2 align-items-center gap-3" key={item.idproduct}>
                                <div className="col-6">
                                    <span className="font-bold">{ item.product }</span>
                                </div>
                                <div className="col-4">
                                    <div className="flex align-items-center gap-2">
                                        {
                                            item.pedido
                                            ?
                                            <Tag className='mr-2' icon='pi pi-shopping-cart' value='Compra' />
                                            :
                                            <Tag className='mr-2' icon='pi pi-send' value='Sobre pedido' />
                                        }
                                    </div>
                                </div>
                                <div className="col-3 align-items-center">
                                    {
                                        item.number > 1 
                                        ?
                                        <span className="font-bold"> {item.number} Piezas </span> 
                                        :
                                        <span className="font-bold"> { item.number } Pieza </span>
                                    }
                                </div>
                                <div className="col-1 font-bold">
                                    ${ item.amount }
                                </div>
                                <div className="col-1">
                                    <Button icon='pi pi-times' severity='danger' size='small' onClick={() => { deleteProduct( index ) }} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Card>
        )
    }

    const handleValidation = () => {
        setValidateOrder(true);
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
                            <label htmlFor="diaEntrega">Día de entrega</label>
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

                        {
                            cupons.length > 0
                            &&
                            <div className="p-field col-12">
                                <label htmlFor="cupon">Cupón</label>
                                <div>
                                    <Dropdown 
                                        value={selectCupon} 
                                        onChange={(e) => setSelectCupon(e.value)}
                                        options={cupons}
                                        optionLabel="text"
                                        className="w-12" 
                                        size='small'
                                    />
                                </div>
                            </div>
                        }

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

                        <div className="p-field col-12">
                            <div className="flex align-items-center">
                                <Checkbox inputId="selProduct" onChange={e => { setActiveNote(!e.checked); }} checked={ !activeNote }></Checkbox>
                                <label htmlFor="selProduct" className="ml-2"> Seleccionar productos </label>
                            </div>
                        </div>

                        {
                            !activeNote 
                            &&
                            <>
                                <div className="flex gap-2" >
                                    <div className="col-5">
                                        <label htmlFor="product">Producto { !isNaN(orderProducts.length + 1) ? orderProducts.length + 1 : 0 } </label>
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
        
                                    <div className="col-5">
                                        <label htmlFor="amount" className="ml-2">Cantidad { !isNaN(orderProducts.length + 1) ? orderProducts.length + 1 : 0 } </label>
                                        <div className="">
                                            <InputNumber 
                                                className="w-12"
                                                value={amountProduct}
                                                onValueChange={(e) => setAmountProduct(e.value)}
                                                min={0}
                                                showButtons
                                            />
                                        </div>
                                    </div>
        
                                    <div>
                                        <Button className="mt-5" size="small" label="Agregar" onClick={ addProduct } />
                                    </div>
                                </div>

                                {
                                    orderProducts.length > 0
                                    &&
                                    <div className="orderProducts">
                                        <div className="col-12">
                                            <Card title='Carrito' className="mt-2">
                                                <div className="grid grid-nogutter">
                                                    {
                                                        orderProducts.map((item, index) => (
                                                            <div className="flex justify-content-around p-2 align-items-center gap-3" key={item.idproduct}>
                                                                <div className="col-6">
                                                                    <span className="font-bold">{ item.product }</span>
                                                                </div>
                                                                <div className="col-4">
                                                                    <div className="flex align-items-center gap-2">
                                                                        {
                                                                            item.pedido
                                                                            ?
                                                                            <Tag className='mr-2' icon='pi pi-shopping-cart' value='Compra' />
                                                                            :
                                                                            <Tag className='mr-2' icon='pi pi-send' value='Sobre pedido' />
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="col-3 align-items-center">
                                                                    {
                                                                        item.number > 1 
                                                                        ?
                                                                        <span className="font-bold"> {item.number} Piezas </span> 
                                                                        :
                                                                        <span className="font-bold"> { item.number } Pieza </span>
                                                                    }
                                                                </div>
                                                                <div className="col-1 font-bold">
                                                                    ${ item.amount }
                                                                </div>
                                                                <div className="col-1">
                                                                    <Button icon='pi pi-times' severity='danger' size='small' onClick={() => { deleteProduct( index ) }} />
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                }
                            </>
                        }

                        <div className="p-field col-12 mt-2 flex justify-content-end">
                            <Button type='submit' size='small' label='Enviar' className='mr-2' onClick={ handleValidation } />
                        </div>
                    </div>
                </Card>
            </div>
            
            <Dialog header='Confirmación de pedido' visible={validateOrder} style={{ width: '40vw' }}>
                <div className="flex justify-content-around mb-4">
                    <div>

                        <div className="mt-1 mb-2">
                            <label htmlFor="" className="text-lg"> Nombre pedido: </label><br />
                            <span className="text-lg font-bold">{ name }</span>
                        </div>

                        <div className="mt-1 mb-2">
                            <label htmlFor="" className="text-lg"> Telefono: </label><br />
                            <span className="text-lg font-bold">{ phone }</span>
                        </div>

                        <div className="mt-1 mb-2">
                            <label htmlFor="" className="text-lg"> Día de entrega: </label><br />
                            <span className="text-lg font-bold">{ moment(deliver).format('DD/MM/YYYY') }</span>
                        </div>
                    </div>
                    
                    <div>

                        <div className="mt-1 mb-2">
                            <label htmlFor="" className="text-lg"> Productos: </label>
                            {
                                orderProducts.length > 0
                                &&
                                orderProducts.map(product => (
                                    <div className="text-lg font-bold">
                                        -
                                        {
                                            product.number > 1
                                            ?
                                            <span> {product.number} piezas </span>
                                            :
                                            <span> {product.number} pieza </span>
                                        }
                                        { product.product }
                                    </div>
                                ))
                            }
                        </div>

                        <div className="mt-1 mb-2">
                            <label htmlFor="" className="text-lg"> Nota: </label><br />
                            <span className="text-lg font-bold">{ description }</span>
                        </div>
                    </div>

                </div>
                <div className="flex justify-content-between">
                    <Button label='Cancelar' onClick={() => { setValidateOrder(false) }} />
                    <Button label='Confirmar' onClick={ handleSubmit } />
                </div>
            </Dialog>

        </div>
    )
}

export default NewOrders;