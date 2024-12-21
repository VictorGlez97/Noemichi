import { Menubar } from 'primereact/menubar';

import NoemichiBakery from '../assets/img/noemichis.png';

const Navigation = () => {

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
        { label: 'Pedidos', icon: 'pi pi-fw pi-shopping-cart', command: () => {
            window.location.href='/pedido'
        }},
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
    
    // const end = 

    return(
        <div className='flex justify-content-center mt-4'>
            {/* <header>
                <nav>
                    <ul> */}
                        <Menubar 
                            className='w-11'
                            start={start}
                            model={navlist}
                        />
                    {/* </ul>
                </nav>
            </header> */}
        </div>
    )

}

export default Navigation;