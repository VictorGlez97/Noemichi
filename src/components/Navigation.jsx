import { Menubar } from 'primereact/menubar';

const Navigation = () => {

    const navlist = [
        {label: 'Home', icon: 'pi pi-fw pi-home', command: () => {
            window.location.href='/';
        }},
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
        { label: 'Contact', icon: 'pi pi-fw pi-phone', command: () =>{
            window.location.href='/contact'
        }}
    ]

    return(
        <div>
            <header>
                <nav>
                    <ul>
                        <Menubar 
                            model={navlist}
                        />
                    </ul>
                </nav>
            </header>
        </div>
    )

}

export default Navigation;