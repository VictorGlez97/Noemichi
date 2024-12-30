import { useEffect, useState } from "react";

import axios from 'axios';

import Cuponcito from '../assets/img/Cuponcito.png';

const Cupon = () => {

    const [cupon, setCupon] = useState(null);

    useEffect(() => {

        async function GetCupon(params) {
            if ( cupon === null ) {
                await axios.get('https://pruebanode-victorglez97-victorglez97s-projects.vercel.app/api/v1/cupon/random')
                .then(res => {
                    if ( res.status === 200 ) {
                        setCupon(res.data.data);
                    }
                })
                .catch(error => {
                    console.log( error );
                });
            }
        }
        GetCupon();

    }, [cupon]);

    return(
        <>
            <div className="flex justify-content-center">
                <div 
                    // className="flex flex-col items-center w-screen"
                    style={{ 
                        marginTop: '2rem', 
                        position: 'relative',
                        display: 'inline-block',
                        textAlign: 'center'
                    }}
                >
                    <div className="flex justify-content-center z-0">
                        <img 
                            src={Cuponcito} 
                            alt='Noemichis bakery' 
                            style={{ 
                                width: '30rem', 
                                height: '20rem' 
                            }} 
                        />
                    </div>
                    <div className="z-1">
                        { cupon 
                            ? 
                            <h3 
                                className="font-bold text-2xl" 
                                style={{ 
                                    // marginTop: '2rem',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    display: "inline-block", 
                                    transform: 'rotate(-3.5deg) translate(-45%,-150%)', 
                                    transformOrigin: 'center',
                                    maxWidth: '20rem',
                                    color: '#E71B6E',
                                }}
                            > 
                            {/* prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba */}
                            { cupon.text } 
                            </h3> 
                            :
                            <span><i className="pi pi-spin pi-cog" style={{ fontSize: '2rem' }}></i></span> 
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cupon;