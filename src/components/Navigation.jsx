import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './Context';

import NoemichiBakery from '../assets/img/noemichis.png';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { useEffect, useState } from 'react';
import api from '../services/noemichi';

const Navigation = () => {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const [numOrders, setNumOrders] = useState(0);

    useEffect(() => {
        ObtenerOrdenes();
    }, [])

    const ObtenerOrdenes = async () => {
        const res = await api.post('order/number');
        console.log( res );

        if ( !res.data.error ) {
            setNumOrders(parseInt(res.data.data[0].pedidos))
        }
    }

    const start = <img alt='logo' src={ NoemichiBakery } height='45' onClick={() => { navigate('/') }}></img>;

    const navlist = [
        // { icon: 'pi pi-fw pi-home', command: () => {
        //     window.location.href='/';
        // }},
        {
            label: 'Menu', 
            icon: 'pi pi-fw pi-calendar', 
            // command: () =>{ window.location.href='/about' }
            items: [
                {
                    label: 'Ver menu',
                    // url: '/menu',
                    command: () => { navigate('/menu') }
                },
                {
                    label: 'Edita menu',
                    // url: '/editaMenu',
                    command: () => { navigate('/editaMenu') }
                }
            ]
        },
        // { label: 'Pedidos', icon: 'pi pi-fw pi-shopping-cart', command: () => {
        //     window.location.href='/pedido'
        // }},
        { label: 'Cupones', icon: 'pi pi-fw pi-ticket', command: () => { navigate('/editacupon') }},
        { label: 'Configuración', icon: 'pi pi-fw pi-cog', command: () => { navigate('/config') }},
        // { label: 'Contact', icon: 'pi pi-fw pi-phone', command: () =>{
        //     window.location.href='/contact'
        // }}
    ]
    
    const end = (
        <div className='flex align-items-center gap-2'>
            <Button 
                type='button' 
                label='Pedidos' 
                icon='pi pi-shopping-cart' 
                size='small'
                onClick={() => { navigate('/pedidos') }}
            >
                {
                    numOrders > 0
                    &&
                    <Badge value={numOrders} severity='danger'></Badge>
                }
            </Button>
            <Button 
                icon='pi pi-power-off' 
                rounded text 
                severity='help' 
                size='small' 
                aria-label='salir'
                onClick={logout} 
            />
        </div>
    )

    return(
        <div className='flex justify-content-center mt-4'>
            <Menubar 
                className='w-11'
                start={start}
                model={navlist}
                end={end}
            />
        </div>
    )

}

export default Navigation;