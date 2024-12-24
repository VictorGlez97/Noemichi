import { Menubar } from 'primereact/menubar';

import { useAuth } from './Context';

import NoemichiBakery from '../assets/img/noemichis.png';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';

const Navigation = () => {

    const { logout } = useAuth();

    const start = <img alt='logo' src={ NoemichiBakery } height='45'></img>;

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
                    url: '/menu'
                },
                {
                    label: 'Edita menu',
                    url: '/editaMenu'
                }
            ]
        },
        // { label: 'Pedidos', icon: 'pi pi-fw pi-shopping-cart', command: () => {
        //     window.location.href='/pedido'
        // }},
        { label: 'Cupones', icon: 'pi pi-fw pi-ticket', command: () => {
            window.location.href='/editacupon'
        }},
        { label: 'Configuración', icon: 'pi pi-fw pi-cog', command: () => {
            window.location.href='/config'
        }},
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
            >
                <Badge value='8' severity='danger'></Badge>
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
                // start={start}
                model={navlist}
                end={end}
            />
        </div>
    )

}

export default Navigation;