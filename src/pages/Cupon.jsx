import { useEffect, useState } from "react";

import axios from 'axios';

const Cupon = () => {

    const [cupon, setCupon] = useState(null);

    useEffect(() => {

        axios.get('https://pruebanode-victorglez97-victorglez97s-projects.vercel.app/api/v1/cupon/random')
        .then(res => {
            if ( res.status === 200 ) {
                setCupon(res.data.data);
            }
        })
        .catch(error => {
            console.log( error );
        })

    });

    return(
        <>
            <div className="flex justify-content-center">

                {
                    cupon !== null && <h4> { cupon.text } </h4>
                }

            </div>
        </>
    )
}

export default Cupon;