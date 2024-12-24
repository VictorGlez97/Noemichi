import { useEffect, useState } from "react";

import axios from 'axios';

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
                { cupon ? <h3> { cupon.text } </h3> : <span><i className="pi pi-spin pi-cog" style={{ fontSize: '2rem' }}></i></span> }
            </div>
        </>
    )
}

export default Cupon;