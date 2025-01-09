import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

import axios from 'axios';

import Cuponcito from '../assets/img/Cuponcito-removebg-preview.png';
import api from "../services/noemichi";
import { Card } from "primereact/card";
import moment from "moment";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

const Cupon = () => {

    const navigate = useNavigate();
    const toast = useRef(null);

    const [cupon, setCupon] = useState(null);
    // const [ip, setIp] = useState('');
    const [cupons, setCupons] = useState([]);

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
                
                if ( res.data.cupons !== null && res.data.cupons !== undefined && res.data.cupons ) {
                    const resCupons = await api.post('cupon/device', { ipDevice: ip })
                    console.log( resCupons );
                    if ( resCupons.data.data.length > 0 ) {
                        setCupons(resCupons.data.data);
                        toast.current.show({ severity: 'info', summary: 'Info', detail: 'Te doy una lista de tus cupones obtenidos', life: 3000 });
                    }
                    return;
                }
                
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
                // navigate('/menu');
                console.log( error );
                toast.current.show({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
            });

        }
    }

    const formatDate = ( data ) => {
        return moment(data.close).add(1, 'days').format('DD/MM/YYYY');
    }

    const getStatus = ( data ) => {
        return moment().isAfter(moment(data.close), 'day') 
        ? <Tag value='Vencido' severity='danger' icon='pi pi-times' /> 
        : <Tag value='Vigente' severity='success' icon='pi pi-check' /> 
    }

    return(
        <>
            <Toast position='bottom-center' />
            {
                !cupon && cupons.length <= 0
                &&
                <span><i className="pi pi-spin pi-spinner-dotted" style={{ fontSize: '2rem' }}></i></span> 
            }
            
            {
                cupon
                &&
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
                            {/* <img 
                                src={Cuponcito} 
                                alt='Noemichis bakery' 
                                style={{ 
                                    width: '30rem', 
                                    height: '20rem' 
                                }} 
                            /> */}
                        </div>
                        <div className="z-1">
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
                                    // color: '#E71B6E',
                                    color: '#E66995'
                                }}
                            > 
                                {/* prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba prueba */}
                                { cupon.text } 
                            </h3> 
                        </div>
                    </div>
                </div> 
            }

            {
                cupons.length > 0
                &&
                <>
                    <div className="flex justify-content-center mt-5">
                        <Card title='Cupones disponibles' className="w-45rem">
                            <div className="flex justify-content-center">
                                <DataTable
                                    value={cupons}
                                >
                                    <Column field='text' header='Cupon'></Column>
                                    <Column 
                                        header='Utilice antes de'
                                        body={ formatDate } 
                                        style={{ minWidth: '2rem', textAlign: 'center' }}
                                    ></Column>
                                    <Column 
                                        header='Estatus'
                                        body={ getStatus }
                                        style={{ minWidth: '6rem', textAlign: 'center' }}
                                    ></Column>
                                </DataTable>
                            </div>
                            <div 
                                className="flex justify-content-center mt-5"
                                style={{ marginBottom: '-1.5rem' }}
                            >
                                <Button 
                                    label='Hacer pedido'
                                    icon='pi pi-shopping-cart'
                                    size="small"
                                    onClick={() => { navigate('/pedido') }}
                                />
                            </div>
                        </Card>
                    </div>
                </>
            }
        </>
    )
}

export default Cupon;