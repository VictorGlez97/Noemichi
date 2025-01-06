import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

import Cuponcito from '../assets/img/Cuponcito-removebg-preview.png';
import api from "../services/noemichi";

const Cupon = () => {

    const navigate = useNavigate();

    const [cupon, setCupon] = useState(null);
    // const [ip, setIp] = useState('');

    useEffect(() => {
        
        // if ( cupon !== null ) {
        //     GetCupon();
        // }

        const timmer = setTimeout(async () => {
            console.log( 'Ejecutando timmer' );
            await SetUserCupon();
        }, 1000);

        return () => clearTimeout(timmer);

    }, [cupon]);

    const GetCupon = async ( ip ) => {
        if ( cupon === null ) {

            const res = await api.post('cupon/random', { ipDevice: ip })
            console.log( res );

            if ( res.status === 200 ) {
                setCupon(res.data.data);
                return;
            }
            // navigate('/menu');
        }
    }

    const SetUserCupon = async () => {
        if ( cupon === null ) {
            
            axios.get('https://api.ipify.org?format=json')
            .then(async (res) => {
                await GetCupon( res.data.ip );
            })
            .catch(error => {
                navigate('/menu');
            });

        }
    }

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
                                    marginTop: '2.5rem',
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